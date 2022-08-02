import { ValidationError } from '../errors/validation.error';
import { ValidatorRules } from './validator-rules';

describe('[Unit] Validator Rules', () => {
  it('[method] should return values', () => {
    const validator = ValidatorRules.values('Test Value', 'test_property');
    expect(validator).toBeInstanceOf(ValidatorRules);
    expect(validator['value']).toBe('Test Value');
    expect(validator['property']).toBe('test_property');
  });

  it('[method] should be able to validate when property is required', () => {
    expect(() =>
      ValidatorRules.values(null, 'test_property').required()
    ).toThrow(new ValidationError(`The test_property field is required`));

    expect(() =>
      ValidatorRules.values(undefined, 'test_property').required()
    ).toThrow(new ValidationError(`The test_property field is required`));

    expect(() => ValidatorRules.values('', 'test_property').required()).toThrow(
      new ValidationError(`The test_property field is required`)
    );
  });

  it('[method] should not throw error when required value is valid', () => {
    expect(() =>
      ValidatorRules.values(5, 'test_property').required()
    ).not.toThrow(new ValidationError(`The test_property field is required`));

    expect(() =>
      ValidatorRules.values('Test string', 'test_property').required()
    ).not.toThrow(new ValidationError(`The test_property field is required`));

    expect(() =>
      ValidatorRules.values(false, 'test_property').required()
    ).not.toThrow(new ValidationError(`The test_property field is required`));
  });
});
