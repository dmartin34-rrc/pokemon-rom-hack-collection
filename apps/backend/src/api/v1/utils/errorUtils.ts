import { UNKNOWN_ERROR_CODE } from '../../../constants/errorConstants';

/**
 * Type guard to check if an unknown value is an Error object.
 *
 * @param error - Value to check
 * @returns True if the value is an Error instance, false otherwise
 *
 * @example
 * const err: unknown = new Error("Something went wrong");
 * if (isError(err)) {
 *   console.log(err.message); // TypeScript knows err is Error type
 * }
 */
export function isError(error: unknown): error is Error {
  return error instanceof Error;
}

/**
 * Type guard to check if an object has a 'code' property of type string.
 * Useful for handling error objects that may include error codes.
 *
 * @param error - Value to check
 * @returns True if the value is an object with a string code property
 *
 * @example
 * const err: unknown = { code: "NOT_FOUND", message: "Resource not found" };
 * if (hasErrorCode(err)) {
 *   console.log(err.code); // TypeScript knows err has code property
 * }
 */
export function hasErrorCode(error: unknown): error is { code: string } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof (error as Record<string, unknown>).code === 'string'
  );
}

/**
 * Safely extracts an error message from an unknown value.
 * Returns the error message if the value is an Error object,
 * otherwise converts the value to a string.
 *
 * @param error - Value to extract message from
 * @returns String representation of the error
 *
 * @example
 * console.log(getErrorMessage(new Error("Oops"))); // "Oops"
 * console.log(getErrorMessage("Raw error")); // "Raw error"
 * console.log(getErrorMessage({ custom: "error" })); // "[object Object]"
 */
export function getErrorMessage(error: unknown): string {
  if (isError(error)) {
    return error.message;
  }
  return String(error);
}

/**
 * Safely extracts an error code from an unknown value.
 * Returns the code if the value has one, otherwise returns UNKNOWN_ERROR_CODE.
 *
 * @param error - Value to extract code from
 * @returns Error code string
 *
 * @example
 * const err = { code: "NOT_FOUND" };
 * console.log(getErrorCode(err)); // "NOT_FOUND"
 * console.log(getErrorCode("string error")); // "UNKNOWN_ERROR"
 */
export function getErrorCode(error: unknown): string {
  if (hasErrorCode(error)) {
    return error.code;
  }
  return UNKNOWN_ERROR_CODE;
}
