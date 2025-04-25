import { EmployeeRole } from "@prisma/client";
import { jwtSecret } from "../constants";
import { JwtService } from '@nestjs/jwt';

/**
 * Generates an access token and a refresh token for an employee.
 *
 * How it works:
 * 1. Creates a JWT payload that includes the employee's id, email, and optional role.
 * 2. Uses NestJS's JwtService to sign and generate:
 *    - Access token: valid for 30 minutes.
 *    - Refresh token: valid for 50 minutes.
 *
 * @param args - An object containing:
 *    - id: The employee's unique identifier.
 *    - email: The employee's email address.
 *    - EmployeeRole (optional): The employee's role (enum from Prisma).
 * @returns Promise<{ token: string; refreshToken: string }> - The generated tokens.
 */
export async function employeeCreateToken(args: { id: string; email: string; EmployeeRole?: EmployeeRole }) {
  
  // The payload to include in the JWT tokens
  const payload = args;

  // Initialize a new instance of JwtService (could be injected in a class for better practice)
  const jwtService = new JwtService();

  // Generate the access token, valid for 30 minutes
  const token = await jwtService.signAsync(payload, {
    secret: jwtSecret,
    expiresIn: '30m',
  });

  // Generate the refresh token, valid for 50 minutes
  const refreshToken = await jwtService.signAsync(payload, {
    secret: jwtSecret,
    expiresIn: '50m',
  });

  // Return both tokens
  return { token, refreshToken };
}
