import { ValidatorRules } from '../../../@seedwork/validators/validator-rules';
import { ValidationError } from '../../../@seedwork/errors/validation.error';
import { Category } from './category';

describe('[Integration] Category', () => {
  describe('[Method] Create', () => {
    it('[constructor] should throw error when category name is not correct', () => {
      expect(() => new Category({ name: null })).toThrowError(
        new ValidationError('The name is required')
      );

      expect(() => new Category({ name: '' })).toThrowError(
        new ValidationError('The name is required')
      );

      expect(() => new Category({ name: 'a'.repeat(256) })).toThrowError(
        new ValidationError(
          'The name must be less or equal than 255 characters'
        )
      );

      expect(() => new Category({ name: 5 as any })).toThrowError(
        new ValidationError('The name must be a string')
      );
    });

    it('[constructor] should throw error when category description is not correct', () => {
      expect(
        () => new Category({ name: 'Test Category', description: 5 as any })
      ).toThrowError(new ValidationError('The description must be a string'));
    });

    it('[constructor] should throw error when category is_active is not correct', () => {
      expect(
        () => new Category({ name: 'Test Category', is_active: '' as any })
      ).toThrowError(new ValidationError('The is_active must be a boolean'));
    });

    it('[constructor] should be able to create a new category instance', () => {
      const validator = jest.spyOn(ValidatorRules.prototype as any, 'required');
      const category = new Category({
        name: 'Test Category',
        description: 'Test Category Description',
        is_active: true,
      });

      expect(category).toBeDefined();
      expect(category.name).toBe('Test Category');
      expect(category.description).toBe('Test Category Description');
      expect(category.is_active).toBe(true);
      expect(validator).toHaveBeenCalled();
    });
  });

  describe('[Method] Update', () => {
    it('[update] should throw error when category name is not correct', () => {
      const category = new Category({ name: 'Test Category' });

      expect(() => category.update(null, null)).toThrowError(
        new ValidationError('The name is required')
      );

      expect(() => category.update('', null)).toThrowError(
        new ValidationError('The name is required')
      );

      expect(() => category.update('a'.repeat(256), null)).toThrowError(
        new ValidationError(
          'The name must be less or equal than 255 characters'
        )
      );

      expect(() => category.update(5 as any, null)).toThrowError(
        new ValidationError('The name must be a string')
      );
    });

    it('[update] should throw error when category description is not correct', () => {
      const category = new Category({ name: 'Test Category' });
      expect(() => category.update('Test Category', 5 as any)).toThrowError(
        new ValidationError('The description must be a string')
      );
    });

    it('[update] should be able to update a category instance', () => {
      const validator = jest.spyOn(ValidatorRules.prototype as any, 'required');
      const category = new Category({
        name: 'Test Category',
        description: 'Test Category Description',
        is_active: true,
      });

      category.update(
        'Test Category Updated',
        'Test Category Description Updated'
      );

      expect(category.name).toBe('Test Category Updated');
      expect(category.description).toBe('Test Category Description Updated');
      expect(validator).toHaveBeenCalled();
    });
  });
});
