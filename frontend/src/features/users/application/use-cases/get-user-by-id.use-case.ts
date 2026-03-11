import { UserRepositoryPort } from '../../domain/ports/user.repository.port';
import { UserEntity } from '../../domain/entities/user.entity';

/**
 * Use case: Get a locally saved user by ID.
 */
export class GetUserByIdUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  /**
   * Returns a user by ID or throws if not found.
   * @param id - User ID
   * @returns User entity
   * @throws Error if user is not found
   */
  async execute(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error(`User ${id} not found`);
    return user;
  }
}