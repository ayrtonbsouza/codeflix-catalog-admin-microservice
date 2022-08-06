export type FieldsErrors = {
  [field: string]: string[];
};

export interface IValidatorFields<ValidatedProperties> {
  errors: FieldsErrors;
  validatedData: ValidatedProperties;
  validate(data: any): boolean;
}
