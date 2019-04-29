import {IsArray, IsDateString, IsNotEmpty} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class CreateActivityDto {
  @ApiModelProperty({
    description: '活动标题',
    required: true,
    type: 'string',
  })
  @IsNotEmpty()
  title: string; // 标题

  @ApiModelProperty({
    description: '选举人数组',
    required: true,
    type: 'array',
  })
  @IsArray()
  candidates: number[]; // 候选人id数组
}
