import { Entity } from '../entities/entity';
import { ISearchableRepository } from './repository-contracts';
import { RepositoryInMemory } from './repository.in-memory';

export abstract class SearchableRepositoryInMemory<E extends Entity>
  extends RepositoryInMemory<E>
  implements ISearchableRepository<E, any, any>
{
  abstract search(properties: any): Promise<any>;
}
