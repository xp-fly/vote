import {createParamDecorator} from '@nestjs/common';

/**
 * 获取当前登录用户
 */
export const LoginUser = createParamDecorator((data, req) => {
  return req.user;
});
