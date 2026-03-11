import { UserEntity } from '../entities/user.entity';

/**
 * Output port for user repository.
 * Defines the contract for any user repository implementation.
 */
export interface UserRepositoryPort {
  /**
   * Fetches all locally saved users.
   * @returns List of saved users
   */
  findAll(): Promise<UserEntity[]>;

  /**
   * Fetches a locally saved user by ID.
   * @param id - User ID
   * @returns User entity or null if not found
   */
  findById(id: number): Promise<UserEntity | null>;

  /**
   * Imports a user from ReqRes and saves locally.
   * @param id - ReqRes user ID
   * @returns Saved user entity
   */
  importUser(id: number): Promise<UserEntity>;
}