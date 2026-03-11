import { UserRepositoryPort } from '../../domain/ports/user.repository.port';
import { UserEntity } from '../../domain/entities/user.entity';

/**
 * Use case: Retrieve a locally saved user by ID.
 * Pure TypeScript — no framework dependencies.
 */
export class GetUserByIdUseCase {
  constructor(
    /** Output port — decoupled from Prisma implementation */
    private readonly userRepository: UserRepositoryPort,
  ) {}

  /**
   * @description Returns a user by ID or throws if not found locally.
   * @param id - User ID to retrieve
   * @returns UserEntity
   * @throws Error if user is not found in local DB
   */
  async execute(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error(`User ${id} not found`);
    return user;
  }
}