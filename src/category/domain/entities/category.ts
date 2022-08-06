import { Entity } from '../../../@seedwork/domain/entities/entity';
import { UniqueEntityId } from '../../../@seedwork/domain/value-objects/unique-entity-id';
import { CategoryValidatorFactory } from '../validators/category.validator.factory';

export type CategoryProperties = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};

export class Category extends Entity<CategoryProperties> {
  constructor(public readonly props: CategoryProperties, id?: UniqueEntityId) {
    Category.validate(props);
    super(props, id);
    this.description = props.description;
    this.is_active = props.is_active;
    this.created_at = props.created_at;
  }

  update(name: string, description: string): void {
    Category.validate({
      name,
      description,
    });
    this.name = name;
    this.description = description;
  }

  static validate(props: CategoryProperties) {
    const validator = CategoryValidatorFactory.create();
    validator.validate(props);
  }

  activate() {
    this.is_active = true;
  }

  deactivate() {
    this.is_active = false;
  }

  get name(): string {
    return this.props.name;
  }

  private set name(prop: string) {
    this.props.name = prop;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  private set description(prop: string | undefined) {
    this.props.description = prop ?? null;
  }

  get is_active(): boolean | undefined {
    return this.props.is_active;
  }

  private set is_active(prop: boolean | undefined) {
    this.props.is_active = prop ?? true;
  }

  get created_at(): Date | undefined {
    return this.props.created_at;
  }

  private set created_at(prop: Date | undefined) {
    this.props.created_at = prop || new Date();
  }
}
