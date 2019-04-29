import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import {JwtPayload} from './interface/jwt-payload.interface';
import {JWT_SECRET} from './constant';
import {UserService} from '../../modules/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JWT_SECRET,
        });
    }

    /**
     * 验证 token
     * @param payload
     * @param done
     */
    async validate(payload: JwtPayload) {
        const user = await this.userService.findUserById(payload.id);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
