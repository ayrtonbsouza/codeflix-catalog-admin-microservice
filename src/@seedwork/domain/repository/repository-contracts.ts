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

export class SearchParameters<Filter = string> {
  protected _page: number;
  protected _per_page: number | 15;
  protected _sort: string | null;
  protected _sort_direction: SortDirection | null;
  protected _filter: Filter | null;

  constructor(properties: SearchProperties<Filter> = {}) {
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

  get sort(): string | null {
    return this._sort;
  }

  private set sort(value: string | null) {
    this._sort =
      value === null || value === undefined || value === '' ? null : `${value}`;
  }

  get sort_direction(): SortDirection | null {
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

  get filter(): Filter | null {
    return this._filter;
  }

  private set filter(value: Filter | null) {
    this._filter =
      value === null || value === undefined || (value as unknown) === ''
        ? null
        : (`${value}` as any);
  }
}

type SearchResultProperties<E extends Entity, Filter> = {
  items: E[];
  total: number;
  current_page: number;
  per_page: number;
  sort: string | null;
  sort_direction: string | null;
  filter: Filter | null;
};

export class SearchResult<E extends Entity, Filter = string> {
  readonly items: E[];
  readonly total: number;
  readonly current_page: number;
  readonly per_page: number;
  readonly last_page: number;
  readonly sort: string | null;
  readonly sort_direction: string | null;
  readonly filter: Filter;

  constructor(properties: SearchResultProperties<E, Filter>) {
    this.items = properties.items;
    this.total = properties.total;
    this.current_page = properties.current_page;
    this.per_page = properties.per_page;
    this.last_page = Math.ceil(properties.total / properties.per_page);
    this.sort = properties.sort;
    this.sort_direction = properties.sort_direction;
    this.filter = properties.filter;
  }

  toJSON() {
    return {
      items: this.items,
      total: this.total,
      current_page: this.current_page,
      per_page: this.per_page,
      last_page: this.last_page,
      sort: this.sort,
      sort_direction: this.sort_direction,
      filter: this.filter,
    };
  }
}

export interface ISearchableRepository<
  E extends Entity,
  Filter = string,
  SearchInput = SearchParameters,
  SearchOutput = SearchResult<E, Filter>
> extends IRepository<E> {
  sortableFields: string[];
  search(properties: SearchInput): Promise<SearchOutput>;
}
