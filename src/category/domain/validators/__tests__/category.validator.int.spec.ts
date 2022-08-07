import { CategoryRules } from '../category.rules';
import { CategoryValidator } from '../category.validator';
import { CategoryValidatorFactory } from '../category.validator.factory';

describe('[Integration] Category Validator', () => {
  let validator: CategoryValidator;

  beforeEach(() => {
    validator = CategoryValidatorFactory.create();
  });

  it('[method] should be able to validate name field when the parameter is wrong', () => {
    expect({ validator, data: null }).containsErrorMessages({
      name: [
        'name must be shorter than or equal to 255 characters',
        'name must be a string',
        'name should not be empty',
      ],
    });

    expect({ validator, data: { name: '' } }).containsErrorMessages({
      name: ['name should not be empty'],
    });

    expect({ validator, data: { name: 5 as any } }).containsErrorMessages({
      name: [
        'name must be shorter than or equal to 255 characters',
        'name must be a string',
      ],
    });

    expect({
      validator,
      data: { name: 't'.repeat(256) },
    }).containsErrorMessages({
      name: ['name must be shorter than or equal to 255 characters'],
    });
  });

  it('[method] should be able to validate description field when the parameter is wrong', () => {
    expect({
      validator,
      data: { description: 5 as any },
    }).containsErrorMessages({
      description: ['description must be a string'],
    });
  });

  it('[method] should be able to validate is_active field when the parameter is wrong', () => {
    expect({
      validator,
      data: { is_active: 0 },
    }).containsErrorMessages({
      is_active: ['is_active must be a boolean value'],
    });
  });

  it('[method] should be able to validate fields when parameters is correct', () => {
    const input = [
      { name: 'Test Name' },
      { name: 'Test Name', description: null },
      { name: 'Test Name', description: undefined },
      { name: 'Test Name', description: 'Test Description' },
      { name: 'Test Name', is_active: true },
      { name: 'Test Name', is_active: false },
    ];

    input.forEach((item) => {
      const isValid = validator.validate(item);
      expect(isValid).toBeTruthy();
      expect(validator.validatedData).toStrictEqual(new CategoryRules(item));
    });
  });
});
