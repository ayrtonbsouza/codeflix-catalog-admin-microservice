import { NotFoundError } from '#seedwork/domain/errors/not-found.error';
import { Category } from '#category/domain/entities/category';
import { CategoryInMemoryRepository } from '#category/infra/repository/category.in-memory.repository';
import { GetCategoryUseCase } from '../get-category.use-case';

describe('[Unit] Get Category Use Case', () => {
  let useCase: GetCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new GetCategoryUseCase(repository);
  });

  it('[method] should not be able to get category when id is not found', async () => {
    await expect(useCase.execute({ id: 'fake-id' })).rejects.toThrow(
      new NotFoundError('Item with id fake-id not found')
    );
  });

  it('[method] should be able to get category when id is found', async () => {
    const items = [
      new Category({ name: 'Category 1' }),
      new Category({ name: 'Category 2' }),
      new Category({ name: 'Category 3' }),
    ];

    repository.items = items;

    const spyOnFindById = jest.spyOn(repository, 'findById');
    const output = await useCase.execute({ id: items[1].id });

    expect(output).toStrictEqual({
      id: items[1].id,
      name: items[1].name,
      description: items[1].description,
      is_active: items[1].is_active,
      created_at: items[1].created_at,
    });
    expect(spyOnFindById).toBeCalledTimes(1);
  });
});
