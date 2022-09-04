import { CategoryRepository } from 'category/domain/repository/category.repository';
import { SearchableRepositoryInMemory } from '@seedwork/domain/repository/searchableRepository.in-memory';
import { Category } from '../../domain/entities/category';

export class CategoryInMemoryRepository
  extends SearchableRepositoryInMemory<Category>
  implements CategoryRepository.Repository
{
  protected async applyFilter(
    items: Category[],
    filter: CategoryRepository.Filter
  ): Promise<Category[]> {
    if (!filter) {
      return items;
    }

    return items.filter((item) =>
      item.props.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
}
