import { ValidationError } from '../../errors/validation.error';
import { ValidatorRules } from '../validator-rules';

type Values = {
  value: any;
  property: string;
};

type ExpectedRule = {
  value: any;
  property: string;
  rule: keyof ValidatorRules;
  error: ValidationError;
  params?: any[];
};

function runRule({
  value,
  property,
  rule,
  params = [],
}: Omit<ExpectedRule, 'error'>) {
  const validator = ValidatorRules.values(value, property);
  const method = validator[rule] as (...args: any[]) => ValidatorRules;
  method.apply(validator, params);
}

function assertIsInvalid(expected: ExpectedRule) {
  expect(() => {
    runRule(expected);
  }).toThrow(expected.error);
}

function assertIsValid(expected: ExpectedRule) {
  expect(() => {
    runRule(expected);
  }).not.toThrow(expected.error);
}

describe('[Unit] Validator Rules', () => {
  it('[method] Should be able to receive values', () => {
    const validator = ValidatorRules.values('some value', 'field');
    expect(validator).toBeInstanceOf(ValidatorRules);
    expect(validator['value']).toBe('some value');
    expect(validator['property']).toBe('field');
  });

  it('[method] should be able to validate a required value', () => {
    // invalid cases
    let arrange: Values[] = [
      { value: null, property: 'field' },
      { value: undefined, property: 'field' },
      { value: '', property: 'field' },
    ];
    const error = new ValidationError('The field is required');
    arrange.forEach((item) => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: 'required',
        error,
      });
    });

    // valid cases
    arrange = [
      { value: 'test', property: 'field' },
      { value: 5, property: 'field' },
      { value: 0, property: 'field' },
      { value: false, property: 'field' },
    ];

    arrange.forEach((item) => {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: 'required',
        error,
      });
    });
  });

  it('[method] should be able to validate a string value', () => {
    let arrange: Values[] = [
      { value: 5, property: 'field' },
      { value: {}, property: 'field' },
      { value: false, property: 'field' },
    ];
    const error = new ValidationError('The field must be a string');
    arrange.forEach((item) => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: 'string',
        error,
      });
    });

    // valid cases
    arrange = [
      { value: null, property: 'field' },
      { value: undefined, property: 'field' },
      { value: 'test', property: 'field' },
    ];

    arrange.forEach((item) => {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: 'string',
        error,
      });
    });
  });

  it('[method] should be able the max length of a value', () => {
    // invalid cases
    let arrange: Values[] = [{ value: 'aaaaaa', property: 'field' }];
    const error = new ValidationError(
      'The field must be less or equal than 5 characters'
    );
    arrange.forEach((item) => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: 'maxLength',
        error,
        params: [5],
      });
    });

    // valid cases
    arrange = [
      { value: null, property: 'field' },
      { value: undefined, property: 'field' },
      { value: 'aaaaa', property: 'field' },
    ];

    arrange.forEach((item) => {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: 'maxLength',
        error,
        params: [5],
      });
    });
  });

  it('[method] should be able to validate a boolean value', () => {
    // invalid cases
    let arrange: Values[] = [
      { value: 5, property: 'field' },
      { value: 'true', property: 'field' },
      { value: 'false', property: 'field' },
    ];
    const error = new ValidationError('The field must be a boolean');
    arrange.forEach((item) => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: 'boolean',
        error,
      });
    });

    // valid cases
    arrange = [
      { value: null, property: 'field' },
      { value: undefined, property: 'field' },
      { value: false, property: 'field' },
      { value: true, property: 'field' },
    ];

    arrange.forEach((item) => {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: 'boolean',
        error,
        params: [5],
      });
    });
  });

  it('[method] should be able to throw more than one error when validations are combined', () => {
    let validator = ValidatorRules.values(null, 'field');
    expect(() => {
      validator.required().string().maxLength(5);
    }).toThrow(new ValidationError('The field is required'));

    validator = ValidatorRules.values(5, 'field');
    expect(() => {
      validator.required().string().maxLength(5);
    }).toThrow(new ValidationError('The field must be a string'));

    validator = ValidatorRules.values('aaaaaa', 'field');
    expect(() => {
      validator.required().string().maxLength(5);
    }).toThrow(
      new ValidationError('The field must be less or equal than 5 characters')
    );

    validator = ValidatorRules.values(null, 'field');
    expect(() => {
      validator.required().boolean();
    }).toThrow(new ValidationError('The field is required'));

    validator = ValidatorRules.values(5, 'field');
    expect(() => {
      validator.required().boolean();
    }).toThrow(new ValidationError('The field must be a boolean'));
  });

  it('[method] should be able to receive more than one validation rule', () => {
    expect.assertions(0);
    ValidatorRules.values('test', 'field').required().string();
    ValidatorRules.values('aaaaa', 'field').required().string().maxLength(5);

    ValidatorRules.values(true, 'field').required().boolean();
    ValidatorRules.values(false, 'field').required().boolean();
  });
});
