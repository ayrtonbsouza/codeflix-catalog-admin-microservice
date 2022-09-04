import { Entity } from '../../entities/entity';
import { SearchParameters, SearchResult } from '../repository-contracts';
import { SearchableRepositoryInMemory } from '../searchableRepository.in-memory';

type StubEntityProperties = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProperties> {}

class StubInMemorySearchableRepository extends SearchableRepositoryInMemory<StubEntity> {
  sortableFields: string[] = ['name'];

  protected async applyFilter(
    items: StubEntity[],
    filter: string | null
  ): Promise<StubEntity[]> {
    if (!filter) {
      return items;
    }

    return items.filter(
      (item) =>
        item.props.name.toLowerCase().includes(filter.toLowerCase()) ||
        item.props.price.toString() === filter
    );
  }
}

describe('[Unit] SearchableRepositoryInMemory', () => {
  let repository: StubInMemorySearchableRepository;

  beforeEach(() => {
    repository = new StubInMemorySearchableRepository();
  });

  describe('[method] applyFilter', () => {
    it('[method] should be able to return all items when filter is null', async () => {
      const items = [
        new StubEntity({ name: 'Item 1', price: 1 }),
        new StubEntity({ name: 'Item 2', price: 2 }),
      ];

      const spyFilterMethod = jest.spyOn(items, 'filter');
      const filteredItems = await repository['applyFilter'](items, null);

      expect(filteredItems).toStrictEqual(items);
      expect(spyFilterMethod).not.toHaveBeenCalled();
    });

    it('[method] should be able to filter items', async () => {
      const items = [
        new StubEntity({ name: 'test', price: 0 }),
        new StubEntity({ name: 'TEST', price: 5 }),
        new StubEntity({ name: 'fake', price: 5 }),
      ];

      const spyFilterMethod = jest.spyOn(items, 'filter');
      let filteredItems = await repository['applyFilter'](items, 'TEST');

      expect(filteredItems).toStrictEqual([items[0], items[1]]);
      expect(spyFilterMethod).toHaveBeenCalledTimes(1);

      filteredItems = await repository['applyFilter'](items, '5');
      expect(filteredItems).toStrictEqual([items[1], items[2]]);
      expect(spyFilterMethod).toHaveBeenCalledTimes(2);

      filteredItems = await repository['applyFilter'](items, 'no-filter');
      expect(filteredItems).toHaveLength(0);
      expect(spyFilterMethod).toHaveBeenCalledTimes(3);
    });
  });

  describe('[method] applySort', () => {
    it('[method] should be able to return items in original order when sort parameter is null', async () => {
      const items = [
        new StubEntity({ name: 'B', price: 0 }),
        new StubEntity({ name: 'A', price: 5 }),
        new StubEntity({ name: 'C', price: 5 }),
      ];

      const sortedItems = await repository['applySort'](items, null, null);
      expect(sortedItems).toStrictEqual(items);
    });

    it('[method] should not be able to sort items when sort parameter is not in sortableFields', async () => {
      const items = [
        new StubEntity({ name: 'B', price: 0 }),
        new StubEntity({ name: 'A', price: 10 }),
        new StubEntity({ name: 'C', price: 5 }),
      ];

      const sortedItems = await repository['applySort'](items, 'price', 'asc');
      expect(sortedItems).toStrictEqual(items);
    });

    it('[method] should be able to sort items', async () => {
      const items = [
        new StubEntity({ name: 'B', price: 0 }),
        new StubEntity({ name: 'A', price: 10 }),
        new StubEntity({ name: 'C', price: 5 }),
      ];

      const sortedItemsAsc = await repository['applySort'](
        items,
        'name',
        'asc'
      );
      expect(sortedItemsAsc).toStrictEqual([items[1], items[0], items[2]]);

      const sortedItemsDesc = await repository['applySort'](
        items,
        'name',
        'desc'
      );
      expect(sortedItemsDesc).toStrictEqual([items[2], items[0], items[1]]);
    });
  });

  describe('[method] applyPagination', () => {
    it('[method] should be able to paginate items', async () => {
      const items = [
        new StubEntity({ name: 'A', price: 0 }),
        new StubEntity({ name: 'B', price: 5 }),
        new StubEntity({ name: 'C', price: 10 }),
        new StubEntity({ name: 'D', price: 15 }),
        new StubEntity({ name: 'E', price: 20 }),
      ];

      let paginatedItems = await repository['applyPagination'](items, 1, 2);
      expect(paginatedItems).toStrictEqual([items[0], items[1]]);

      paginatedItems = await repository['applyPagination'](items, 2, 2);
      expect(paginatedItems).toStrictEqual([items[2], items[3]]);

      paginatedItems = await repository['applyPagination'](items, 3, 2);
      expect(paginatedItems).toStrictEqual([items[4]]);

      paginatedItems = await repository['applyPagination'](items, 4, 2);
      expect(paginatedItems).toStrictEqual([]);
    });
  });

  describe('[method] search', () => {
    it('[method] should be able to apply pagination when other parameters are null', async () => {
      const entity = new StubEntity({ name: 'A', price: 5 });
      const items = Array(16).fill(entity);
      repository.items = items;
      const output = await repository.search(new SearchParameters());

      expect(output).toStrictEqual(
        new SearchResult({
          items: Array(15).fill(entity),
          total: 16,
          current_page: 1,
          per_page: 15,
          sort: null,
          sort_direction: null,
          filter: null,
        })
      );
    });

    it('[method] should be able to apply pagination and filter', async () => {
      const items = [
        new StubEntity({ name: 'test', price: 5 }),
        new StubEntity({ name: 'TEST', price: 10 }),
        new StubEntity({ name: 'tEsT', price: 15 }),
        new StubEntity({ name: 'fake', price: 20 }),
      ];
      repository.items = items;

      let output = await repository.search(
        new SearchParameters({
          page: 1,
          per_page: 3,
          filter: 'test',
        })
      );

      expect(output).toStrictEqual(
        new SearchResult({
          items: [items[0], items[1], items[2]],
          total: 3,
          current_page: 1,
          per_page: 3,
          sort: null,
          sort_direction: null,
          filter: 'test',
        })
      );

      output = await repository.search(
        new SearchParameters({
          page: 2,
          per_page: 2,
          filter: 'test',
        })
      );

      expect(output).toStrictEqual(
        new SearchResult({
          items: [items[2]],
          total: 3,
          current_page: 2,
          per_page: 2,
          sort: null,
          sort_direction: null,
          filter: 'test',
        })
      );
    });

    it('[method] should be able to apply pagination and sort', async () => {
      const items = [
        new StubEntity({ name: 'b', price: 5 }),
        new StubEntity({ name: 'a', price: 5 }),
        new StubEntity({ name: 'd', price: 5 }),
        new StubEntity({ name: 'e', price: 5 }),
        new StubEntity({ name: 'c', price: 5 }),
      ];
      repository.items = items;

      const arrange = [
        {
          params: new SearchParameters({ page: 1, per_page: 2, sort: 'name' }),
          result: new SearchResult({
            items: [items[1], items[0]],
            total: 5,
            current_page: 1,
            per_page: 2,
            sort: 'name',
            sort_direction: 'asc',
            filter: null,
          }),
        },
        {
          params: new SearchParameters({ page: 2, per_page: 2, sort: 'name' }),
          result: new SearchResult({
            items: [items[4], items[2]],
            total: 5,
            current_page: 2,
            per_page: 2,
            sort: 'name',
            sort_direction: 'asc',
            filter: null,
          }),
        },
        {
          params: new SearchParameters({
            page: 1,
            per_page: 2,
            sort: 'name',
            sort_direction: 'desc',
          }),
          result: new SearchResult({
            items: [items[3], items[2]],
            total: 5,
            current_page: 1,
            per_page: 2,
            sort: 'name',
            sort_direction: 'desc',
            filter: null,
          }),
        },
        {
          params: new SearchParameters({
            page: 2,
            per_page: 2,
            sort: 'name',
            sort_direction: 'desc',
          }),
          result: new SearchResult({
            items: [items[4], items[0]],
            total: 5,
            current_page: 2,
            per_page: 2,
            sort: 'name',
            sort_direction: 'desc',
            filter: null,
          }),
        },
      ];

      for (const i of arrange) {
        const result = await repository.search(i.params);
        expect(result).toStrictEqual(i.result);
      }
    });

    it('[method] should be able to apply pagination, filter and sort', async () => {
      const items = [
        new StubEntity({ name: 'test', price: 5 }),
        new StubEntity({ name: 'a', price: 5 }),
        new StubEntity({ name: 'TEST', price: 5 }),
        new StubEntity({ name: 'e', price: 5 }),
        new StubEntity({ name: 'TeSt', price: 5 }),
      ];
      repository.items = items;

      const arrange = [
        {
          params: new SearchParameters({
            page: 1,
            per_page: 2,
            sort: 'name',
            filter: 'TEST',
          }),
          result: new SearchResult({
            items: [items[2], items[4]],
            total: 3,
            current_page: 1,
            per_page: 2,
            sort: 'name',
            sort_direction: 'asc',
            filter: 'TEST',
          }),
        },
        {
          params: new SearchParameters({
            page: 2,
            per_page: 2,
            sort: 'name',
            filter: 'TEST',
          }),
          result: new SearchResult({
            items: [items[0]],
            total: 3,
            current_page: 2,
            per_page: 2,
            sort: 'name',
            sort_direction: 'asc',
            filter: 'TEST',
          }),
        },
      ];

      for (const i of arrange) {
        const result = await repository.search(i.params);
        expect(result).toStrictEqual(i.result);
      }
    });
  });
});
