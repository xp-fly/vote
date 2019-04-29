import {Column, Entity, OneToMany} from 'typeorm';
import {BaseAbstractEntity} from '../../common/entities/base.abstract.entity';
import {ActivityCandidateUser} from '../vote/entities/activity-candidate-user.entity';

/**
 * 用户表
 */
@Entity()
export class User extends BaseAbstractEntity {

  @Column('varchar', {
    length: 50,
    comment: '邮箱',
    unique: true,
  })
  email: string;

  @Column('varchar', {
    length: 20,
    comment: '姓名',
    default: '',
  })
  name: string;

  @Column({
    type: 'tinyint',
    default: 1,
    comment: '角色 1 普通用户 2 管理员',
  })
  role: number;

  @OneToMany(() => ActivityCandidateUser, activityCandidateUsers => activityCandidateUsers.user)
  activityCandidateUsers: ActivityCandidateUser[];
}
