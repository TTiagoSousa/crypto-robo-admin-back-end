import * as bcrypt from 'bcrypt';

/**
 * Compares a plain text password with a hashed password.
 *
 * How it works:
 * 1. Uses bcrypt to compare the provided plain text password with the stored hash.
 * 2. Returns true if they match, false otherwise.
 *
 * @param args - An object containing:
 *    - password: The plain text password to verify.
 *    - hash: The hashed password to compare against.
 * @returns Promise<boolean> - True if the passwords match, otherwise false.
 */

export async function comparePassword(args: { password: string, hash: string }): Promise<boolean> {

  // Use bcrypt.compare to check if the plain text password matches the hash.
  return await bcrypt.compare(args.password, args.hash);
}
