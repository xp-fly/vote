import {BadRequestException, HttpException, Injectable} from '@nestjs/common';
import {Connection, Repository} from 'typeorm';
import {Activity} from '../entities/activity.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateActivityDto} from '../dto/create-activity.dto';
import {ActivityRepository} from '../repositories/activity.repository';
import {getLimitOffset} from '../../../utils/util';
import {ACTIVITY_STATE, getActivityResultCacheKey} from '../contant';
import {ActivityCandidate} from '../entities/activity-candidate.entity';
import {ActivityCandidateUser} from '../entities/activity-candidate-user.entity';
import {InjectRedisClient} from 'nestjs-ioredis';
import {Redis} from 'ioredis';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepo: Repository<Activity>,
    @InjectRepository(ActivityCandidate)
    private readonly activityCandidateRepo: Repository<ActivityCandidate>,
    private readonly connection: Connection,
    @InjectRedisClient()
    private readonly redisClient: Redis,
  ) {}

  /**
   * 创建活动
   * @param body
   */
  async create(body: CreateActivityDto) {
    const activity = this.activityRepo.create({
      title: body.title,
    });
    await this.connection.transaction(async manager => {
      await manager.save(activity);
      await manager.getCustomRepository(ActivityRepository).saveCandidates(activity.id, body.candidates);
    });
    return activity;
  }

  /**
   * 检查是否存在
   * @param title
   */
  async checkIsExist(title: string) {
    if (!title) {
      return null;
    }
    return this.activityRepo.findOne({
      where: {
        title,
      },
      select: ['id'],
    });
  }

  /**
   * 编辑活动
   * @param id
   * @param body
   */
  async edit(id: number, body: Partial<CreateActivityDto>) {
    const activity = await this.activityRepo.findOne(id);
    if (!activity) {
      throw new BadRequestException('活动不存在，请勿修改');
    }
    if (activity.state !== ACTIVITY_STATE.init) {
      throw new BadRequestException('该活动已开始，不能修改');
    }

    if (body.title) {
      activity.title = body.title;
    }

    await this.connection.transaction(async manager => {
      await manager.save(activity);
      await manager.getCustomRepository(ActivityRepository).saveCandidates(activity.id, body.candidates);
    });
    return activity;
  }

  /**
   * 查询列表
   * @param query
   */
  async fetch(query: any) {
    const {limit, offset} = getLimitOffset(query);
    return await this.activityRepo.findAndCount({
      select: ['id', 'title', 'state', 'createTime', 'updateTime'],
      skip: offset,
      take: limit,
      order: {
        id: 'DESC',
      },
    });
  }

  /**
   * 删除活动
   * @param id
   */
  async delete(id: number) {
    const activity = await this.activityRepo.findOne(id);
    if (!activity) {
      throw new BadRequestException('该活动不存在，不能删除');
    }
    if (activity.state !== ACTIVITY_STATE.init) {
      throw new BadRequestException('该活动已开始，不能删除');
    }
    await this.activityRepo.delete(id);
  }

  /**
   * 开始投票
   * @param id
   */
  async start(id: number) {
    const activity = await this.activityRepo.findOne(id);
    if (!activity) {
      throw new BadRequestException('该活动不存在');
    }
    if (activity.state === ACTIVITY_STATE.pending) {
      throw new BadRequestException('该活动已开始');
    }
    if (activity.state === ACTIVITY_STATE.close) {
      throw new BadRequestException('该活动已结束');
    }
    activity.state = ACTIVITY_STATE.pending;
    await this.activityRepo.save(activity);
  }

  /**
   * 开始投票
   * @param id
   */
  async close(id: number) {
    const activity = await this.activityRepo.findOne(id);
    if (!activity) {
      throw new BadRequestException('该活动不存在');
    }

    activity.state = ACTIVITY_STATE.close;
    await this.connection.transaction(async manager => {
      // 保存为修改
      await manager.save(activity);
      // 设置半个小时后过期
      await this.redisClient.expire(getActivityResultCacheKey(activity.id), 30 * 60);
    });
  }

  /**
   * 获取投票结果
   * @param id
   */
  async getActivityResult(id: number) {
    const rows = await this.activityCandidateRepo.createQueryBuilder('ac')
      .leftJoin('ac.candidate', 'a')
      .leftJoinAndMapMany('ac.users', ActivityCandidateUser, 'acu', 'acu.candidateId = ac.candidateId')
      .select(['a.id', 'a.name', 'ac.id', 'acu.userId'])
      .where({activityId: id})
      .getMany();
    return rows.map(item => {
      return {
        id: item.candidate && item.candidate.id,
        name: item.candidate && item.candidate.name,
        count: (item as any).users.length,
      };
    });
  }
}
