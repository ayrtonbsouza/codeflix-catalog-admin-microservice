import { Entity } from '../entities/entity';
import { NotFoundError } from '../errors/not-found.error';
import { UniqueEntityId } from '../value-objects/unique-entity-id';
import { RepositoryInMemory } from './repository.in-memory';

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends RepositoryInMemory<StubEntity> {}

describe('[Unit] In Memory Repository', () => {
  let repository: StubInMemoryRepository;

  beforeEach(() => {
    repository = new StubInMemoryRepository();
  });

  it('[method] should be able to insert a new entity registry', async () => {
    const entity = new StubEntity({ name: 'test', price: 10 });
    await repository.insert(entity);
    expect(repository.items[0].toJSON()).toStrictEqual(entity.toJSON());
  });

  it('[method] should not be able to find a entity registry with incorrect id', () => {
    const id = 'fake-id';
    expect(repository.findById(id)).rejects.toThrow(
      new NotFoundError(`Item with id ${id} not found`)
    );

    expect(
      repository.findById(
        new UniqueEntityId('a781225d-486a-4d2c-8465-1800c69d149e')
      )
    ).rejects.toThrow(
      new NotFoundError(
        `Item with id a781225d-486a-4d2c-8465-1800c69d149e not found`
      )
    );
  });

  // it('[method] should be able to find a entity registry by id', () => {});
});
