import {createHash} from 'crypto';

const CRYPTO_KEY = '12321asdasdsad3323';

/**
 * 加密邮箱
 * @param email
 */
export function md5Email(email: string) {
  if (!email) {
    throw new Error('email is required');
  }
  return createHash('md5').update(`${email}${CRYPTO_KEY}`).digest('hex');
}
