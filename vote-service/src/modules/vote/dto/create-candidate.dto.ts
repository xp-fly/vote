import {IsNotEmpty} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class CreateCandidateDto {
  @ApiModelProperty({
    description: '选举人名称',
    required: true,
    type: 'string',
  })
  @IsNotEmpty()
  name: string;
}
