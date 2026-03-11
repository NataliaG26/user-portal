import { AuthRepositoryPort } from '../../domain/ports/auth.repository.port';

/**
 * Use case: User login.
 * Orchestrates authentication by delegating to the repository.
 * Has no knowledge of implementation details (axios, fetch, etc).
 */
export class LoginUseCase {
  constructor(
    /** Injected output port — decoupled from implementation */
    private readonly authRepository: AuthRepositoryPort,
  ) {}

  /**
   * Executes the user login flow.
   * Token is handled by the backend via httpOnly cookie.
   * @param email - User's email address
   * @param password - User's password
   */
  async execute(email: string, password: string): Promise<void> {
    await this.authRepository.login(email, password);
  }
}