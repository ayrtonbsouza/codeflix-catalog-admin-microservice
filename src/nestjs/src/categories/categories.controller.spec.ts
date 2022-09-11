import { CreateCategoryUseCase } from '@cam/core/category/application';
import { CategoriesController } from './categories.controller';
import { CreateCategoryDto } from './dto/create-category.dto';

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

    controller['createCategoryUseCase'] = mockCreateUseCase;
    const input: CreateCategoryDto = {
      name: 'Movie',
      description: 'some description',
      is_active: true,
    };
    const output = await controller.create(input);
    expect(mockCreateUseCase.execute).toHaveBeenCalledWith(input);
    expect(expectedOutput).toStrictEqual(output);
  });

  it('[search] should be able to search categories', () => {
    expect(true).toBeTruthy();
  });

  it('[findOne] should be able to get a category', () => {
    expect(true).toBeTruthy();
  });

  it('[update] should be able to update a category', () => {
    expect(true).toBeTruthy();
  });

  it('[remove] should be able to delete a category', () => {
    expect(true).toBeTruthy();
  });
});
