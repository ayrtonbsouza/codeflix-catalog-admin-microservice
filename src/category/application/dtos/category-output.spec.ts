import { Category } from '../../domain/entities/category';
import { CategoryOutputMapper } from './category-output';

describe('[Unit] Category Output Mapper', () => {
  it('[method] should be able to convert a category to output format', () => {
    const created_at = new Date();
    const category = new Category({
      name: 'Category',
      description: 'Category description',
      is_active: true,
      created_at,
    });
    const spyOnToJSON = jest.spyOn(category, 'toJSON');
    const output = CategoryOutputMapper.toOutput(category);
    expect(spyOnToJSON).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: category.id,
      name: category.name,
      description: category.description,
      is_active: category.is_active,
      created_at: category.created_at,
    });
  });
});
