import {IsEmail, IsNotEmpty} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

/**
 * 用户注册校验
 */
export class UserLoginDto {
  @ApiModelProperty({
    description: '邮箱',
    required: true,
    type: 'string',
  })
  @IsEmail()
  email: string;

  @ApiModelProperty({
    description: '验证码',
    required: true,
    type: 'string',
  })
  @IsNotEmpty()
  verifyCode: string;
}
