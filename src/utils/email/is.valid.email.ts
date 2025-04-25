import { z } from 'zod';
import validator from 'validator';

/**
 * Function to validate if an email address is valid.
 *
 * Validations performed:
 * 1. Validate email format using Zod schema.
 * 2. Validate email format using the Validator library.
 * 3. Validate email format against a custom regular expression (regex).
 *
 * @param email - The email address to validate.
 * @returns boolean - Returns true if the email is valid, otherwise false.
 */
export function isValidEmail(email: string): boolean {

  // 1. Define a Zod schema that expects a valid email format.
  const EmailSchemaZod = z.string().email();

  // Validate the email using Zod's schema.
  const zodResult = EmailSchemaZod.safeParse(email);

  // If the Zod validation fails, return false.
  if (!zodResult.success) {
    return false;
  }

  // 2. Validate the email using the 'validator' library.
  if (!validator.isEmail(email)) {
    return false;
  }

  // 3. Validate the email against a custom regular expression (regex).
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Return the result of the regex test.
  return regex.test(email);
}
