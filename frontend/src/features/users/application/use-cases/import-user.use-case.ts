import { UserRepositoryPort } from '../../domain/ports/user.repository.port';
import { UserEntity } from '../../domain/entities/user.entity';

/**
 * Use case: Import a user from ReqRes and save locally.
 */
export class ImportUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  /**
   * Imports a user from ReqRes and persists it locally.
   * @param id - ReqRes user ID
   * @returns Saved user entity
   * @throws Error if user is not found in ReqRes
   */
  async execute(id: number): Promise<UserEntity> {
    return this.userRepository.importUser(id);
  }
}