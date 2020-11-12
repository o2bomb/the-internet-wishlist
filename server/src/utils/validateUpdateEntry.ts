import { FieldError } from "src/resolvers/FieldError";

export const validateUpdateEntry = (text: string): FieldError[] | null => {
  if (text.length === 0) {
    return [
      {
        field: "text",
        message: "Description must contain at least 1 character",
      },
    ]
  }

  return null;
}