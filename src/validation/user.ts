import { TypeOf, object, string } from "zod";

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    }).min(1),
    email: string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    }).email({
      message: "Invalid email format",
    }),
    password: string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    }).min(6, {
      message: "Password must be at least 6 characters long",
    }),
  }),
});

export const updateUserSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
      .min(1)
      .optional(),
    email: string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
      .email({
        message: "Invalid email format",
      })
      .optional(),
    password: string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
      .min(6)
      .optional(),
  }),
  params: object({
    id: string({
      required_error: "Id is required",
      invalid_type_error: "Id must be a string",
    }).min(1),
  }),
});

export const getUserSchema = object({
  params: object({
    id: string({
      required_error: "Id is required",
      invalid_type_error: "Id must be a string",
    }).min(1),
  }),
});

export const deleteUserSchema = object({
  params: object({
    id: string({
      required_error: "Id is required",
      invalid_type_error: "Id must be a string",
    }).min(1),
  }),
});

export type CreateUserSchema = TypeOf<typeof createUserSchema>;
export type UpdateUserSchema = TypeOf<typeof updateUserSchema>;
export type GetUserSchema = TypeOf<typeof getUserSchema>;
export type DeleteUserSchema = TypeOf<typeof deleteUserSchema>;
