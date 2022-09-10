import {
  CreateCategoryUseCase,
  ListCategoriesUseCase,
} from '@cam/core/category/application';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private createCategoryUseCase: CreateCategoryUseCase.UseCase,
    private listCategoriesUseCase: ListCategoriesUseCase.UseCase,
  ) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.createCategoryUseCase.execute({ name: 'Category' });
  }

  @Get()
  findAll() {
    return this.listCategoriesUseCase.execute({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
