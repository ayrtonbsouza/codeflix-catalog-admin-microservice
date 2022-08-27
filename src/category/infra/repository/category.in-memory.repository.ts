import { CategoryRepository } from 'category/domain/repository/category.repository';
import { Category } from '../../domain/entities/category';
import { RepositoryInMemory } from '../../../@seedwork/domain/repository/repository.in-memory';

export class CategoryInMemoryRepository
  extends RepositoryInMemory<Category>
  implements CategoryRepository {}
