import { FieldError } from "src/resolvers/FieldError";
import { UsernamePasswordInput } from "src/resolvers/user";

export const validateRegister = (options: UsernamePasswordInput): FieldError[] | null => {
  if (options.username.includes("@")) {
    return [
      {
        field: "username",
        message: "Username cannot include @",
      },
    ];
  }
  if (options.username.length <= 2) {
    return [
      {
        field: "username",
        message: "Username length must be greater than 2",
      },
    ];
  }
  if (!options.email.includes("@")) {
    return [
      {
        field: "email",
        message: "Invalid email",
      },
    ];
  }
  if (options.password.length <= 3) {
    return [
      {
        field: "password",
        message: "Password length must be greater than 3",
      },
    ];
  }

  return null;
};