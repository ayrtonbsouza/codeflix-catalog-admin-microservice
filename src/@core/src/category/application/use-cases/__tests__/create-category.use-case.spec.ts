import { CategoryInMemoryRepository } from '#category/infra/repository/category.in-memory.repository';
import { CreateCategoryUseCase } from '../create-category.use-case';

describe('[Unit] Create Category Use Case', () => {
  let useCase: CreateCategoryUseCase.UseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new CreateCategoryUseCase.UseCase(repository);
  });

  it('[method] should be able to create a category with name parameter', async () => {
    const spyOnInsert = jest.spyOn(repository, 'insert');
    const output = await useCase.execute({ name: 'Category 1' });

    expect(output).toStrictEqual({
      id: repository.items[0].id,
      name: 'Category 1',
      description: null,
      is_active: true,
      created_at: repository.items[0].created_at,
    });
    expect(spyOnInsert).toBeCalledTimes(1);
  });

  it('[method] should be able to create a category with name parameter and description', async () => {
    const spyOnInsert = jest.spyOn(repository, 'insert');
    const output = await useCase.execute({
      name: 'Category 1',
      description: 'Category 1 description',
    });

    expect(output).toStrictEqual({
      id: repository.items[0].id,
      name: 'Category 1',
      description: 'Category 1 description',
      is_active: true,
      created_at: repository.items[0].created_at,
    });
    expect(spyOnInsert).toBeCalledTimes(1);
  });

  it('[method] should be able to create a category with name parameter and is_active', async () => {
    const spyOnInsert = jest.spyOn(repository, 'insert');
    const output = await useCase.execute({
      name: 'Category 1',
      is_active: false,
    });

    expect(output).toStrictEqual({
      id: repository.items[0].id,
      name: 'Category 1',
      description: null,
      is_active: false,
      created_at: repository.items[0].created_at,
    });
    expect(spyOnInsert).toBeCalledTimes(1);
  });
});
