export const JWT_SECRET = 'faldkfjadkfdksalfjdsakfdjk';
export const JWT_SECRET_EXPIRES_IN = 3600;

/**
 * 获取验证码的redis的key值
 * @param email
 */
export function getUserVerifyCodeRedisKey(email: string) {
  return `verify_code_${email}`;
}
