import * as libraryClassValidator from 'class-validator';
import { ClassValidatorFields } from '../class-validator-fields';

class StubClassValidatorFields extends ClassValidatorFields<{
  field: string;
}> {}

describe('[Unit] Class Validator Fields', () => {
  it('[constructor] should initialize errors and validatedData variables with null values', () => {
    const validator = new StubClassValidatorFields();
    expect(validator.errors).toBeNull();
    expect(validator.validatedData).toBeNull();
  });

  it('[method] should be able to validate if there is any error', () => {
    const spyValidateSync = jest.spyOn(libraryClassValidator, 'validateSync');
    spyValidateSync.mockReturnValue([
      { property: 'field', constraints: { isNotEmpty: 'Test error' } },
    ]);
    const validator = new StubClassValidatorFields();
    expect(validator.validate(null)).toBeFalsy();
    expect(spyValidateSync).toHaveBeenCalled();
    expect(validator.validatedData).toBeNull();
    expect(validator.errors).toStrictEqual({ field: ['Test error'] });
  });

  it('[method] should be able to validate if there is any errors', () => {
    const spyValidateSync = jest.spyOn(libraryClassValidator, 'validateSync');
    spyValidateSync.mockReturnValue([]);
    const validator = new StubClassValidatorFields();
    expect(validator.validate({ field: 'Test Value' })).toBeTruthy();
    expect(spyValidateSync).toHaveBeenCalled();
    expect(validator.validatedData).toStrictEqual({ field: 'Test Value' });
    expect(validator.errors).toBeNull();
  });
});
