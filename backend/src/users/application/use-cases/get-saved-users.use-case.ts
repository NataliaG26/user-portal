import { UserRepositoryPort } from '../../domain/ports/user.repository.port';
import { UserEntity } from '../../domain/entities/user.entity';

/**
 * Use case: Retrieve all locally saved users.
 * Pure TypeScript — no framework dependencies.
 */
export class GetSavedUsersUseCase {
  constructor(
    /** Output port — decoupled from Prisma implementation */
    private readonly userRepository: UserRepositoryPort,
  ) {}

  /**
   * @description Returns all users saved in the local database.
   * @returns Array of UserEntity
   */
  async execute(): Promise<UserEntity[]> {
    return this.userRepository.findAll();
  }
}