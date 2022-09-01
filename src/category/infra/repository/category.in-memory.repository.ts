import { CategoryRepository } from 'category/domain/repository/category.repository';
import { SearchableRepositoryInMemory } from '@seedwork/domain/repository/searchableRepository.in-memory';
import { Category } from '../../domain/entities/category';

export class CategoryInMemoryRepository
  extends SearchableRepositoryInMemory<Category>
  implements CategoryRepository
{
  search(properties: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
