import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const validateResource =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: any) {
      const errors = error.errors.reduce((acc: any, curr: any) => {
        acc[curr.path.pop()] = curr.message;
        return acc;
      }, {});
      return res.status(400).json({
        status: "fail",
        data: errors,
      });
    }
  };
