import {IsArray, IsDateString, IsNotEmpty} from 'class-validator';

export class CreateActivityDto {
  @IsNotEmpty()
  title: string; // 标题

  @IsArray()
  candidates: number[]; // 候选人id数组
}
