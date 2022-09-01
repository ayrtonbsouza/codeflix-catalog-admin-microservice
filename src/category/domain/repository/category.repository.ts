import {
  IRepository,
  ISearchableRepository,
} from '@seedwork/domain/repository/repository-contracts';
import { Category } from '../entities/category';

export type CategoryRepository = ISearchableRepository<Category, any, any>;
