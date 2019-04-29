import { Test, TestingModule } from '@nestjs/testing';
import {ActivityController} from './activity.controller';
import {ActivityService} from '../services/activity.service';
import {DatabaseModule} from '../../../shared/database/database.module';
import {ConfigModule} from 'nestjs-configure';
import {CacheModule} from '../../../shared/cache/cache.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Activity} from '../entities/activity.entity';
import {ActivityCandidate} from '../entities/activity-candidate.entity';
import {asap} from 'rxjs/internal/scheduler/asap';

describe('ActivityController', () => {
  let activityController: ActivityController;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.load(),
        DatabaseModule,
        CacheModule,
        TypeOrmModule.forFeature([Activity, ActivityCandidate]),
      ],
      controllers: [ActivityController],
      providers: [ActivityService],
    }).compile();

    activityController = app.get<ActivityController>(ActivityController);
  });

  describe('unit test', async () => {
    let activity;
    it('test create', async () => {
      activity = await activityController.create({
        title: '测试测试活动',
        candidates: [],
      });
      expect(activity).toBeInstanceOf(Object);
    });

    it('test edit', async () => {
      const res = await activityController.edit(activity.id, {
        title: '测试测试活动修改',
        candidates: [],
      });
      expect(res).toBeInstanceOf(Object);
    });

    it('test fetch', async () => {
      const res = await activityController.fetch({});
      expect(res).toBeInstanceOf(Object);
    });

    it('test start', async () => {
      const res = await activityController.start(activity.id);
      expect(res).toBeInstanceOf(Object);
    });

    it('test close', async () => {
      const res = await activityController.close(activity.id);
      expect(res).toBeInstanceOf(Object);
    });

    it('test delete', async () => {
      const res = await activityController.delete(activity.id);
      expect(res).toBeInstanceOf(Object);
    });
  });
});
