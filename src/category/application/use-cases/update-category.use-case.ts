import { IUseCase } from '#seedwork/application/use-case';
import { CategoryRepository } from '#category/domain/repository/category.repository';
import { CategoryOutput, CategoryOutputMapper } from '../dtos/category-output';

export type Input = {
  id: string;
  name: string;
  description?: string;
  is_active?: boolean;
};

export type Output = CategoryOutput;

export class UpdateCategoryUseCase implements IUseCase<Input, Output> {
  constructor(private categoryRepository: CategoryRepository.Repository) {}

  async execute(input: Input): Promise<Output> {
    const category = await this.categoryRepository.findById(input.id);
    category.update(input.name, input.description);

    if (input.is_active === true) {
      category.activate();
    }

    if (input.is_active === false) {
      category.deactivate();
    }

    await this.categoryRepository.update(category);

    return CategoryOutputMapper.toOutput(category);
  }
}
