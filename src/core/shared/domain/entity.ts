import { ValueObject } from '@/core/shared/domain/value-object';
import { Notification } from '@/core/shared/domain/validators/notification';

export abstract class Entity {
  abstract get entityId(): ValueObject;

  readonly notification: Notification = new Notification();
}
