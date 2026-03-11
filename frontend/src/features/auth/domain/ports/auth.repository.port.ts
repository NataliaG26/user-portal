/**
 * Output port for authentication.
 * Defines the contract that any auth repository implementation
 * must fulfill (axios, mock, etc).
 */
export interface AuthRepositoryPort {
  /**
   * Authenticates a user against the external service.
   * @param email - User's email address
   * @param password - User's password
   * @returns Session token
   * @throws Error if credentials are invalid
   */
  login(email: string, password: string): Promise<string>;
}