import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {Repository} from 'typeorm';
import {Candidate} from '../entities/candidate.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateCandidateDto} from '../dto/create-candidate.dto';
import {ActivityCandidate} from '../entities/activity-candidate.entity';
import {ACTIVITY_STATE} from '../contant';

@Injectable()
export class CandidateService {

  constructor(
    @InjectRepository(Candidate)
    private readonly candidateRepo: Repository<Candidate>,
    @InjectRepository(ActivityCandidate)
    private readonly activityCandidateRepo: Repository<ActivityCandidate>,
  ) {}

  /**
   * 查询候选人列表
   */
  async fetch() {
    return this.candidateRepo.find({
      select: ['id', 'name'],
    });
  }

  /**
   * 创建候选人
   * @param body
   */
  async create(body: CreateCandidateDto) {
    const candidate = this.candidateRepo.create({
      name: body.name,
    });
    await this.candidateRepo.save(candidate);
    return candidate;
  }

  /**
   * 编辑
   * @param id
   * @param body
   */
  async edit(id: number, body: Partial<CreateCandidateDto>) {
    const candidate = await this.candidateRepo.findOne(id);
    if (!candidate) {
      throw new NotFoundException('candidate not found');
    }
    if (body.name) {
      candidate.name = body.name;
    }
    await this.candidateRepo.save(candidate);
    return candidate;
  }

  /**
   * 删除
   * @param id
   */
  async delete(id: number) {
    const candidate = await this.candidateRepo.findOne(id);
    if (!candidate) {
      throw new NotFoundException('candidate not found');
    }
    const count = await this.activityCandidateRepo.createQueryBuilder('ac')
      .innerJoin('ac.activity', 'a')
      .select(['ac.id'])
      .where('ac.candidateId = :candidateId', {candidateId: candidate.id})
      .andWhere('a.state = :state', {state: ACTIVITY_STATE.pending})
      .getCount();
    if (count) {
      throw new BadRequestException('该候选人正参加投票活动，不能删除');
    }
    await this.candidateRepo.delete(candidate.id);
  }
}
