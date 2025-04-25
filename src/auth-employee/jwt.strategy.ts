import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

/**
 * JWT Strategy for authenticating requests using Passport in NestJS.
 *
 * How it works:
 * 1. Extracts JWT tokens from:
 *    - A cookie named 'token'
 *    - The Authorization header (Bearer token)
 * 2. Verifies the token using the secret key.
 * 3. Validates the decoded payload and makes it available in request.user.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor() {
    // Define options for the JWT strategy
    const options: StrategyOptions = {
      // Extract the JWT token from cookies or Authorization header
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,                    // Custom extractor (from cookie)
        ExtractJwt.fromAuthHeaderAsBearerToken(),  // Default extractor (Authorization header)
      ]),
      // Use the JWT secret key from environment variables
      secretOrKey: process.env.JWT_SECRET as string,
    };

    // Initialize the PassportStrategy with these options
    super(options);
  }

  /**
   * Custom extractor to retrieve JWT token from cookies.
   *
   * @param req - The incoming HTTP request.
   * @returns The JWT token string if found, otherwise null.
   */
  private static extractJWT(req: Request): string | null {
    // Check if cookies exist and if 'token' is present in cookies
    if (req.cookies && 'token' in req.cookies) {
      return req.cookies.token;
    }
    return null;
  }

  /**
   * Validate the JWT payload.
   *
   * This method is automatically called after the token is verified.
   * The returned value will be available in request.user.
   *
   * @param payload - The decoded JWT payload (id and email).
   * @returns The payload (you can enrich this with additional validation if needed).
   */
  async validate(payload: { id: string; email: string }) {
    return payload;
  }
}
