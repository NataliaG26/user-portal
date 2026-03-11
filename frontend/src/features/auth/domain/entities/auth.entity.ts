/**
 * Domain entity for authentication.
 * Represents the minimum data of an authenticated session.
 */
export interface AuthEntity {
  /** Authenticated user's email */
  email: string;
  /** JWT session token */
  token: string;
}