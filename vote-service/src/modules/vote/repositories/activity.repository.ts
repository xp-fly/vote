import {EntityRepository, FindConditions, In, Not, Repository} from 'typeorm';
import {Activity} from '../entities/activity.entity';
import {ActivityCandidate} from '../entities/activity-candidate.entity';
import {BadRequestException, HttpException} from '@nestjs/common';

@EntityRepository(Activity)
export class ActivityRepository extends Repository<Activity> {

  /**
   * 保存活动的候选人
   * @param activityId
   * @param candidates
   */
  async saveCandidates(activityId: number, candidates: number[]) {
    if (!activityId) {
      throw new BadRequestException('activityId is required');
    }
    const delFilter: FindConditions<ActivityCandidate> = {
      activityId,
    };
    await this.manager.getRepository(ActivityCandidate).delete(delFilter);
    const activityCandidates: Array<Partial<ActivityCandidate>> = candidates.map(id => {
      return {
        activityId,
        candidateId: id,
      };
    });
    if (activityCandidates.length) {
      await this.manager.insert(ActivityCandidate, activityCandidates);
    }
  }
}
