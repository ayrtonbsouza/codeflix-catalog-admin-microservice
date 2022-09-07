import { omit } from 'lodash';

import { UniqueEntityId } from '#seedwork/domain/value-objects/unique-entity-id';
import { Category } from './category';

describe('[Unit] Category Entity', () => {
  beforeEach(() => {
    Category.validate = jest.fn();
  });

  it('[constructor] should be able to create a category instance using all parameters', () => {
    const input = {
      name: 'Test Category',
      description: 'Test Category Description',
      is_active: true,
      created_at: new Date(),
    };

    const output = new Category(input);

    expect(output.props).toStrictEqual(input);
    expect(Category.validate).toHaveBeenCalled();
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
    expect(Category.validate).toHaveBeenCalled();
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
    expect(Category.validate).toHaveBeenCalled();
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
    expect(Category.validate).toHaveBeenCalled();
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
    expect(Category.validate).toHaveBeenCalled();
  });

  it('[constructor] should be able to create a category instance with id', () => {
    const input = {
      name: 'Test Category',
    };
    const id = new UniqueEntityId();

    const output = new Category(input, id);

    expect(output).toHaveProperty('id');
    expect(output.id).toBe(id.value);
    expect(Category.validate).toHaveBeenCalled();
  });

  it('[constructor] should be able to create a category instance without id', () => {
    const input = {
      name: 'Test Category',
    };

    const output = new Category(input);

    expect(output).toHaveProperty('id');
    expect(output.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(Category.validate).toHaveBeenCalled();
  });

  it('[getter] should be able to get name', () => {
    const input = {
      name: 'Test Category',
    };

    const output = new Category(input);

    expect(output.name).toBe('Test Category');
  });

  it('[getter] should be able to get description', () => {
    const input = {
      name: 'Test Category',
      description: 'Test Category Description',
    };

    const output = new Category(input);

    expect(output.description).toBe('Test Category Description');
  });

  it('[getter] should be able to get is_active', () => {
    const input = {
      name: 'Test Category',
      is_active: false,
    };

    const output = new Category(input);

    expect(output.is_active).toBeFalsy();
  });

  it('[getter] should be able to get created_at', () => {
    const input = {
      name: 'Test Category',
      created_at: new Date(),
    };

    const output = new Category(input);

    expect(output.created_at).toBe(input.created_at);
  });

  it('[setter] should be able to set name', () => {
    const input = {
      name: 'Initial Test Name',
    };

    const output = new Category(input);

    output['name'] = 'Final Test Name';

    expect(output.name).toBe('Final Test Name');
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

  it('[method] should be able to update a category', () => {
    const input = {
      name: 'Test Category',
    };

    const output = new Category(input);
    output.update('New Test Category Name', 'Test Category Description');
    expect(output.name).toBe('New Test Category Name');
    expect(output.description).toBe('Test Category Description');
    expect(Category.validate).toHaveBeenCalledTimes(2);
  });

  it('[method] should be able to activate a category', () => {
    const input = {
      name: 'Test Category',
      is_active: false,
    };

    const output = new Category(input);
    output.activate();
    expect(output.is_active).toBeTruthy();
  });

  it('[method] should be able to deactivate a category', () => {
    const input = {
      name: 'Test Category',
      is_active: true,
    };

    const output = new Category(input);
    output.deactivate();
    expect(output.is_active).toBeFalsy();
  });
});
