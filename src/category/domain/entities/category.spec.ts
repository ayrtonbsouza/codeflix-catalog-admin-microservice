import { omit } from 'lodash';
import { Category } from './category';

describe('[Unit] Category Entity', () => {
  it('[constructor] should be able to create a category instance using all parameters', () => {
    const input = {
      name: 'Test Category',
      description: 'Test Category Description',
      is_active: true,
      created_at: new Date(),
    };

    const output = new Category(input);

    expect(output.props).toStrictEqual(input);
  });

  it('[constructor] should be able to create a category instance using name as parameter', () => {
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

  it('[constructor] should be able to create a category instance using name and description as parameters', () => {
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

  it('[constructor] should be able to create a category instance using name and is_active as parameters', () => {
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

  it('[constructor] should be able to create a category instance using name and created_at as parameters', () => {
    const input = {
      name: 'Test Category',
      created_at: new Date(),
    };

    const output = new Category(input);

    expect(output.props).toStrictEqual({
      name: 'Test Category',
      description: null,
      is_active: true,
      created_at: input.created_at,
    });
  });

  it('[getter] should be able to get and set name', () => {
    const input = {
      name: 'Test Category',
    };

    const output = new Category(input);

    expect(output.name).toBe('Test Category');
  });

  it('[getter] should be able to get and set description', () => {
    const input = {
      name: 'Test Category',
      description: 'Test Category Description',
    };

    const output = new Category(input);

    expect(output.description).toBe('Test Category Description');
  });

  it('[getter] should be able to get and set is_active', () => {
    const input = {
      name: 'Test Category',
      is_active: false,
    };

    const output = new Category(input);

    expect(output.is_active).toBeFalsy();
  });

  it('[getter] should be able to get and set created_at', () => {
    const input = {
      name: 'Test Category',
      created_at: new Date(),
    };

    const output = new Category(input);

    expect(output.created_at).toBe(input.created_at);
  });

  it('[setter] should be able to set description', () => {
    const input = {
      name: 'Test Category',
    };

    const output = new Category(input);
    output['description'] = 'Test Category Description';

    expect(output.description).toBe('Test Category Description');
  });

  it('[setter] should be able to set is_active', () => {
    const input = {
      name: 'Test Category',
    };

    const output = new Category(input);
    output['is_active'] = false;

    expect(output.is_active).toBeFalsy();
  });

  it('[setter] should be able to set created_at', () => {
    const input = {
      name: 'Test Category',
    };

    const created_at = new Date();

    const output = new Category(input);
    output['created_at'] = created_at;

    expect(output.created_at).toBe(created_at);
  });
});
