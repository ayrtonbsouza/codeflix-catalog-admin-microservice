import { SearchResult } from '#seedwork/domain/repository/repository-contracts';

export type PaginatedOutput<Items = any> = {
  items: Items[];
  total: number;
  current_page: number;
  last_page: number;
  per_page: number;
};

export class PaginatedOutputMapper {
  static toPaginatedOutput(
    result: SearchResult
  ): Omit<PaginatedOutput, 'items'> {
    return {
      total: result.total,
      current_page: result.current_page,
      last_page: result.last_page,
      per_page: result.per_page,
    };
  }
}
