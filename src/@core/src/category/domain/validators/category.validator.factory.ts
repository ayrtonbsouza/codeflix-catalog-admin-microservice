import { CategoryValidator } from './category.validator';

export class CategoryValidatorFactory {
  static create() {
    return new CategoryValidator();
  }
}
