import { ClassValidatorFields } from '@/core/shared/domain/validators/class-validator-fields';
import { Account } from '@/core/account/domain/entity/account.aggregate';
import { Notification } from '@/core/shared/domain/validators/notification';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CategoryRules {
  @IsString({ groups: ['name'] })
  @IsNotEmpty({ groups: ['name'] })
  @MaxLength(255, { groups: ['name'] })
  name: string;

  constructor(entity: Account) {
    Object.assign(this, entity);
  }
}

export class AccountValidator extends ClassValidatorFields {
  validate(notification: Notification, data: any, fields?: string[]): boolean {
    const newFields = fields?.length ? fields : ['name'];
    return super.validate(notification, new CategoryRules(data), newFields);
  }
}

export class AccountValidatorFactory {
  static create() {
    return new AccountValidator();
  }
}
