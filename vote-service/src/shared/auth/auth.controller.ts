import {Body, Controller, Get, Post, Query, Res} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UserLoginDto} from './dto/user-login.dto';
import {GenVerifyCodeDto} from './dto/gen-verify-code.dto';
import {ApiUseTags} from '@nestjs/swagger';

@ApiUseTags('登录相关 api')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  /**
   * login
   * @param body
   */
  @Post('login')
  async login(@Body() body: UserLoginDto, @Res() response) {
    const token = await this.authService.login(body);
    response.cookie('token', token, {
      maxAge: 60 * 60 * 1000,
    }).json(token);
    return token;
  }

  /**
   * 生成验证码
   * @param query
   */
  @Get('verifyCode')
  async verifyCode(
    @Query() query: GenVerifyCodeDto,
  ) {
    await this.authService.genVerifyCode(query);
    return 'success';
  }
}
