import { NotFoundError } from '#seedwork/domain/errors/not-found.error';
import { CategoryInMemoryRepository } from '#category/infra/repository/category.in-memory.repository';
import { Category } from '#category/domain/entities/category';
import { DeleteCategoryUseCase } from '../delete-category.use-case';

describe('[Unit] Delete Category Use Case', () => {
  let useCase: DeleteCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new DeleteCategoryUseCase(repository);
  });

  it('[method] should not be able to delete a category when id is not found', async () => {
    await expect(useCase.execute({ id: 'fake-id' })).rejects.toThrow(
      new NotFoundError('Item with id fake-id not found')
    );
  });

  it('[method] should be able to delete a category when id is found', async () => {
    const items = [new Category({ name: 'Category 1' })];

    repository.items = items;

    const spyOnDelete = jest.spyOn(repository, 'delete');
    await useCase.execute({ id: items[0].id });

    expect(spyOnDelete).toBeCalledTimes(1);
    expect(repository.items).toHaveLength(0);
  });
});
