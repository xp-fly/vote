import {BaseAbstractEntity} from '../../../common/entities/base.abstract.entity';
import {Column, Entity, OneToMany} from 'typeorm';
import {ActivityCandidate} from './activity-candidate.entity';
import {ActivityCandidateUser} from './activity-candidate-user.entity';

/**
 * 投票候选人表
 */
@Entity()
export class Candidate extends BaseAbstractEntity {

  @Column('varchar', {
    length: 50,
    comment: '姓名',
    default: '',
  })
  name: string;

  @OneToMany(type => ActivityCandidate, activityCandidates => activityCandidates.candidate)
  activityCandidates: ActivityCandidate[];

  @OneToMany(type => ActivityCandidateUser, activityCandidateUsers => activityCandidateUsers.activity)
  activityCandidateUsers: ActivityCandidateUser[];
}
