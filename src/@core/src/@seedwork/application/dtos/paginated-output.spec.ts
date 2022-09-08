import { SearchResult } from '#seedwork/domain/repository/repository-contracts';
import { PaginatedOutputMapper } from './paginated-output';

describe('[Unit] Paginated Output Mapper', () => {
  it('[method] should be able to convert a result to paginated output format', () => {
    const result = new SearchResult({
      items: [{ name: 'Test 1' } as any],
      total: 1,
      current_page: 1,
      per_page: 2,
      sort: 'name',
      sort_direction: 'asc',
      filter: 'test',
    });

    const output = PaginatedOutputMapper.toPaginatedOutput(result);

    expect(output).toStrictEqual({
      total: 1,
      current_page: 1,
      last_page: 1,
      per_page: 2,
    });
  });
});
