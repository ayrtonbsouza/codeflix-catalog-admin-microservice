import { Entity } from '../entities/entity';
import { UniqueEntityId } from '../value-objects/unique-entity-id';

export interface IRepository<E extends Entity> {
  insert(entity: E): Promise<void>;
  findById(id: string | UniqueEntityId): Promise<E>;
  findAll(): Promise<E[]>;
  update(entity: E): Promise<void>;
  delete(id: string | UniqueEntityId): Promise<void>;
}

export type SortDirection = 'asc' | 'desc';

export type SearchProperties<Filter = string> = {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_direction?: SortDirection | null;
  filter?: Filter | null;
};

export class SearchParameters {
  protected _page: number;
  protected _per_page: number | 15;
  protected _sort: string | null;
  protected _sort_direction: SortDirection | null;
  protected _filter: string | null;

  constructor(properties: SearchProperties = {}) {
    this.page = properties.page;
    this.per_page = properties.per_page;
    this.sort = properties.sort;
    this.sort_direction = properties.sort_direction;
    this.filter = properties.filter;
  }

  get page() {
    return this._page;
  }

  private set page(value: number) {
    let _page = +value;

    if (
      Number.isNaN(_page) ||
      _page <= 0 ||
      parseInt(_page as any, 10) !== _page
    ) {
      _page = 1;
    }

    this._page = _page;
  }

  get per_page() {
    return this._per_page;
  }

  private set per_page(value: number) {
    let _per_page = value === (true as any) ? this._per_page : +value;

    if (
      Number.isNaN(_per_page) ||
      _per_page <= 0 ||
      parseInt(_per_page as any, 10) !== _per_page
    ) {
      _per_page = 15;
    }

    this._per_page = _per_page;
  }

  get sort() {
    return this._sort;
  }

  private set sort(value: string | null) {
    this._sort =
      value === null || value === undefined || value === '' ? null : `${value}`;
  }

  get sort_direction() {
    return this._sort_direction;
  }

  private set sort_direction(value: string | null) {
    if (!this.sort) {
      this._sort_direction = null;
      return;
    }
    const direction = `${value}`.toLowerCase();
    this._sort_direction =
      direction !== 'asc' && direction !== 'desc' ? 'asc' : direction;
  }

  get filter() {
    return this._filter;
  }

  private set filter(value: string | null) {
    this._filter =
      value === null || value === undefined || value === '' ? null : `${value}`;
  }
}

export interface ISearchableRepository<
  E extends Entity,
  SearchOutput,
  SearchInput = SearchParameters
> extends IRepository<E> {
  search(properties: SearchInput): Promise<SearchOutput>;
}
