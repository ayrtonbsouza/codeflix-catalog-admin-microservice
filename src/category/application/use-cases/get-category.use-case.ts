import { IUseCase } from '#seedwork/application/use-case';
import { CategoryRepository } from '#category/domain/repository/category.repository';
import { CategoryOutput, CategoryOutputMapper } from '../dtos/category-output';

export type Input = {
  id: string;
};

export type Output = CategoryOutput;

export class GetCategoryUseCase implements IUseCase<Input, Output> {
  constructor(private categoryRepository: CategoryRepository.Repository) {}

  async execute(input: Input): Promise<Output> {
    const category = await this.categoryRepository.findById(input.id);

    return CategoryOutputMapper.toOutput(category);
  }
}
