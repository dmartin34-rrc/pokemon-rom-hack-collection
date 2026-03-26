import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../models/responseModel';

interface ExtendedError extends Error {
  code?: string;
  statusCode?: number;
}

/**
 * Global error handling middleware for an Express application.
 * Catches all errors passed to next() and formats them into a consistent response format.
 *
 * @param err - The error object passed from previous middleware or route handlers
 * @param req - Express request object
 * @param res - Express response object
 * @param _next - Express next function (unused but required for Express error middleware signature)
 *
 * Features:
 * - Handles RepositoryError and ServiceError with their specific status codes and messages
 * - Provides consistent error response format
 * - Logs errors for debugging
 *
 * @example
 * // In your Express app setup after all other middleware and controllers:
 * app.use(errorHandler);
 *
 * // In your route handlers:
 * router.get('/foo/:id', async (req, res, next) => {
 *   try {
 *     // ... your logic
 *   } catch (error: unknown) {
 *     if (error instanceof RepositoryError) {
 *       next(error);  // Will be handled with proper status code and message
 *     } else {
 *       next(new ServiceError("Foo operation failed", "FOO_ERROR", 400));
 *     }
 *   }
 * });
 */
const errorHandler = (
  err: ExtendedError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  const statusCode = err.statusCode || 500;
  const code = err.code || 'UNKNOWN_ERROR';

  console.error(`Error: ${err.message} (Code: ${code})`);

  res
    .status(statusCode)
    .json(errorResponse(`An unexpected error occured: ${code}`));
};

export default errorHandler;
