import { Uuid } from '@/core/shared/domain/value-objects/uuid.vo';
import { AggregateRoot } from '@/core/shared/domain/aggregate-root';
import { ValueObject } from '@/core/shared/domain/value-object';
import { AccountValidatorFactory } from '@/core/account/domain/validators/account.validator';
import { ValidatorFieldsError } from '@/core/shared/domain/validators/validator-fields.error';
import {
  Email,
  Cpf,
  CarPlate,
} from '@/core/account/domain/value-objects/index.vo';

export type AccountConstructorProps = {
  accountId: Uuid;
  name: string;
  email: string;
  cpf: string;
  carPlate: string;
  isPassenger: boolean;
  isDriver: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type AccountCreateCommand = Omit<
  AccountConstructorProps,
  'accountId' | 'createdAt' | 'updatedAt'
>;

export type AccountRestoreCommand = Required<AccountConstructorProps>;

export class Account extends AggregateRoot {
  private readonly accountId: Uuid;
  private name: string;
  private email: Email;
  private cpf: Cpf;
  private carPlate: CarPlate;
  readonly isPassenger: boolean;
  readonly isDriver: boolean;
  readonly createdAt: Date;
  updatedAt: Date;

  private constructor(props: AccountConstructorProps) {
    super();
    this.accountId = props.accountId;
    this.name = props.name;
    this.email = new Email(props.email);
    this.cpf = new Cpf(props.cpf);
    this.carPlate = new CarPlate(props.carPlate);
    this.isPassenger = props.isPassenger;
    this.isDriver = props.isDriver;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(props: AccountCreateCommand): Account {
    const accountId = new Uuid();
    const createdAt = new Date();
    const account = new Account({
      ...props,
      accountId,
      createdAt,
      updatedAt: createdAt,
    });
    account.validate(['name', 'email']);
    return account;
  }

  private validate(fields?: string[]): void {
    AccountValidatorFactory.create().validate(this.notification, this, fields);
    if (this.notification.hasErrors()) {
      throw new ValidatorFieldsError(this.notification.messages());
    }
  }

  static restore(props: AccountRestoreCommand): Account {
    const account = new Account(props);
    account.validate(['name', 'email']);
    return account;
  }

  get entityId(): ValueObject {
    return this.accountId;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email.value;
  }

  getCpf(): string {
    return this.cpf.value;
  }

  getCarPlate(): string {
    return this.carPlate.value;
  }

  changeName(name: string): void {
    this.name = name;
    this.updatedAt = new Date();
  }

  changeEmail(email: string): void {
    this.email = new Email(email);
    this.updatedAt = new Date();
  }

  changeCpf(cpf: string): void {
    this.cpf = new Cpf(cpf);
    this.updatedAt = new Date();
  }

  changeCarPlate(carPlate: string): void {
    this.carPlate = new CarPlate(carPlate);
    this.updatedAt = new Date();
  }
}
