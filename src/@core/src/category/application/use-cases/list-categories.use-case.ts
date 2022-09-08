import {
  PaginatedOutput,
  PaginatedOutputMapper,
} from '#seedwork/application/dtos/paginated-output';
import { SearchInput } from '#seedwork/application/dtos/search-input';
import { IUseCase } from '#seedwork/application/use-case';
import { CategoryRepository } from '#category/domain/repository/category.repository';
import { CategoryOutput, CategoryOutputMapper } from '../dtos/category-output';

export namespace ListCategoriesUseCase {
  export type Input = SearchInput<CategoryRepository.Filter>;

  export type Output = PaginatedOutput<CategoryOutput>;

  export class UseCase implements IUseCase<Input, Output> {
    constructor(private categoryRepository: CategoryRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const parameters = new CategoryRepository.SearchParameters(input);
      const categories = await this.categoryRepository.search(parameters);
      return this.toOutput(categories);
    }

    private toOutput(searchResult: CategoryRepository.SearchResults): Output {
      return {
        items: searchResult.items.map((item) =>
          CategoryOutputMapper.toOutput(item)
        ),
        ...PaginatedOutputMapper.toPaginatedOutput(searchResult),
      };
    }
  }
}
