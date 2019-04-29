import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {CreateActivityDto} from '../dto/create-activity.dto';
import {ActivityService} from '../services/activity.service';
import {LoginRole} from '../../../common/decorators/login-role.decorator';
import {USER_ROLE} from '../../user/constant';
import {ApiUseTags} from '@nestjs/swagger';

@ApiUseTags('投票活动相关 api')
@Controller('activity')
@LoginRole(USER_ROLE.admin)
export class ActivityController {
  constructor(
    private readonly activityService: ActivityService,
  ) {}

  /**
   * 查询列表
   * @param query
   */
  @Get()
  async fetch(@Query() query) {
    const [rows, count] = await this.activityService.fetch(query);
    return {
      count,
      rows,
    };
  }

  /**
   * 创建活动
   * @param body
   */
  @Post()
  async create(@Body() body: CreateActivityDto) {
    const exist = await this.activityService.checkIsExist(body.title);
    if (exist) {
      throw new BadRequestException('活动名称已存在，请换一个添加');
    }
    const activity = await this.activityService.create(body);
    return {
      id: activity.id,
    };
  }

  /**
   * 编辑活动
   * @param id
   * @param body
   */
  @Put(':id')
  async edit(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: Partial<CreateActivityDto>,
  ) {
    const exist = await this.activityService.checkIsExist(body.title);
    if (exist && exist.id !== id) {
      throw new BadRequestException('该活动名称已存在，请勿修改');
    }
    const activity = await this.activityService.edit(id, body);
    return {
      id: activity.id,
    };
  }

  /**
   * 删除活动
   * @param id
   */
  @Delete(':id')
  async delete(
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    await this.activityService.delete(id);
    return {id};
  }

  /**
   * 开始活动
   * @param id
   */
  @Put(':id/start')
  async start(
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    await this.activityService.start(id);
    return {id};
  }

  /**
   * 关闭活动
   * @param id
   */
  @Put(':id/close')
  async close(
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    await this.activityService.close(id);
    return {id};
  }

  /**
   * 获取候选人的投票详情
   * @param activityId
   * @param candidateId
   */
  @Get(':id/result')
  async getActivityResult(
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return await this.activityService.getActivityResult(id);
  }

}
