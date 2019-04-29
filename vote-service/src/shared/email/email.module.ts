import {Module} from '@nestjs/common';
import {HandlebarsAdapter, MailerModule} from '@nest-modules/mailer';
import {ConfigService} from 'nestjs-configure';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const emailOptions = configService.get('email');
        return {
          transport: emailOptions.transport,
          defaults: {
            from: emailOptions.from,
          },
          template: {
            dir: __dirname + '/templates',
            adapter: new HandlebarsAdapter(), // or new PugAdapter()
            options: {
              strict: true,
            },
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class EmailModule {

}
