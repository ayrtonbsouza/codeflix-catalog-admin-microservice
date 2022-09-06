import { SortDirection } from '../../domain/repository/repository-contracts';

export type SearchInput<Filter = string> = {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_direction?: SortDirection;
  filter?: Filter | null;
};
