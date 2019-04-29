import {IsEmail} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class GenVerifyCodeDto {
  @ApiModelProperty({
    description: '邮箱',
    required: true,
    type: 'string',
  })
  @IsEmail()
  email: string;
}
