import { ListCategoriesUseCase } from '@cam/core/category/application';
import { SortDirection } from '@cam/core/@seedwork/domain';

export class SearchCategoryDto implements ListCategoriesUseCase.Input {
  page?: number;
  per_page?: number;
  sort?: string;
  sort_direction?: SortDirection;
  filter?: string;
}
