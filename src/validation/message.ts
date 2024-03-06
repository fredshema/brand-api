import { z } from "zod";

export const createMessageSchema = z.object({
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
        message: z.string({
            required_error: "Message is required",
            invalid_type_error: "Message must be a string",
        }).min(1),
    }),
});

export const updateMessageSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
        }).min(1).optional(),
        email: z.string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string",
        }).email({
            message: "Invalid email format",
        }).optional(),
        message: z.string({
            required_error: "Message is required",
            invalid_type_error: "Message must be a string",
        }).min(1).optional(),
    }),
    params: z.object({
        id: z.string({
            required_error: "Id is required",
            invalid_type_error: "Id must be a string",
        }).min(1),
    }),
});

export const getMessageSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "Id is required",
            invalid_type_error: "Id must be a string",
        }).min(1),
    }),
});
