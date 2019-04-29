import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Activity} from './entities/activity.entity';
import {ActivityCandidate} from './entities/activity-candidate.entity';
import {ActivityCandidateUser} from './entities/activity-candidate-user.entity';
import {Candidate} from './entities/candidate.entity';
import {ActivityController} from './controllers/activity.controller';
import {VoteController} from './controllers/vote.controller';
import {ActivityService} from './services/activity.service';
import {VoteService} from './services/vote.service';
import {CandidateController} from './controllers/candidate.controller';
import {CandidateService} from './services/candidate.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Activity, ActivityCandidate, ActivityCandidateUser, Candidate]),
  ],
  controllers: [
    ActivityController,
    VoteController,
    CandidateController,
  ],
  providers: [
    ActivityService,
    VoteService,
    CandidateService,
  ],
  exports: [
    VoteService,
  ],
})
export class VoteModule {}
