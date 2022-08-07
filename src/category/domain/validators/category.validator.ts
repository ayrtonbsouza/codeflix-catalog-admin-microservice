import { ClassValidatorFields } from '../../../@seedwork/domain/validators/class-validator-fields';
import { CategoryRules } from './category.rules';

export class CategoryValidator extends ClassValidatorFields<CategoryRules> {
  validate(data: any): boolean {
    return super.validate(new CategoryRules(data ?? ({} as any)));
  }
}
