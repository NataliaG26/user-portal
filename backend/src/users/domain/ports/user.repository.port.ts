import { UserEntity } from '../entities';

/**
 * Output port for user persistence.
 * Defines the contract that any user repository implementation must fulfill.
 * Following hexagonal architecture, the domain defines what it needs
 * without knowing how it will be implemented (Prisma, MongoDB, etc).
 */
export interface UserRepositoryPort {
  /**
   * @description Persists a user entity to the data store.
   * @param user - UserEntity to save
   * @returns Saved UserEntity
   */
  save(user: UserEntity): Promise<UserEntity>;

  /**
   * @description Finds a user by their unique ID.
   * @param id - User ID to search for
   * @returns UserEntity if found, null otherwise
   */
  findById(id: number): Promise<UserEntity | null>;

  /**
   * @description Retrieves all locally saved users.
   * @returns Array of UserEntity
   */
  findAll(): Promise<UserEntity[]>;

  /**
   * @description Fetches a user from ReqRes API and persists locally.
   * @param id - ReqRes user ID to import
   * @returns Saved UserEntity
   * @throws Error if user not found in ReqRes
   */
  importFromReqRes(id: number): Promise<UserEntity>;

  /**
   * Finds a user by their email address.
   * @param email - Email to search for
   * @returns UserEntity if found, null otherwise
   */
  findByEmail(email: string): Promise<UserEntity | null>;
}
