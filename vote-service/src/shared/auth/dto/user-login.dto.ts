import {IsEmail, IsNotEmpty} from 'class-validator';

/**
 * 用户注册校验
 */
export class UserLoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  verifyCode: string;
}
