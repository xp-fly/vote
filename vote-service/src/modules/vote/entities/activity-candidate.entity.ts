import {Column, JoinColumn, ManyToOne} from 'typeorm';
import {Activity} from './activity.entity';
import {Candidate} from './candidate.entity';
import {BaseAbstractEntity} from '../../../common/entities/base.abstract.entity';
import {Entity} from 'typeorm';

/**
 * 投票候选人关联表
 */
@Entity()
export class ActivityCandidate extends BaseAbstractEntity {
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

  @ManyToOne(type => Activity, activity => activity.activityCandidates, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({name: 'activity_id'})
  activity: Activity;

  @ManyToOne(type => Candidate, candidate => candidate.activityCandidates, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({name: 'candidate_id'})
  candidate: Candidate;
}
