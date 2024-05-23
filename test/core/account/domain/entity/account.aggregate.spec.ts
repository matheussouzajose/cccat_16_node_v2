import {
  Account,
  AccountCreateCommand,
} from '@/core/account/domain/entity/account.aggregate';
import { ValidatorFieldsError } from '@/core/shared/domain/validators/validator-fields.error';

describe('Account Aggregate Unit Tests', () => {
  test('Should throw error when name is empty', () => {
    expect(() => {
      const accountCreateCommand: AccountCreateCommand = {
        name: '',
        email: 'john.doe@mail.com',
        cpf: '59142984076',
        isDriver: false,
        isPassenger: true,
        carPlate: 'AMD1234',
      };
      Account.create(accountCreateCommand);
    }).toThrowError(new ValidatorFieldsError('name should not be empty'));
  });

  test('Should be create passenger account', () => {
    const accountCreateCommand: AccountCreateCommand = {
      name: 'John Doe',
      email: 'john.doe@mail.com',
      cpf: '59142984076',
      isDriver: false,
      isPassenger: true,
      carPlate: '',
    };
    const account = Account.create(accountCreateCommand);
    expect(account.entityId).toBeDefined();
    expect(account.getName()).toBe('John Doe');
    expect(account.getEmail()).toBe('john.doe@mail.com');
    expect(account.getCpf()).toBe('59142984076');
    expect(account.getCarPlate()).toBe('');
    expect(account.isPassenger).toBeTruthy();
    expect(account.isDriver).toBeFalsy();
  });
});
