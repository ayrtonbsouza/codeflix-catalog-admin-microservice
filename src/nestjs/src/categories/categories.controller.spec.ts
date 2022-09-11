import { SortDirection } from '@cam/core/@seedwork/domain';
import {
  CreateCategoryUseCase,
  GetCategoryUseCase,
  ListCategoriesUseCase,
  UpdateCategoryUseCase,
} from '@cam/core/category/application';
import { CategoriesController } from './categories.controller';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

describe('[Unit] Categories Controller', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    controller = new CategoriesController();
  });

  it('[create] should be able to create a category', async () => {
    const expectedOutput: CreateCategoryUseCase.Output = {
      id: '9366b7dc-2d71-4799-b91c-c64adb205104',
      name: 'Movie',
      description: 'some description',
      is_active: true,
      created_at: new Date(),
    };
    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };
    // @ts-ignore
    controller['createCategoryUseCase'] = mockCreateUseCase;
    const input: CreateCategoryDto = {
      name: 'Category',
      description: 'Category description',
      is_active: true,
    };
    const output = await controller.create(input);
    expect(mockCreateUseCase.execute).toHaveBeenCalledWith(input);
    expect(expectedOutput).toStrictEqual(output);
  });

  it('[search] should be able to search categories', async () => {
    const expectedOutput: ListCategoriesUseCase.Output = {
      items: [
        {
          id: '9366b7dc-2d71-4799-b91c-c64adb205104',
          name: 'Category',
          description: 'Category description',
          is_active: true,
          created_at: new Date(),
        },
      ],
      current_page: 1,
      last_page: 1,
      per_page: 1,
      total: 1,
    };

    const mockListUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };

    // @ts-ignore
    controller['listCategoriesUseCase'] = mockListUseCase;
    const input = {
      page: 1,
      per_page: 2,
      sort: 'name',
      sort_direction: 'desc' as SortDirection,
      filter: 'Category',
    };

    const output = await controller.search(input);
    expect(mockListUseCase.execute).toHaveBeenCalledWith(input);
    expect(expectedOutput).toStrictEqual(output);
  });

  it('[findOne] should be able to get a category', async () => {
    const id = '9366b7dc-2d71-4799-b91c-c64adb205104';
    const expectedOutput: GetCategoryUseCase.Output = {
      id,
      name: 'Category',
      description: 'Category description',
      is_active: true,
      created_at: new Date(),
    };
    const mockGetUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };
    // @ts-ignore
    controller['getCategoryUseCase'] = mockGetUseCase;
    const output = await controller.findOne(id);
    expect(mockGetUseCase.execute).toHaveBeenCalledWith({ id });
    expect(expectedOutput).toStrictEqual(output);
  });

  it('[update] should be able to update a category', async () => {
    const id = '9366b7dc-2d71-4799-b91c-c64adb205104';
    const expectedOutput: UpdateCategoryUseCase.Output = {
      id,
      name: 'Category',
      description: 'some description',
      is_active: true,
      created_at: new Date(),
    };
    const mockUpdateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };
    // @ts-ignore
    controller['updateCategoryUseCase'] = mockUpdateUseCase;
    const input: UpdateCategoryDto = {
      name: 'Category',
      description: 'Category description',
      is_active: true,
    };
    const output = await controller.update(id, input);
    expect(mockUpdateUseCase.execute).toHaveBeenCalledWith({ id, ...input });
    expect(expectedOutput).toStrictEqual(output);
  });

  it('[remove] should be able to delete a category', async () => {
    const id = '9366b7dc-2d71-4799-b91c-c64adb205104';
    const expectedOutput = undefined;
    const mockUpdateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };
    // @ts-ignore
    controller['deleteCategoryUseCase'] = mockUpdateUseCase;
    expect(controller.remove(id)).toBeInstanceOf(Promise);
    const output = await controller.remove(id);
    expect(mockUpdateUseCase.execute).toHaveBeenCalledWith({ id });
    expect(expectedOutput).toStrictEqual(output);
  });
});
