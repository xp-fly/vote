import {Body, Controller, Post} from '@nestjs/common';
import {CreateVoteDto} from '../dto/create-vote.dto';
import {VoteService} from '../services/vote.service';
import {LoginUser} from '../../../common/decorators/login-user.decorator';
import {User} from '../../user/user.entity';
import {ApiUseTags} from '@nestjs/swagger';

@ApiUseTags('用户投票接口 api')
@Controller('vote')
export class VoteController {

  constructor(private readonly voteService: VoteService) {}

  @Post()
  async create(@Body() body: CreateVoteDto, @LoginUser() user: User) {
    await this.voteService.create(user, body);
  }
}
