import {BaseAbstractEntity} from '../../../common/entities/base.abstract.entity';
import {Column, Entity, JoinColumn, ManyToOne} from 'typeorm';
import {Activity} from './activity.entity';
import {Candidate} from './candidate.entity';
import {User} from '../../user/user.entity';

/**
 * 投票候选人用户关联表
 */
@Entity()
export class ActivityCandidateUser extends BaseAbstractEntity {
  @Column({
    name: 'activity_id',
    type: 'int',
    nullable: true,
    comment: '活动ID',
  })
  activityId: number;

  @Column({
    name: 'candidate_id',
    type: 'int',
    nullable: true,
    comment: '候选人ID',
  })
  candidateId: number;

  @Column({
    name: 'user_id',
    type: 'int',
    nullable: true,
    comment: '用户ID',
  })
  userId: number;

  @ManyToOne(type => Activity, activity => activity.activityCandidateUsers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({name: 'activity_id'})
  activity: Activity;

  @ManyToOne(type => Candidate, candidate => candidate.activityCandidateUsers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({name: 'candidate_id'})
  candidate: Candidate;

  @ManyToOne(type => User, user => user.activityCandidateUsers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({name: 'user_id'})
  user: User;
}
