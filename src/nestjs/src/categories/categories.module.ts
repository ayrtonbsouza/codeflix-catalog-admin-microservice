import { Module } from '@nestjs/common';
import { CategoryRepository } from '@cam/core/category/domain';
import {
  CreateCategoryUseCase,
  ListCategoriesUseCase,
} from '@cam/core/category/application';
import { CategoryInMemoryRepository } from '@cam/core/category/infra';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';

@Module({
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
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
  ],
})
export class CategoriesModule {}
