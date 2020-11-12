import { FieldError } from "src/resolvers/FieldError";

export const validateCreateEntry = (
  title: string,
  text?: string
): FieldError[] | null => {
  if (title.length === 0) {
    return [
      {
        field: "title",
        message: "Title must contain at least 1 character",
      },
    ];
  }

  if (text !== undefined && text !== null) {
    if (text.length === 0) {
      return [
        {
          field: "text",
          message: "Description must contain at least 1 character",
        },
      ];
    }

    if (text.length > 300) {
      return [
        {
          field: "text",
          message: "Description cannot contain more than 300 characters",
        },
      ];
    }
  }

  return null;
};
