import { ValidationError } from 'class-validator';
import { FieldError } from '../types';

export const extractErrors = (errors: ValidationError[]) => {
  let formatedErrors: FieldError[] = [];
  errors.map(({ property, constraints }) => {
    formatedErrors.push({
      path: property,
      message: Object.values(constraints as Object)[0],
    });
  });
  return formatedErrors;
};
