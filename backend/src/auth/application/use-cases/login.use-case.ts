import { AuthRepositoryPort } from '../../domain/ports/auth.repository.port';

/**
 * Use case: User login.
 * Orchestrates authentication by validating credentials against ReqRes
 * and generating a JWT token for the session.
 * Pure TypeScript — no framework dependencies.
 */
export class LoginUseCase {
  constructor(
    /** Output port — decoupled from HTTP/axios implementation */
    private readonly authRepository: AuthRepositoryPort,
    /** JWT service interface — decoupled from NestJS JwtService */
    private readonly jwtService: { sign: (payload: object) => string },
  ) {}

  /**
   * @description Executes the login flow.
   * Validates credentials via ReqRes then generates a JWT token.
   * @param email - User's email address
   * @param password - User's password
   * @returns Signed JWT token string
   * @throws UnauthorizedException if credentials are invalid
   */
  async execute(email: string, password: string): Promise<string> {
    await this.authRepository.login(email, password);
    return this.jwtService.sign({ email });
  }
}