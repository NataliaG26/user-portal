import api from '@/shared/lib/axios';
import { PostRepositoryPort } from '../../domain/ports/post.repository.port';
import { PostEntity } from '../../domain/entities/post.entity';

/**
 * Output adapter: HTTP implementation of the post repository.
 * Connects the domain with the backend via axios.
 */
export class PostAxiosRepository implements PostRepositoryPort {
  /**
   * Creates a new post via the backend.
   * @param data - Post data without auto-generated fields
   * @returns Created post entity
   */
  async create(data: Omit<PostEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<PostEntity> {
    const { data: post } = await api.post('/posts', data);
    return post;
  }

  /**
   * Fetches all posts from the backend.
   * @returns List of post entities
   */
  async findAll(): Promise<PostEntity[]> {
    const { data } = await api.get('/posts');
    return data;
  }

  /**
   * Fetches a post by ID from the backend.
   * @param id - Post ID
   * @returns Post entity or null if not found
   */
  async findById(id: number): Promise<PostEntity | null> {
    try {
      const { data } = await api.get(`/posts/${id}`);
      return data;
    } catch {
      return null;
    }
  }

  /**
   * Updates a post by ID via the backend.
   * @param id - Post ID
   * @param data - Fields to update
   * @returns Updated post entity
   */
  async update(id: number, data: Partial<Pick<PostEntity, 'title' | 'content'>>): Promise<PostEntity> {
    const { data: post } = await api.put(`/posts/${id}`, data);
    return post;
  }

  /**
   * Deletes a post by ID via the backend.
   * @param id - Post ID
   */
  async delete(id: number): Promise<void> {
    await api.delete(`/posts/${id}`);
  }
}