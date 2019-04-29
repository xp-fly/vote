import {IsEmail} from 'class-validator';

export class GenVerifyCodeDto {
  @IsEmail()
  email: string;
}
