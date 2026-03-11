import api from '@/shared/lib/axios';
import { UserRepositoryPort } from '../../domain/ports/user.repository.port';
import { UserEntity } from '../../domain/entities/user.entity';

/**
 * Output adapter: HTTP implementation of the user repository.
 * Connects the domain with the backend via axios.
 */
export class UserAxiosRepository implements UserRepositoryPort {
  /**
   * Fetches all locally saved users from the backend.
   * @returns List of user entities
   */
  async findAll(): Promise<UserEntity[]> {
    const { data } = await api.get('/users/saved');
    return data;
  }

  /**
   * Fetches a locally saved user by ID from the backend.
   * @param id - User ID
   * @returns User entity or null if not found
   */
  async findById(id: number): Promise<UserEntity | null> {
    try {
      const { data } = await api.get(`/users/saved/${id}`);
      return data;
    } catch {
      return null;
    }
  }

  /**
   * Imports a user from ReqRes via the backend and saves locally.
   * @param id - ReqRes user ID
   * @returns Saved user entity
   */
  async importUser(id: number): Promise<UserEntity> {
    const { data } = await api.post(`/users/import/${id}`);
    return data;
  }
}