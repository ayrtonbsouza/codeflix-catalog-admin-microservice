import { CategoryRepository } from 'category/domain/repository/category.repository';
import { Category } from '../../domain/entities/category';

export type Input = {
  name: string;
  description?: string;
  is_active?: boolean;
};

export type Output = {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;
};

export class CreateCategoryUseCase {
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
