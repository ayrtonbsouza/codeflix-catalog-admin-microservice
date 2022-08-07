import { Category } from './category';

describe('[Integration] Category', () => {
  describe('[Method] Create', () => {
    it('[constructor] should throw error when category name is not correct', () => {
      expect(() => new Category({ name: null })).containsErrorMessages({
        name: [
          'name must be shorter than or equal to 255 characters',
          'name must be a string',
          'name should not be empty',
        ],
      });

      expect(() => new Category({ name: '' })).containsErrorMessages({
        name: ['name should not be empty'],
      });

      expect(() => new Category({ name: 5 as any })).containsErrorMessages({
        name: [
          'name must be shorter than or equal to 255 characters',
          'name must be a string',
        ],
      });

      expect(
        () => new Category({ name: 't'.repeat(255) })
      ).containsErrorMessages({
        name: [
          'name must be a string',
          'name must be shorter than or equal to 255 characters',
        ],
      });
    });

    it('[constructor] should throw error when category description is not correct', () => {
      expect(
        () => new Category({ name: 'Test name', description: 5 as any })
      ).containsErrorMessages({
        description: ['description must be a string'],
      });
    });

    it('[constructor] should throw error when category is_active is not correct', () => {
      expect(
        () => new Category({ name: 'Test name', is_active: 5 as any })
      ).containsErrorMessages({
        is_active: ['is_active must be a boolean value'],
      });
    });

    it('[constructor] should be able to create a new category instance', () => {
      const category = new Category({
        name: 'Test Category',
        description: 'Test Category Description',
        is_active: true,
      });

      expect(category).toBeDefined();
      expect(category.name).toBe('Test Category');
      expect(category.description).toBe('Test Category Description');
      expect(category.is_active).toBe(true);
    });
  });

  describe('[Method] Update', () => {
    it('[update] should throw error when category name is not correct', () => {
      const category = new Category({ name: 'Test Category' });
      expect(() => category.update(null, null)).containsErrorMessages({
        name: [
          'name must be shorter than or equal to 255 characters',
          'name must be a string',
          'name should not be empty',
        ],
      });

      expect(() => category.update('', null)).containsErrorMessages({
        name: ['name should not be empty'],
      });

      expect(() =>
        category.update('t'.repeat(256), null)
      ).containsErrorMessages({
        name: ['name must be shorter than or equal to 255 characters'],
      });

      expect(() => category.update(5 as any, null)).containsErrorMessages({
        name: [
          'name must be shorter than or equal to 255 characters',
          'name must be a string',
        ],
      });
    });

    it('[update] should throw error when category description is not correct', () => {
      const category = new Category({ name: 'Test Category' });
      expect(() =>
        category.update('Test Category', 5 as any)
      ).containsErrorMessages({
        description: ['description must be a string'],
      });
    });

    it('[update] should be able to update a category instance', () => {
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
    });
  });
});
