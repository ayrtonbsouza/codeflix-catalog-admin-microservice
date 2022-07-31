import { deepFreeze } from '../object';

describe('[Unit] Object Util', () => {
  it('[method] should not freeze string values', () => {
    const string = deepFreeze('Test');
    expect(typeof string).toBe('string');
  });

  it('[method] should not freeze boolean values', () => {
    const boolean = deepFreeze(true);
    expect(typeof boolean).toBe('boolean');
  });

  it('[method] should not freeze boolean values', () => {
    const number = deepFreeze(5);
    expect(typeof number).toBe('number');
  });

  it('[method] should be able to turn a object immutable', () => {
    const object = deepFreeze({
      firstProperty: 'Test',
      deep: {
        secondProperty: 'Test',
        thirdProperty: new Date(),
      },
    });
    expect(() => {
      (object as any).firstProperty = '';
    }).toThrow(
      "Cannot assign to read only property 'firstProperty' of object '#<Object>'"
    );
    expect(() => {
      (object as any).deep.secondProperty = '';
    }).toThrow(
      "Cannot assign to read only property 'secondProperty' of object '#<Object>'"
    );
    expect(object.deep.thirdProperty).toBeInstanceOf(Date);
  });
});
