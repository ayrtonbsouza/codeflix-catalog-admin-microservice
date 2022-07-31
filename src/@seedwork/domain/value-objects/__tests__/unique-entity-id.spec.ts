import { validate as uuidValidate } from 'uuid';
import { InvalidUuidError } from '../../../errors/invalid-uuid.error';
import { UniqueEntityId } from '../unique-entity-id';

describe('[Unit] Unique Entity Id Value Object', () => {
  it('[constructor] should be able to accept a valid uuid as parameter', () => {
    const input = '123e4567-e89b-12d3-a456-426655440000';
    const validate = jest.spyOn(UniqueEntityId.prototype as any, 'validate');

    const output = new UniqueEntityId(input);

    expect(output.value).toBe(input);
    expect(validate).toHaveBeenCalled();
  });

  it('[constructor] should be able to create a new uuid if no parameter is passed', () => {
    const validate = jest.spyOn(UniqueEntityId.prototype as any, 'validate');

    const output = new UniqueEntityId();

    expect(output.value).toBeDefined();
    expect(uuidValidate(output.value)).toBeTruthy();
    expect(validate).toHaveBeenCalled();
  });

  it('[method] should return an error if uuid is invalid', () => {
    const input = 'invalid-uuid';
    const validate = jest.spyOn(UniqueEntityId.prototype as any, 'validate');

    expect(() => new UniqueEntityId(input)).toThrow(new InvalidUuidError());
    expect(validate).toHaveBeenCalled();
  });
});
