import { ValueObject } from '@/core/shared/domain/value-object';
import { IsEmail, validateSync } from 'class-validator';

export class EmailRules {
  @IsEmail()
  email: string;

  constructor(email: string) {
    this.email = email;
  }
}

export class Email extends ValueObject {
  readonly value: string;

  constructor(value: string) {
    super();
    this.validate(value);
    this.value = value;
  }

  private validate(value: string): void {
    const [errors] = validateSync(new EmailRules(value));
    if (errors) {
      throw new InvalidEmailError();
    }
  }
}

export class InvalidEmailError extends Error {
  constructor(message?: string) {
    super(message || 'Email must be a valid email address');
    this.name = 'InvalidEmailError';
  }
}
