import z from "zod";

const content = z
  .string({
    required_error: "Content is required",
    invalid_type_error: "Content must be a string",
  })
  .min(1);

const articleId = z.string({
  required_error: "Article id is required",
  invalid_type_error: "Article id must be a string",
});

const id = z.string({
  required_error: "Comment id is required",
  invalid_type_error: "Comment id must be a string",
});

export const getCommentsSchema = z.object({
  params: z.object({ articleId }),
});

export const getCommentSchema = z.object({
  params: z.object({ articleId, id }),
});

export const createCommentSchema = z.object({
  body: z.object({ content }),
  params: z.object({ articleId }),
});

export const updateCommentSchema = z.object({
  body: z.object({ content }),
  params: z.object({ articleId, id }),
});

export const deleteCommentSchema = z.object({
  params: z.object({ articleId, id }),
});
