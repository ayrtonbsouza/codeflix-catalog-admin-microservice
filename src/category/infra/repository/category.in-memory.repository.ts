import { CategoryRepository } from 'category/domain/repository/category.repository';
import { SearchableRepositoryInMemory } from '#seedwork/domain/repository/searchableRepository.in-memory';
import { SortDirection } from '#seedwork/domain/repository/repository-contracts';
import { Category } from '#category/domain/entities/category';

export class CategoryInMemoryRepository
  extends SearchableRepositoryInMemory<Category>
  implements CategoryRepository.Repository
{
  sortableFields: string[] = ['name', 'created_at'];

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

  protected async applySort(
    items: Category[],
    sort: string | null,
    sort_direction: SortDirection | null
  ): Promise<Category[]> {
    return !sort
      ? super.applySort(items, 'created_at', 'desc')
      : super.applySort(items, sort, sort_direction);
  }
}
