import { Category } from './category';

describe('[Unit] Category Entity', () => {
  it('should be able to create a category instance using all parameters', () => {
    const input = {
      name: 'Test Category',
      description: 'Test Category Description',
      is_active: true,
      created_at: new Date(),
    };

    const output = new Category(input);

    expect(output.props).toStrictEqual(input);
  });
});
