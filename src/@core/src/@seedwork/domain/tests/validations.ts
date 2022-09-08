import expect from 'expect';
import { EntityValidationError } from '../errors/entity-validation.error';
import { ClassValidatorFields } from '../validators/class-validator-fields';
import { FieldsErrors } from '../validators/validator-fields.interface';

type Expected =
  | {
      validator: ClassValidatorFields<any>;
      data: any;
    }
  | (() => any);

function isValid() {
  return { pass: true, message: () => '' };
}

function assertContainsErrorsMessages(
  expected: FieldsErrors,
  received: FieldsErrors
) {
  const isMatch = expect.objectContaining(received).asymmetricMatch(expected);

  return isMatch
    ? { pass: true, message: () => '' }
    : {
        pass: false,
        message: () =>
          `[Error]: The validation errors don't contain ${JSON.stringify(
            received
          )}.
           Current: ${JSON.stringify(expected)}`,
      };
}

expect.extend({
  containsErrorMessages(expected: Expected, received: FieldsErrors) {
    if (typeof expected === 'function') {
      try {
        expected();
        return isValid();
      } catch (e) {
        const error = e as EntityValidationError;
        return assertContainsErrorsMessages(error.error, received);
      }
    } else {
      const { validator, data } = expected;
      const validated = validator.validate(data);
      if (validated) {
        return isValid();
      }
      return assertContainsErrorsMessages(validator.errors, received);
    }
  },
});
