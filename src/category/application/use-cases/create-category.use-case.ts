import { CategoryRepository } from 'category/domain/repository/category.repository';
import { IUseCase } from '../../../@seedwork/application/use-case';
import { Category } from '../../domain/entities/category';
import { CategoryOutput } from '../dtos/category-output.dto';

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

    return {
      id: category.id,
      name: category.name,
      description: category.description,
      is_active: category.is_active,
      created_at: category.created_at,
    };
  }
}
