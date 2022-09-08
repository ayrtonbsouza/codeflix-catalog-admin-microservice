import { IUseCase } from '#seedwork/application/use-case';
import { CategoryRepository } from '#category/domain/repository/category.repository';
import { Category } from '#category/domain/entities/category';
import { CategoryOutput, CategoryOutputMapper } from '../dtos/category-output';

export namespace CreateCategoryUseCase {
  export type Input = {
    name: string;
    description?: string;
    is_active?: boolean;
  };

  export type Output = CategoryOutput;

  export class UseCase implements IUseCase<Input, Output> {
    constructor(private categoryRepository: CategoryRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const category = new Category({
        name: input.name,
        description: input.description,
        is_active: input.is_active,
      });

      await this.categoryRepository.insert(category);

      return CategoryOutputMapper.toOutput(category);
    }
  }
}
