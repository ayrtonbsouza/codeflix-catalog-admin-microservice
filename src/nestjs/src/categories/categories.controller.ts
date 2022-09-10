import {
  CreateCategoryUseCase,
  DeleteCategoryUseCase,
  GetCategoryUseCase,
  ListCategoriesUseCase,
  UpdateCategoryUseCase,
} from '@cam/core/category/application';
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Inject,
  HttpCode,
  Query,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { SearchCategoryDto } from './dto/search-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  @Inject(CreateCategoryUseCase.UseCase)
  private createCategoryUseCase: CreateCategoryUseCase.UseCase;

  @Inject(ListCategoriesUseCase.UseCase)
  private listCategoriesUseCase: ListCategoriesUseCase.UseCase;

  @Inject(GetCategoryUseCase.UseCase)
  private getCategoryUseCase: GetCategoryUseCase.UseCase;

  @Inject(UpdateCategoryUseCase.UseCase)
  private updateCategoryUseCase: UpdateCategoryUseCase.UseCase;

  @Inject(DeleteCategoryUseCase.UseCase)
  private deleteCategoryUseCase: DeleteCategoryUseCase.UseCase;

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.createCategoryUseCase.execute(createCategoryDto);
  }

  @Get()
  search(@Query() searchCategoryDto: SearchCategoryDto) {
    return this.listCategoriesUseCase.execute(searchCategoryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getCategoryUseCase.execute({ id });
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.updateCategoryUseCase.execute({
      id,
      ...updateCategoryDto,
    });
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteCategoryUseCase.execute({ id });
  }
}
