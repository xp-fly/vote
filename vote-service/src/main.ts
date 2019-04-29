import {NestFactory, Reflector} from '@nestjs/core';
import { AppModule } from './app.module';
import {Logger, ValidationPipe} from '@nestjs/common';
import {TransformInterceptor} from './common/interceptors/transform.interceptor';
import {AnyExceptionFilter} from './common/filters/any-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {ConfigModule} from 'nestjs-configure';
import {JwtAuthGuard} from './common/guards/jwt-auth.guard';
import {RoleGuard} from './common/guards/role.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局路由前缀
  app.setGlobalPrefix('api');

  // 全局校验
  app.useGlobalPipes(new ValidationPipe());
  // 全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  // 全局过滤器
  app.useGlobalFilters(new AnyExceptionFilter());
  // 全局守卫
  app.useGlobalGuards(new JwtAuthGuard());
  app.useGlobalGuards(new RoleGuard(new Reflector()));

  // swagger
  const swaggerOpts = new DocumentBuilder()
    .setTitle('api doc')
    .setDescription('api description')
    .setVersion('1.0')
    .addTag('api')
    .setBasePath('api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOpts);
  SwaggerModule.setup('doc', app, document);

  const listenPort = ConfigModule.get('port');
  await app.listen(listenPort, () => {
    Logger.log(`server listening 0.0.0.0:${listenPort}`);
  });
}
bootstrap();
