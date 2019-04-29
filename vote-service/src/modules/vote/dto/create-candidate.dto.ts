import {IsNotEmpty} from 'class-validator';

export class CreateCandidateDto {
  @IsNotEmpty()
  name: string;
}
