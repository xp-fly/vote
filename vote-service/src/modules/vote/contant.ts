/**
 * 活动的状态
 */
export enum ACTIVITY_STATE {
  init = 1, // 未开始
  pending = 2, // 进行中
  close = 3, // 结束
}

/**
 * 获取缓存到 redis 中的 key 值
 * @param id
 */
export function getActivityResultCacheKey(id: number) {
  return `activity_result_cache_${id}`;
}

/**
 * 获取锁的key
 * @param id
 */
export function getActivityResultLockKey(id: number) {
  return `activity_result_lock_${id}`;
}
