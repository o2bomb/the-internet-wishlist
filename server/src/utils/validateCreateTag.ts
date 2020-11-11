import { FieldError } from "src/resolvers/FieldError";

export const validateCreateTag = (name: string): FieldError[] | null => {
  if (name.length === 0) {
    return [
      {
        field: "name",
        message: "Tag name must contain at least 1 character",
      },        
    ]
  }

  if (name.length > 20) {
    return [
      {
        field: "name",
        message: "Tag name cannot be longer than 20 characters",
      },        
    ]
  }

  return null;
}