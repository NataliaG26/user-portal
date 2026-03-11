import { PostEntity } from '../entities/post.entity';

/**
 * Output port for post repository.
 * Defines the contract for any post repository implementation.
 */
export interface PostRepositoryPort {
  /**
   * Creates a new post.
   * @param data - Post data without auto-generated fields
   * @returns Created post entity
   */
  create(data: Omit<PostEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<PostEntity>;

  /**
   * Fetches all posts.
   * @returns List of post entities
   */
  findAll(): Promise<PostEntity[]>;

  /**
   * Fetches a post by ID.
   * @param id - Post ID
   * @returns Post entity or null if not found
   */
  findById(id: number): Promise<PostEntity | null>;

  /**
   * Updates a post by ID.
   * @param id - Post ID
   * @param data - Fields to update
   * @returns Updated post entity
   */
  update(id: number, data: Partial<Pick<PostEntity, 'title' | 'content'>>): Promise<PostEntity>;

  /**
   * Deletes a post by ID.
   * @param id - Post ID
   */
  delete(id: number): Promise<void>;
}