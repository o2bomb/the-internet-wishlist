import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  type?: "email" | "password" | "text";
  helperText?: string;
  textArea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  helperText,
  textArea,
  required,
  size: _,
  ...props
}) => {
  const [field, { error }] = useField(props); // hooks up input to formik

  return (
    <FormControl isRequired={required} isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      {textArea ? (
        <Textarea
          type={type}
          id={field.name}
          aria-describedby={
            helperText ? `${field.name}-helper-text` : undefined
          }
          {...(props as any)}
          {...field}
        />
      ) : (
        <Input
          type={type}
          id={field.name}
          aria-describedby={
            helperText ? `${field.name}-helper-text` : undefined
          }
          {...props}
          {...field}
        />
      )}
      {helperText ? (
        <FormHelperText id={`${field.name}-helper-text`}>
          {helperText}
        </FormHelperText>
      ) : null}
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
