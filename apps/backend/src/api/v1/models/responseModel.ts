/**
 * Represents a standardized API response structure.
 * This interface ensures consistent response formatting across all API endpoints.
 *
 * @template T - The type of data being returned in case of success
 *
 * @property status - Indicates if the operation was successful ('success' or 'error')
 * @property data - Optional payload returned on successful operations
 * @property message - Optional informational message about the operation result
 * @property error - Error message in case of failure
 * @property code - Optional error code for client-side error handling
 */
export interface ApiResponse<T> {
  status: string; // "success" or "error"
  data?: T; // optional data returned in case of success
  message?: string; // information about result
  error?: string; // optional error message
  code?: string; // optional error code
}

/**
 * Creates a standardized success response object.
 * Use this helper to ensure consistent success response formatting.
 *
 * @template T - The type of data being returned
 * @param data - Optional payload to be returned to the client
 * @param message - Optional success message
 * @returns A properly formatted success response object
 *
 * @example
 * // Basic success response
 * return successResponse({ id: "123" }, "User created successfully");
 *
 * @example
 * // Typed success response
 * interface User {
 *   id: string;
 *   name: string;
 * }
 * return successResponse<User>(
 *   { id: "123", name: "John" },
 *   "User retrieved successfully"
 * );
 *
 * @example
 * // Success response without data
 * return successResponse(undefined, "Operation completed");
 */
export const successResponse = <T>(
  data?: T,
  message?: string,
): ApiResponse<T> => ({
  status: 'success',
  data,
  message,
});

/**
 * Creates a standardized error response object.
 * Use this helper to ensure consistent error response formatting.
 *
 * @param message - Error message describing what went wrong
 * @param code - Optional error code for client-side error handling
 * @returns A properly formatted error response object
 *
 * @example
 * // Basic error response
 * return errorResponse("Invalid input provided");
 *
 * @example
 * // Error response with code
 * return errorResponse(
 *   "User not found",
 *   "USER_NOT_FOUND"
 * );
 *
 * @example
 * // In an Express route handler
 * app.get('/users/:id', (req, res) => {
 *   try {
 *     // ... operation
 *   } catch (error) {
 *     return res.status(404).json(
 *       errorResponse("User not found", "USER_NOT_FOUND")
 *     );
 *   }
 * });
 */
export const errorResponse = (
  message: string,
  code?: string,
): ApiResponse<null> => ({
  status: 'error',
  message,
  code,
});
