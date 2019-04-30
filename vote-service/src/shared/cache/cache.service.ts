import {Injectable} from '@nestjs/common';
import {InjectRedisClient} from 'nestjs-ioredis';
import {Redis} from 'ioredis';

@Injectable()
export class CacheService {
  constructor(
    @InjectRedisClient()
    private readonly redisClient: Redis,
  ) {}

  /**
   * 设置锁
   * @param lockKey
   * @param time
   */
  setLock(lockKey: string, time?: number) {
    // 默认 10 秒过期
    const expireTime = time || 10 * 1000;
    return this.redisClient.setex(lockKey, expireTime, '1');
  }

  getLock(lockKey: string) {
    return this.redisClient.get(lockKey);
  }

  delLock(lockKey: string) {
    return this.redisClient.del(lockKey);
  }
}
