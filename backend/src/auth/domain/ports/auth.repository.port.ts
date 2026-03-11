/**
 * Output port for authentication.
 * Defines the contract that any auth repository implementation must fulfill.
 * Following hexagonal architecture, the domain defines what it needs
 * without knowing how it will be implemented.
 */
export interface AuthRepositoryPort {
  /**
   * @description Validates user credentials against an external auth service.
   * @param email - User's email address
   * @param password - User's password
   * @returns Token from external service
   * @throws UnauthorizedException if credentials are invalid
   */
  login(email: string, password: string): Promise<string>;
}