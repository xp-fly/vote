import { Test, TestingModule } from '@nestjs/testing';
import {ActivityController} from './activity.controller';
import {ActivityService} from '../services/activity.service';

describe('ActivityController', () => {
  let activityController: ActivityController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ActivityController],
      providers: [ActivityService],
    }).compile();

    activityController = app.get<ActivityController>(ActivityController);
  });

  describe('unit test', () => {
    let activity;
    it('test create', async () => {
      activity = await activityController.create({
        title: '测试测试活动',
        candidates: [],
      });
      expect(activity.id).toBeInstanceOf(Number);
    });

    it('test edit', async () => {
      const res = await activityController.edit(activity.id, {
        title: '测试测试活动修改',
        candidates: [],
      });
      expect(res.id).toBeInstanceOf(Number);
    });

    it('test fetch', async () => {
      const res = await activityController.fetch({});
      expect(res).toBeInstanceOf(Object);
    });

    it('test start', async () => {
      const res = await activityController.start(activity.id);
      expect(res.id).toBeInstanceOf(Number);
    });

    it('test close', async () => {
      const res = await activityController.close(activity.id);
      expect(res.id).toBeInstanceOf(Number);
    });

    it('test delete', async () => {
      const res = await activityController.delete(activity.id);
      expect(res.id).toBeInstanceOf(Number);
    });
  });
});
