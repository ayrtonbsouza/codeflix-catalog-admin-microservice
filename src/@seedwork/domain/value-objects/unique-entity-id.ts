import { v4 as uuid, validate } from 'uuid';

import { InvalidUuidError } from '../errors/invalid-uuid.error';
import { ValueObject } from './value-object';

export class UniqueEntityId extends ValueObject<string> {
  constructor(private id?: string) {
    super(id || uuid());
    this.validate();
  }

  private validate() {
    const isValid = validate(this.value);

    if (!isValid) {
      throw new InvalidUuidError();
    }
  }
}
