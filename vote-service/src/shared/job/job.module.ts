import {Module} from '@nestjs/common';
import {ScheduleModule} from 'nest-schedule';
import {VoteModule} from '../../modules/vote/vote.module';
import {ScheduleService} from './schedule.service';

@Module({
  imports: [
    ScheduleModule.register(),
    VoteModule,
  ],
  providers: [ScheduleService],
})
export class JobModule {
}
