import {Cron, NestSchedule} from 'nest-schedule';
import {Injectable, Logger} from '@nestjs/common';
import {VoteService} from '../../modules/vote/services/vote.service';

@Injectable()
export class ScheduleService extends NestSchedule {

  constructor(
    private readonly voteService: VoteService,
  ) {
    super();
  }

  @Cron('* * * * *')
  async saveVoteResult2Db() {
    Logger.log('execute cron job', 'schedule#saveVoteResult2Db');
    await this.voteService.save2Db();
    Logger.log('execute done job', 'schedule#saveVoteResult2Db');
  }
}
