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

  it('[method] should be able to find a entity registry by id', async () => {
    const entity = new StubEntity({ name: 'test', price: 10 });
    await repository.insert(entity);
    let response = await repository.findById(entity.id);
    expect(response.toJSON()).toStrictEqual(entity.toJSON());
    response = await repository.findById(entity.uniqueEntityId);
    expect(response.toJSON()).toStrictEqual(entity.toJSON());
  });

  it('[method] should be able to find all entity registries', async () => {
    const entity = new StubEntity({ name: 'test', price: 10 });
    await repository.insert(entity);
    const entities = await repository.findAll();
    expect(entities).toStrictEqual([entity]);
  });

  it('[method] should not be able to update a entity registry with incorrect id', () => {
    const entity = new StubEntity({ name: 'test', price: 10 });
    expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(`Item with id ${entity.id} not found`)
    );
  });

  it('[method] should be able to update a entity registry', async () => {
    const entity = new StubEntity({ name: 'test', price: 10 });
    await repository.insert(entity);

    const updatedEntity = new StubEntity(
      { name: 'updated', price: 5 },
      entity.uniqueEntityId
    );

    await repository.update(updatedEntity);

    const response = await repository.findById(entity.id);
    expect(response.toJSON()).toStrictEqual(updatedEntity.toJSON());
  });

  it('[method] should not be able to delete a entity registry with incorrect id', () => {
    const entity = new StubEntity({ name: 'test', price: 10 });
    expect(repository.delete(entity.id)).rejects.toThrow(
      new NotFoundError(`Item with id ${entity.id} not found`)
    );
  });

  it('[method] should be able to delete a entity registry', async () => {
    const entity = new StubEntity({ name: 'test', price: 10 });
    await repository.insert(entity);
    expect(repository.items.length).toBe(1);
    await repository.delete(entity.id);
    expect(repository.items).toStrictEqual([]);
  });
});
