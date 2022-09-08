import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { CategoryProperties } from '../entities/category';

export class CategoryRules {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  is_active: boolean;

  @IsOptional()
  @IsDate()
  created_at: Date;

  constructor({
    name,
    description,
    is_active,
    created_at,
  }: CategoryProperties) {
    Object.assign(this, { name, description, is_active, created_at });
  }
}
