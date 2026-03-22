import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

import { MiddlewareFunction, RequestData } from '../types/expressTypes';
import { HTTP_STATUS } from '../../../constants/httpConstants';

/**
 * Validates data against a Joi schema and throws an error if validation fails.
 *
 * @template T - The type of data being validated
 * @param schema - Joi schema to validate against
 * @param data - Data to validate
 * @throws Error if validation fails, with concatenated error messages
 *
 * @example
 * const userSchema = Joi.object({
 *   name: Joi.string().required(),
 *   age: Joi.number().min(0)
 * });
 *
 * try {
 *   validate(userSchema, { name: "John", age: -1 });
 * } catch (error) {
 *   // Will throw with validation error message
 * }
 */
export const validate = <T>(schema: ObjectSchema<T>, data: T): void => {
  // Validates data passed based off of created schema
  // Joi.validate() != validate fn
  const { error } = schema.validate(data, { abortEarly: false });
  // abortEarly: if(errs), keep validating the rest of the data

  if (error) {
    // Map through all validation errors and join them into a single string
    throw new Error(
      `Validation error: ${error.details.map((x) => x.message).join(', ')}`,
    );
  }
};

/**
 * Creates an Express middleware function that validates request data against a Joi schema.
 * Combines and validates data from request body, URL parameters, and query parameters.
 *
 * @param schema - Joi schema to validate the combined request data against
 * @returns Express middleware function that performs the validation
 * @throws Returns 400 Bad Request if validation fails
 *
 * @example
 * const router = express.Router();
 *
 * const userSchema = Joi.object({
 *   name: Joi.string().required(),
 *   id: Joi.string().required(), // from URL params
 *   filter: Joi.string() // from query params
 * });
 *
 * router.post('/users/:id', validateRequest(userSchema), (req, res) => {
 *   // If we reach here, validation passed
 *   res.json({ success: true });
 * });
 */
export const validateRequest = (schema: ObjectSchema): MiddlewareFunction => {
  // Has access to req, res, next as middleware
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Captures request payload from the middleware
      // Condenses data into one object to validate all at once against schema
      const data: RequestData = {
        ...req.body,
        ...req.params,
        ...req.query,
      };

      validate(schema, data);

      next();
    } catch (error) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        error: (error as Error).message,
      });
    }
  };
};
