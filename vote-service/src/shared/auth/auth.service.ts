import {BadRequestException, Injectable} from '@nestjs/common';
import {JwtPayload} from './interface/jwt-payload.interface';
import * as jwt from 'jsonwebtoken';
import {UserService} from '../../modules/user/user.service';
import {getUserVerifyCodeRedisKey, JWT_SECRET, JWT_SECRET_EXPIRES_IN} from './constant';
import {User} from '../../modules/user/user.entity';
import {MailerService} from '@nest-modules/mailer';
import {GenVerifyCodeDto} from './dto/gen-verify-code.dto';
import {InjectRedisClient} from 'nestjs-ioredis';
import {UserLoginDto} from './dto/user-login.dto';
import {Redis} from 'ioredis';
import {ConfigService} from 'nestjs-configure';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly mailerService: MailerService,
    @InjectRedisClient()
    private readonly redisClient: Redis,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.userService.findUserById(payload.id);
  }

  /**
   * 生成 token
   * @param user
   */
  async createToken(user: User): Promise<string> {
    const payload: JwtPayload = {
      id: user.id,
      username: user.email,
    };
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_SECRET_EXPIRES_IN,
    });
  }

  /**
   * 生成验证码
   * @param query
   */
  async genVerifyCode(query: GenVerifyCodeDto) {
    // 8 位随机字符串
    const verifyCode = Math.random().toString(36).slice(-8);
    const emailOption = this.configService.get('email');
    // 发送邮件
    await this.mailerService.sendMail({
      to: query.email,
      from: emailOption.from,
      subject: '系统登陆验证码',
      text: '系统登陆验证码',
      html: `系统登陆验证码: ${verifyCode}`,
    });
    await this.redisClient.set(
      getUserVerifyCodeRedisKey(query.email),
      verifyCode,
      'EX',
      2 * 60, // 两分钟
    );
  }

  /**
   * 登录
   * @param body
   */
  async login(body: UserLoginDto) {
    const {email, verifyCode} = body;
    const cacheCode = await this.redisClient.get(getUserVerifyCodeRedisKey(email));
    if (verifyCode !== cacheCode) {
      throw new BadRequestException('验证码不正确，请重新输入');
    }
    const user = await this.userService.register(body);
    // 注册成功，生成 token 并写入 cookie 中
    const token = this.createToken(user);
    return token;
  }
}
