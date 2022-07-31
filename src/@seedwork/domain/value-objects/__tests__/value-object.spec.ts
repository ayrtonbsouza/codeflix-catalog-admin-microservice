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

  it('[method] should be able to convert value to string', () => {
    const date = new Date();
    const arrange = [
      { input: null, output: 'null' },
      { input: undefined, output: 'undefined' },
      { input: '', output: '' },
      { input: 'Test String', output: 'Test String' },
      { input: 0, output: '0' },
      { input: 1, output: '1' },
      { input: 5.5, output: '5.5' },
      { input: true, output: 'true' },
      { input: false, output: 'false' },
      { input: date, output: date.toString() },
      { input: { test: 'string' }, output: '{"test":"string"}' },
    ];

    arrange.forEach((value) => {
      const valueObject = new StubValueObject(value.input);
      expect(valueObject.toString()).toBe(value.output);
    });
  });
});
