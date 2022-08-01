import { Entity } from '../../../@seedwork/entities/entity';
import { UniqueEntityId } from '../../../@seedwork/domain/value-objects/unique-entity-id';

type CategoryProperties = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};

export class Category extends Entity<CategoryProperties> {
  constructor(public readonly props: CategoryProperties, id?: UniqueEntityId) {
    super(props, id);
    this.description = props.description;
    this.is_active = props.is_active;
    this.created_at = props.created_at;
  }

  get name(): string {
    return this.props.name;
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
