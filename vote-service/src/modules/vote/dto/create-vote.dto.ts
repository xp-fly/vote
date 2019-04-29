import {IsArray, IsNumber} from 'class-validator';

export class CreateVoteDto {
  @IsArray()
  candidates: number[]; // 投票

  @IsNumber()
  activityId: number; // 活动 ID
}
