import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put} from '@nestjs/common';
import {CandidateService} from '../services/candidate.service';
import {CreateCandidateDto} from '../dto/create-candidate.dto';

@Controller('candidate')
export class CandidateController {
  constructor(
    private readonly candidateService: CandidateService,
  ) {}

  /**
   * 列表
   */
  @Get()
  async fetch() {
    return this.candidateService.fetch();
  }

  /**
   * 创建
   * @param body
   */
  @Post()
  async create(
    @Body() body: CreateCandidateDto,
  ) {
    const res = await this.candidateService.create(body);
    return {id: res.id};
  }

  /**
   * 编辑
   * @param id
   * @param body
   */
  @Put(':id')
  async edit(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: Partial<CreateCandidateDto>,
  ) {
    await this.candidateService.edit(id, body);
    return {id};
  }

  /**
   * 删除
   * @param id
   */
  @Delete(':id')
  async delete(
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    await this.candidateService.delete(id);
    return {id};
  }
}
