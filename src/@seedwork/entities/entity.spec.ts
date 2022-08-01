import { validate } from 'uuid';
import { UniqueEntityId } from '../domain/value-objects/unique-entity-id';
import { Entity } from './entity';

type StubProperties = {
  firstAttribute: string;
  secondAttribute: number;
};

class StubEntity extends Entity<StubProperties> {}

describe('[Unit] Entity Abstract Class', () => {
  it('[constructor] it should be able to send properties as parameters', () => {
    const input = {
      firstAttribute: 'firstAttribute',
      secondAttribute: 10,
    };

    const output = new StubEntity(input);

    expect(output.props).toStrictEqual(input);
    expect(output.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(validate(output.id)).toBeTruthy();
  });

  it('[constructor] should be able to send an id and properties as parameter', () => {
    const input = {
      firstAttribute: 'firstAttribute',
      secondAttribute: 10,
    };
    const uniqueEntityId = new UniqueEntityId();
    const output = new StubEntity(input, uniqueEntityId);
    expect(output.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(output.id).toBe(uniqueEntityId.value);
    expect(validate(output.id)).toBeTruthy();
  });

  it('[method] should be able to convert properties to json', () => {
    const input = {
      firstAttribute: 'firstAttribute',
      secondAttribute: 10,
    };
    const uniqueEntityId = new UniqueEntityId();
    const output = new StubEntity(input, uniqueEntityId);
    expect(output.toJSON()).toStrictEqual({
      id: uniqueEntityId.value,
      ...input,
    });
  });
});
