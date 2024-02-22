import { z } from "zod";
import { Role } from "../models/user";

export const createUserSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    }).min(1),
    email: z.string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    }).email({
      message: "Invalid email format",
    }),
    role: z.nativeEnum(Role,{
      errorMap: () => ({
        message: "Role must be either 'guest' or 'admin'",
      }),
    }).optional(),
    password: z.string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    }).min(6, {
      message: "Password must be at least 6 characters long",
    }),
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
      .min(1)
      .optional(),
    email: z.string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
      .email({
        message: "Invalid email format",
      })
      .optional(),
    password: z.string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
      .min(6)
      .optional(),
  }),
  params: z.object({
    id: z.string({
      required_error: "Id is required",
      invalid_type_error: "Id must be a string",
    }).min(1),
  }),
});

export const getUserSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: "Id is required",
      invalid_type_error: "Id must be a string",
    }).min(1),
  }),
});

export const deleteUserSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: "Id is required",
      invalid_type_error: "Id must be a string",
    }).min(1),
  }),
});

export type CreateUserSchema = z.TypeOf<typeof createUserSchema>;
export type UpdateUserSchema = z.TypeOf<typeof updateUserSchema>;
export type GetUserSchema = z.TypeOf<typeof getUserSchema>;
export type DeleteUserSchema = z.TypeOf<typeof deleteUserSchema>;
