import type { NextFunction, Request, Response } from 'express';
import { ZodError, type ZodSchema } from 'zod';

interface RequestValidators {
  params?: ZodSchema;
  body?: ZodSchema;
  query?: ZodSchema;
}

const validate =
  (validators: RequestValidators) => (req: Request, res: Response, next: NextFunction) => {
    try {
      if (validators.params) {
        req.params = validators.params.parse(req.params);
      }
      if (validators.body) {
        req.body = validators.body.parse(req.body);
      }
      if (validators.query) {
        req.query = validators.query.parse(req.query);
      }
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        res.status(422).send(error.issues);
      } else {
        res.status(422).send(error.message || 'Incorrect parameters.');
      }
    }
  };

export default validate;
