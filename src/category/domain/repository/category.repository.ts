import {
  ISearchableRepository,
  SearchParameters as DefaultSearchParameters,
  SearchResult as DefaultSearchResult,
} from '../../../@seedwork/domain/repository/repository-contracts';
import { Category } from '../entities/category';

export namespace CategoryRepository {
  export type Filter = string;

  export class SearchParameters extends DefaultSearchParameters<Filter> {}

  export class SearchResults extends DefaultSearchResult<Category, Filter> {}

  export type Repository = ISearchableRepository<
    Category,
    Filter,
    SearchParameters,
    SearchResults
  >;
}
