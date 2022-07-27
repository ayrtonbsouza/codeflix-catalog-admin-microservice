import { omit } from 'lodash';
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

  it('should be able to create a category instance using name as parameter', () => {
    const input = {
      name: 'Test Category',
    };

    const output = new Category(input);
    const props = omit(output.props, 'created_at');

    expect(props).toStrictEqual({
      name: 'Test Category',
      description: null,
      is_active: true,
    });
    expect(output.props.created_at).toBeInstanceOf(Date);
  });

  it('should be able to create a category instance using name and description as parameters', () => {
    const input = {
      name: 'Test Category',
      description: 'Test Category Description',
    };

    const output = new Category(input);
    const props = omit(output.props, 'created_at');

    expect(props).toStrictEqual({
      name: 'Test Category',
      description: 'Test Category Description',
      is_active: true,
    });
    expect(output.props.created_at).toBeInstanceOf(Date);
  });

  it('should be able to create a category instance using name and is_active as parameters', () => {
    const input = {
      name: 'Test Category',
      is_active: false,
    };

    const output = new Category(input);
    const props = omit(output.props, 'created_at');

    expect(props).toStrictEqual({
      name: 'Test Category',
      description: null,
      is_active: false,
    });
    expect(output.props.created_at).toBeInstanceOf(Date);
  });

  it('should be able to create a category instance using name and created_at as parameters', () => {
    const input = {
      name: 'Test Category',
      created_at: new Date(),
    };

    const output = new Category(input);

    expect(output.props).toStrictEqual({
      name: 'Test Category',
      description: null,
      is_active: true,
      created_at: new Date(),
    });
  });
});
