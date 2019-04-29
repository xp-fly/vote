import {IsArray, IsNumber} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class CreateVoteDto {
  @ApiModelProperty({
    description: '选举人id数组',
    required: true,
    type: 'array',
  })
  @IsArray()
  candidates: number[]; // 投票

  @ApiModelProperty({
    description: '活动ID',
    required: true,
    type: 'number',
  })
  @IsNumber()
  activityId: number; // 活动 ID
}
