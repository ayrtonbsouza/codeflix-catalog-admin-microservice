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
    const result = new CategoryRepository.SearchResults({
      items: [],
      total: 1,
      current_page: 1,
      per_page: 2,
      sort: null,
      sort_direction: null,
      filter: null,
    });
  });
});
