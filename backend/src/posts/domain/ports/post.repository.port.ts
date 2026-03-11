import { PostEntity } from '../entities';

/**
 * Output port for post persistence.
 * Defines the contract that any post repository implementation must fulfill.
 * Following hexagonal architecture, the domain defines what it needs
 * without knowing how it will be implemented (Prisma, MongoDB, etc).
 */
export interface PostRepositoryPort {
  /**
   * @description Creates a new post in the data store.
   * @param data - Post data without auto-generated fields
   * @returns Created PostEntity
   */
  create(data: Omit<PostEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<PostEntity>;

  /**
   * @description Retrieves all posts.
   * @returns Array of PostEntity
   */
  findAll(): Promise<PostEntity[]>;

  /**
   * @description Finds a post by its unique ID.
   * @param id - Post ID to search for
   * @returns PostEntity if found, null otherwise
   */
  findById(id: number): Promise<PostEntity | null>;

  /**
   * @description Updates a post by its ID.
   * @param id - Post ID to update
   * @param data - Fields to update
   * @returns Updated PostEntity
   */
  update(id: number, data: Partial<Pick<PostEntity, 'title' | 'content'>>): Promise<PostEntity>;

  /**
   * @description Deletes a post by its ID.
   * @param id - Post ID to delete
   */
  delete(id: number): Promise<void>;
}