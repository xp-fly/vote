import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from 'nestjs-configure';
import {AuthModule} from './shared/auth/auth.module';
import {UserModule} from './modules/user/user.module';
import {VoteModule} from './modules/vote/vote.module';
import {JobModule} from './shared/job/job.module';
import {DatabaseModule} from './shared/database/database.module';
import {EmailModule} from './shared/email/email.module';
import {CacheModule} from './shared/cache/cache.module';

@Module({
  imports: [
    // 配置模块加载
    ConfigModule.load(),
    // 数据库模块加载
    DatabaseModule,
    // 邮件模块
    EmailModule,
    // 缓存模块
    CacheModule,
    // 定时任务
    JobModule,
    // 鉴权模块
    AuthModule,
    // 用户模块
    UserModule,
    // 活动模块
    VoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
