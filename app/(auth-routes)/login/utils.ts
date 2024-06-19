import React from "react";
import { z } from "zod";

type FieldType = {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  customOnChange?: (e: any) => void;
};

type GetFieldsProps = {
  isSignupForm: boolean;
  setPicture: React.Dispatch<React.SetStateAction<any>>;
};

type GetSchemaProps = {
  isSignupForm: boolean;
};

function getfields({ isSignupForm, setPicture }: GetFieldsProps): FieldType[] {
  const commonFileds = [
    {
      name: "email",
      label: "Email",
      placeholder: "your-email@email.com",
      type: "email",
    },
    {
      label: "Password",
      name: "password",
      placeholder: "Enter password (min : 3 , max : 20)",
      type: "password",
    },
  ];

  const signupfields = [
    {
      name: "username",
      label: "Username",
      placeholder: "Username",
      type: "text",
    },
    {
      name: "org",
      label: "Organisation name",
      placeholder: "Enter your Organisation name",
      type: "text",
    },
    {
      name: "picture",
      customOnChange: (e: any) => {
        setPicture(e);
      },
      label: "Profile picture",
      placeholder: "Profile Picture",
      type: "file",
    },
  ];
  const finalFields = [
    ...commonFileds,
    ...(isSignupForm === true ? signupfields : []),
  ];
  return finalFields;
}

function getSchema({ isSignupForm }: GetSchemaProps) {
  const formSchema = z.object({
    ...(isSignupForm === true
      ? {
          username: z
            .string({ message: "Username is required" })
            .min(2, {
              message: "Username must be at least 2 characters.",
            })
            .max(20, { message: "Username must not exceed 20 characters." }),
          org: z
            .string({ message: "Username is required" })
            .min(2, {
              message: "Organisation name must be at least 2 characters.",
            })
            .max(20, {
              message: "Organisation name must not exceed 20 characters.",
            })
            .optional()
            .nullable(),
        }
      : {}),
    email: z.string({ message: "Invalid Email" }).email(),
    password: z
      .string({ message: "Password is required" })
      .min(4, "Password too short")
      .max(20, "Password too long"),
  });
  return formSchema;
}

export { getfields, getSchema };
