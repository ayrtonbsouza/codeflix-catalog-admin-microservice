import { CategoryRepository } from '../../domain/repository/category.repository';
import { IUseCase } from '../../../@seedwork/application/use-case';
import { Category } from '../../domain/entities/category';
import { CategoryOutput, CategoryOutputMapper } from '../dtos/category-output';

export type Input = {
  name: string;
  description?: string;
  is_active?: boolean;
};

export type Output = CategoryOutput;

export class CreateCategoryUseCase implements IUseCase<Input, Output> {
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
