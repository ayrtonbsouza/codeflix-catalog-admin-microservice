import { ValueObject } from '../value-object';

class StubValueObject extends ValueObject {}

describe('[Unit] Value Object Abstract Class', () => {
  it('[constructor] should be able to set a string as value', () => {
    const valueObject = new StubValueObject('Test String');
    expect(valueObject.value).toBe('Test String');
  });

  it('[constructor] should be able to set a object as value', () => {
    const valueObject = new StubValueObject({
      test_string: 'Test String',
      test_number: 10,
    });

    expect(valueObject.value).toStrictEqual({
      test_string: 'Test String',
      test_number: 10,
    });
  });
});
