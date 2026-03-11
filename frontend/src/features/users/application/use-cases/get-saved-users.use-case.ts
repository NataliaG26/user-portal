import { UserRepositoryPort } from '../../domain/ports/user.repository.port';
import { UserEntity } from '../../domain/entities/user.entity';

/**
 * Use case: Get all locally saved users.
 */
export class GetSavedUsersUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  /**
   * Returns all users saved in the local database.
   * @returns List of user entities
   */
  async execute(): Promise<UserEntity[]> {
    return this.userRepository.findAll();
  }
}