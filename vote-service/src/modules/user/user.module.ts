import {Module, OnModuleInit} from '@nestjs/common';
import {UserService} from './user.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserRepository} from './user.repository';
import {Connection} from 'typeorm';
import {User} from './user.entity';
import {USER_ROLE} from './constant';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements OnModuleInit {
  constructor(
    private readonly connection: Connection,
  ) {}
  async onModuleInit() {
    // 初始化管理员用户
    const userRepo = this.connection.getRepository(User);
    let adminUser = await userRepo.findOne({
      where: {
        role: USER_ROLE.admin,
      },
      select: ['id'],
    });
    if (!adminUser) {
      adminUser = userRepo.create({
        email: '123456789@qq.com',
        role: USER_ROLE.admin,
      });
      await userRepo.save(adminUser);
    }
  }
}
