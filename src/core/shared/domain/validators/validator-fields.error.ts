export class ValidatorFieldsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidatorFieldsError';
  }
}
