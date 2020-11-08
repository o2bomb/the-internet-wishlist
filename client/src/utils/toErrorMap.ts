import { FieldError } from "../generated/graphql";

/**
 * Generates an error map that Formik can use for form validation
 */
export const toErrorMap = (errors: FieldError[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });
  return errorMap;
};