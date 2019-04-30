import {BadRequestException, HttpException, Injectable, Logger} from '@nestjs/common';
import {Repository} from 'typeorm';
import {ActivityCandidateUser} from '../entities/activity-candidate-user.entity';
import {CreateVoteDto} from '../dto/create-vote.dto';
import {Activity} from '../entities/activity.entity';
import {ACTIVITY_STATE, getActivityResultCacheKey} from '../contant';
import {User} from '../../user/user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {ActivityCandidate} from '../entities/activity-candidate.entity';
import {InjectRedisClient} from 'nestjs-ioredis';
import {Redis} from 'ioredis';
import {CacheService} from '../../../shared/cache/cache.service';

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(ActivityCandidateUser)
    private readonly activeCandidateUserRepo: Repository<ActivityCandidateUser>,
    @InjectRepository(ActivityCandidate)
    private readonly activityCandidateRepo: Repository<ActivityCandidate>,
    @InjectRepository(Activity)
    private readonly activityRepo: Repository<Activity>,
    @InjectRedisClient()
    private readonly redisClient: Redis,
    private cacheService: CacheService,
  ) {}

  /**
   * 投票
   * @param user
   * @param body
   */
  async create(user: User, body: CreateVoteDto) {
    const activity = await this.activityRepo.findOne(body.activityId, {
      cache: 10000,
    });
    if (!activity) {
      throw new BadRequestException('活动不存在');
    }
    if ([ACTIVITY_STATE.init, ACTIVITY_STATE.close].includes(activity.state)) {
      throw new BadRequestException('该活动未开始或已结束');
    }
    const cacheKey = getActivityResultCacheKey(activity.id);
    const res = await this.redisClient.hget(cacheKey, user.id.toString());
    if (res) {
      throw new BadRequestException('已投过票，请勿重复投票');
    }
    const activityCandidateCount = await this.activityCandidateRepo.count({
      where: {
        activityId: activity.id,
        cache: 10000,
      },
    });
    const midNum = Math.ceil(activityCandidateCount / 2);
    const max = midNum > 5 ? 5 : midNum;
    const min = midNum > 2 ? 2 : midNum;
    if (body.candidates.length < min || body.candidates.length > max) {
      throw new BadRequestException(`只能选取 ${min} ~ ${max} 个人`);
    }
    // 保存到 redis 缓存中
    await this.redisClient.hset(cacheKey, user.id.toString(), body.candidates.join(','));
  }

  /**
   * 保存缓存数据到db
   */
  async save2Db() {
    // 获取所有已开始的活动
    const activities = await this.activityRepo.createQueryBuilder('a')
      .leftJoin('a.activityCandidateUsers', 'acu')
      .leftJoin('a.activityCandidates', 'ac')
      .select(['a.id', 'acu.userId', 'ac.candidateId'])
      .where({state: ACTIVITY_STATE.pending})
      .getMany();

    const insertArr: Array<Partial<ActivityCandidateUser>> = [];

    for (const activity of activities) {
      const lockKey = getActivityResultCacheKey(activity.id);
      try {
        const isLock = await this.cacheService.getLock(lockKey);
        if (isLock) {
          continue;
        }
        // 加锁 防止重复插入数据 设置 5 分钟超时时间
        await this.cacheService.setLock(lockKey, 5 * 60 * 1000);
        // 当前已投票的人
        const userIds = activity.activityCandidateUsers.map(item => item.userId);
        // 活动绑定的候选人
        const candidateIds = activity.activityCandidates.map(item => item.candidateId);

        const cacheKey = getActivityResultCacheKey(activity.id);
        const cacheUserIds = await this.redisClient.hkeys(cacheKey);
        for (const userId of cacheUserIds) {
          if (userIds.includes(+userId)) {
            continue;
          }
          const result = await this.redisClient.hget(cacheKey, userId);
          if (result) {
            for (const item of result.split(',')) {
              if (candidateIds.includes(+item)) {
                insertArr.push({
                  activityId: activity.id,
                  userId,
                  candidateId: +item,
                });
              }
            }
          }
        }
      } catch (e) {
        Logger.error(e.message, e);
      } finally {
        await this.cacheService.delLock(lockKey);
      }
    }
    if (insertArr.length) {
      await this.activeCandidateUserRepo.insert(insertArr);
    }
  }
}
