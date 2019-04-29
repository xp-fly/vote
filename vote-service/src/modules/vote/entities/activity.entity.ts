import {BaseAbstractEntity} from '../../../common/entities/base.abstract.entity';
import {Column, Entity, OneToMany} from 'typeorm';
import {ActivityCandidate} from './activity-candidate.entity';
import {ActivityCandidateUser} from './activity-candidate-user.entity';

/**
 * 投票活动表
 */
@Entity()
export class Activity extends BaseAbstractEntity {
  @Column({
    default: '',
    length: 255,
    comment: '活动标题',
  })
  title: string;

  @Column({
    type: 'tinyint',
    default: 1,
    comment: '状态 1 未开始 2 进行中 3 结束',
  })
  state: number;

  @OneToMany(type => ActivityCandidate, activityCandidates => activityCandidates.activity)
  activityCandidates: ActivityCandidate[];

  @OneToMany(type => ActivityCandidateUser, activityCandidateUsers => activityCandidateUsers.activity)
  activityCandidateUsers: ActivityCandidateUser[];
}
