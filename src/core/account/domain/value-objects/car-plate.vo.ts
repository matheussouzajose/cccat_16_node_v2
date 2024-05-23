import { ValueObject } from '@/core/shared/domain/value-object';

export class CarPlate extends ValueObject {
  private readonly FACTOR_FIRST_DIGIT = 10;
  private readonly FACTOR_SECOND_DIGIT = 11;
  readonly value: string;

  constructor(value: string) {
    super();
    this.validate(value);
    this.value = value;
  }

  private validate(value: string): void {
    if (value !== '' && value.match(/[A-Z]{3}[0-9]{4}/) === null) {
      throw new InvalidCarPlateError();
    }
  }
}

export class InvalidCarPlateError extends Error {
  constructor(message?: string) {
    super(message || 'Car plate must be a valid');
    this.name = 'InvalidCarPlateError';
  }
}
