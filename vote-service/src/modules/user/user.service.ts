import {Injectable} from '@nestjs/common';
import {UserRepository} from './user.repository';
import {InjectRepository} from '@nestjs/typeorm';
import {UserLoginDto} from '../../shared/auth/dto/user-login.dto';

@Injectable()
export class UserService {
  constructor(
   @InjectRepository(UserRepository)
   private readonly userRepo: UserRepository,
  ) {}

  /**
   * 用户注册
   * @param body
   */
  async register(body: UserLoginDto) {
    const user = this.userRepo.create({
      email: body.email,
    });

    const exist = await this.userRepo.checkEmailIsExist(user.email);
    if (exist) {
      return exist;
    }

    await this.userRepo.save(user);
    return user;
  }

  /**
   * 根据 id 查询用户
   * @param id
   */
  findUserById(id: number) {
    return this.userRepo.findOne(id);
  }

  /**
   * 根据 email 查询用户
   * @param email
   */
  findOneByEmail(email: string) {
    return this.userRepo.findOne({
      where: {
        email,
      },
    });
  }
}
