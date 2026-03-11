import { UserRepositoryPort } from '../../domain/ports/user.repository.port';
import { UserEntity } from '../../domain/entities/user.entity';

/**
 * Use case: Import a user from ReqRes and persist locally.
 * If the user already exists locally, returns the cached version.
 * Pure TypeScript — no framework dependencies.
 */
export class ImportUserUseCase {
  constructor(
    /** Output port — decoupled from Prisma implementation */
    private readonly userRepository: UserRepositoryPort,
  ) {}

  /**
   * Imports a user from ReqRes API and saves to local DB.
   * Returns existing user if already saved locally.
   * @param id - ReqRes user ID to import
   * @returns Saved UserEntity
   * @throws Error if user not found in ReqRes
   */
  async execute(id: number): Promise<UserEntity> {
    const existing = await this.userRepository.findById(id);
    if (existing) return existing;
    return this.userRepository.importFromReqRes(id);
  }
}
