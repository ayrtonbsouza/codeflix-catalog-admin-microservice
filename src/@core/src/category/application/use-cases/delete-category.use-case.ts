import { IUseCase } from '#seedwork/application/use-case';
import { CategoryRepository } from '#category/domain/repository/category.repository';

export namespace DeleteCategoryUseCase {
  export type Input = {
    id: string;
  };

  export type Output = void;

  export class UseCase implements IUseCase<Input, Output> {
    constructor(private categoryRepository: CategoryRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const category = await this.categoryRepository.findById(input.id);
      await this.categoryRepository.delete(category.id);
    }
  }
}
