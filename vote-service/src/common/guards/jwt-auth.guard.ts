import {AuthGuard} from '@nestjs/passport';
import {ExecutionContext, Injectable} from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  canActivate(context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    // 白名单
    if (['/api/auth/login', '/api/auth/verifyCode'].includes(request.path)) {
      return true;
    }
    return super.canActivate(context);
  }

}
