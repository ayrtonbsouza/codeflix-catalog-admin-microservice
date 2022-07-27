import { Category } from './category';

describe('[Unit] Category Entity', () => {
  it('should be able to create a category instance', () => {
    const category = new Category('Test');
    expect(category.name).toBe('Test');
  });
});
