import { Category } from '#category/domain/entities/category';
import { CategoryInMemoryRepository } from './category.in-memory.repository';

describe('[Unit] Category In Memory Repository', () => {
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
  });

  it('[method] should not filter any field when filter object is null', async () => {
    const items = [
      new Category({ name: 'Test Category 1' }),
      new Category({ name: 'Test Category 2' }),
    ];
    repository['items'] = items;

    const spyOnFilter = jest.spyOn(items, 'filter' as any);
    const filteredItems = await repository['applyFilter'](items, null);

    expect(spyOnFilter).not.toHaveBeenCalled();
    expect(filteredItems).toEqual(items);
  });

  it('[method] should be able to filter by name', async () => {
    const items = [
      new Category({ name: 'Test Category 1' }),
      new Category({ name: 'Test Category 2' }),
    ];
    repository['items'] = items;

    const spyOnFilter = jest.spyOn(items, 'filter' as any);
    const filteredItems = await repository['applyFilter'](
      items,
      'Test Category 1'
    );

    expect(spyOnFilter).toHaveBeenCalled();
    expect(filteredItems).toEqual([items[0]]);
  });

  it('[method] should be able to sort by created_at when sort param is null', async () => {
    const created_at = new Date();
    const items = [
      new Category({ name: 'Test Category 1', created_at }),
      new Category({
        name: 'Test Category 2',
        created_at: new Date(created_at.getTime() + 100),
      }),
      new Category({
        name: 'Test Category 3',
        created_at: new Date(created_at.getTime() + 200),
      }),
    ];
    repository['items'] = items;

    const sortedItems = await repository['applySort'](items, null, null);
    expect(sortedItems).toEqual([items[2], items[1], items[0]]);
  });

  it('[method] should be able to sort by name', async () => {
    const items = [
      new Category({ name: 'B' }),
      new Category({ name: 'C' }),
      new Category({ name: 'A' }),
    ];
    repository['items'] = items;

    let sortedItems = await repository['applySort'](items, 'name', 'asc');
    expect(sortedItems).toEqual([items[2], items[0], items[1]]);

    sortedItems = await repository['applySort'](items, 'name', 'desc');
    expect(sortedItems).toEqual([items[1], items[0], items[2]]);
  });
});
