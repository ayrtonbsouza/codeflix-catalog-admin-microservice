import { ValidationError } from '../errors/validation.error';

export class ValidatorRules {
  private constructor(private value: any, private property: string) {}

  static values(value: any, property: string) {
    return new ValidatorRules(value, property);
  }

  required(): this {
    if (this.value === null || this.value === undefined || this.value === '') {
      throw new ValidationError(`The ${this.property} field is required`);
    }
    return this;
  }

  string(): this {
    if (typeof this.value !== 'string') {
      throw new ValidationError(`The ${this.property} field must be a string`);
    }
    return this;
  }

  maxLength(max: number): this {
    if (this.value.length > max) {
      throw new ValidationError(
        `The ${this.property} field must have less or equal than ${max} characters`
      );
    }
    return this;
  }
}
