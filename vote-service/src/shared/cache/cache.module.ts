import {Module} from '@nestjs/common';
import {RedisModule} from 'nestjs-ioredis';
import {ConfigService} from 'nestjs-configure';

@Module({
  imports: [
    RedisModule.forAsync({}, {
      useFactory: (configService: ConfigService) => {
        const redisOpt = configService.get('redis') || [];
        return Array.isArray(redisOpt) ? redisOpt : [redisOpt];
      },
      inject: [ConfigService],
    }),
  ],
})
export class CacheModule {
}
