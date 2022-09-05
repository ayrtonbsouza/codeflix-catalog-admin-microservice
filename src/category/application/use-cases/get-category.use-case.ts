import { IUseCase } from '@seedwork/application/use-case';
import { CategoryRepository } from 'category/domain/repository/category.repository';
import { CategoryOutput } from '../dtos/category-output.dto';

export type Input = {
  id: string;
};

export type Output = CategoryOutput;

export class GetCategoryUseCase implements IUseCase<Input, Output> {
  constructor(private categoryRepository: CategoryRepository.Repository) {}

  async execute(input: Input): Promise<Output> {
    const category = await this.categoryRepository.findById(input.id);

    return {
      id: category.id,
      name: category.name,
      description: category.description,
      is_active: category.is_active,
      created_at: category.created_at,
    };
  }
}
