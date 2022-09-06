import { CategoryRepository } from '../../../domain/repository/category.repository';
import { Category } from '../../../domain/entities/category';
import { CategoryInMemoryRepository } from '../../../infra/repository/category.in-memory.repository';
import { ListCategoriesUseCase } from '../list-categories.use-case';

describe('[Unit] List Categories Use Case', () => {
  let useCase: ListCategoriesUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new ListCategoriesUseCase(repository);
  });

  it('[method] should be able to parse a category to output format', () => {
    let result = new CategoryRepository.SearchResults({
      items: [],
      total: 1,
      current_page: 1,
      per_page: 2,
      sort: null,
      sort_direction: null,
      filter: null,
    });

    let output = useCase['toOutput'](result);

    expect(output).toStrictEqual({
      items: [],
      total: 1,
      current_page: 1,
      per_page: 2,
      last_page: 1,
    });

    const entity = new Category({ name: 'Category 1' });

    result = new CategoryRepository.SearchResults({
      items: [entity],
      total: 1,
      current_page: 1,
      per_page: 2,
      sort: null,
      sort_direction: null,
      filter: null,
    });

    output = useCase['toOutput'](result);

    expect(output).toStrictEqual({
      items: [entity.toJSON()],
      total: 1,
      current_page: 1,
      per_page: 2,
      last_page: 1,
    });
  });

  it('[method] should be able to return a list ordered by created_at when there is no filter parameter', async () => {
    const created_at = new Date();
    const items = [
      new Category({ name: 'Category 1', created_at }),
      new Category({
        name: 'Category 2',
        created_at: new Date(created_at.getTime() + 100),
      }),
    ];
    repository.items = items;
    const output = await useCase.execute({});
    expect(output).toStrictEqual({
      items: [items[1].toJSON(), items[0].toJSON()],
      total: 2,
      current_page: 1,
      per_page: 15,
      last_page: 1,
    });
  });

  it('[method] should be able to return a paginated category list when there is filter and order parameters', async () => {
    const items = [
      new Category({ name: 'a' }),
      new Category({
        name: 'AAA',
      }),
      new Category({
        name: 'AaA',
      }),
      new Category({
        name: 'b',
      }),
      new Category({
        name: 'c',
      }),
    ];
    repository.items = items;

    let output = await useCase.execute({
      page: 1,
      per_page: 2,
      sort: 'name',
      filter: 'a',
    });
    expect(output).toStrictEqual({
      items: [items[1].toJSON(), items[2].toJSON()],
      total: 3,
      current_page: 1,
      per_page: 2,
      last_page: 2,
    });

    output = await useCase.execute({
      page: 2,
      per_page: 2,
      sort: 'name',
      filter: 'a',
    });
    expect(output).toStrictEqual({
      items: [items[0].toJSON()],
      total: 3,
      current_page: 2,
      per_page: 2,
      last_page: 2,
    });

    output = await useCase.execute({
      page: 1,
      per_page: 2,
      sort: 'name',
      sort_direction: 'desc',
      filter: 'a',
    });
    expect(output).toStrictEqual({
      items: [items[0].toJSON(), items[2].toJSON()],
      total: 3,
      current_page: 1,
      per_page: 2,
      last_page: 2,
    });
  });
});
