import { Module } from '@nestjs/common';
import { CategoryRepository } from '@cam/core/category/domain';
import {
  CreateCategoryUseCase,
  DeleteCategoryUseCase,
  GetCategoryUseCase,
  ListCategoriesUseCase,
  UpdateCategoryUseCase,
} from '@cam/core/category/application';
import { CategoryInMemoryRepository } from '@cam/core/category/infra';
import { CategoriesController } from './categories.controller';

@Module({
  controllers: [CategoriesController],
  providers: [
    {
      provide: 'CategoryInMemoryRepository',
      useClass: CategoryInMemoryRepository,
    },
    {
      provide: CreateCategoryUseCase.UseCase,
      useFactory: (categoryRepository: CategoryRepository.Repository) =>
        new CreateCategoryUseCase.UseCase(categoryRepository),
      inject: ['CategoryInMemoryRepository'],
    },
    {
      provide: ListCategoriesUseCase.UseCase,
      useFactory: (categoryRepository: CategoryRepository.Repository) =>
        new ListCategoriesUseCase.UseCase(categoryRepository),
      inject: ['CategoryInMemoryRepository'],
    },
    {
      provide: GetCategoryUseCase.UseCase,
      useFactory: (categoryRepository: CategoryRepository.Repository) =>
        new GetCategoryUseCase.UseCase(categoryRepository),
      inject: ['CategoryInMemoryRepository'],
    },
    {
      provide: UpdateCategoryUseCase.UseCase,
      useFactory: (categoryRepository: CategoryRepository.Repository) =>
        new UpdateCategoryUseCase.UseCase(categoryRepository),
      inject: ['CategoryInMemoryRepository'],
    },
    {
      provide: DeleteCategoryUseCase.UseCase,
      useFactory: (categoryRepository: CategoryRepository.Repository) =>
        new DeleteCategoryUseCase.UseCase(categoryRepository),
      inject: ['CategoryInMemoryRepository'],
    },
  ],
})
export class CategoriesModule {}
