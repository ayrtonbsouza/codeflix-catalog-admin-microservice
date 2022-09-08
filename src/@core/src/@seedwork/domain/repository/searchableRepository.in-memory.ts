import { Entity } from '../entities/entity';
import {
  ISearchableRepository,
  SearchParameters,
  SearchResult,
  SortDirection,
} from './repository-contracts';
import { RepositoryInMemory } from './repository.in-memory';

export abstract class SearchableRepositoryInMemory<E extends Entity>
  extends RepositoryInMemory<E>
  implements ISearchableRepository<E>
{
  sortableFields: string[] = [];

  async search(properties: SearchParameters): Promise<SearchResult<E>> {
    const filteredItems = await this.applyFilter(this.items, properties.filter);

    const sortedItems = await this.applySort(
      filteredItems,
      properties.sort,
      properties.sort_direction
    );

    const paginatedItems = await this.applyPagination(
      sortedItems,
      properties.page,
      properties.per_page
    );

    return new SearchResult({
      items: paginatedItems,
      total: filteredItems.length,
      current_page: properties.page,
      per_page: properties.per_page,
      sort: properties.sort,
      sort_direction: properties.sort_direction,
      filter: properties.filter,
    });
  }

  protected abstract applyFilter(
    items: E[],
    filter: string | null
  ): Promise<E[]>;

  protected async applySort(
    items: E[],
    sort: string | null,
    sort_direction: SortDirection | null
  ): Promise<E[]> {
    if (!sort || !this.sortableFields.includes(sort)) {
      return items;
    }

    return [...items].sort((a, b) => {
      if (a.props[sort] < b.props[sort]) {
        return sort_direction === 'asc' ? -1 : 1;
      }

      if (a.props[sort] > b.props[sort]) {
        return sort_direction === 'asc' ? 1 : -1;
      }

      return 0;
    });
  }

  protected async applyPagination(
    items: E[],
    page: SearchParameters['page'],
    per_page: SearchParameters['per_page']
  ): Promise<E[]> {
    const start = (page - 1) * per_page;
    const limit = start + per_page;
    return items.slice(start, limit);
  }
}
