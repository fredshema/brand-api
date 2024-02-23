import { TypeOf, object, string } from "zod";

export const createArticleSchema = object({
  body: object({
    title: string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    }).min(1),
    content: string({
      required_error: "Content is required",
      invalid_type_error: "Content must be a string",
    }).min(1),
  }),
});

export const updateArticleSchema = object({
  body: object({
    title: string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
      .min(1)
      .optional(),
    content: string({
      required_error: "Content is required",
      invalid_type_error: "Content must be a string",
    })
      .min(1)
      .optional(),
  }),
  params: object({
    id: string({
      required_error: "Id is required",
      invalid_type_error: "Id must be a string",
    }).min(1),
  }),
});

export const getArticleSchema = object({
  params: object({
    id: string({
      required_error: "Id is required",
      invalid_type_error: "Id must be a string",
    }).min(1),
  }),
});

export type CreateArticleSchema = TypeOf<typeof createArticleSchema>;
export type UpdateArticleSchema = TypeOf<typeof updateArticleSchema>;
export type GetArticleSchema = TypeOf<typeof getArticleSchema>;
