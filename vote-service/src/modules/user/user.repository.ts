import {EntityRepository, Repository} from 'typeorm';
import {User} from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  /**
   * 检查用户是否存在
   * @param email
   */
  async checkEmailIsExist(email: string) {
    return await this.findOne({
      where: {email},
      select: ['id', 'email'],
    });
  }
}
