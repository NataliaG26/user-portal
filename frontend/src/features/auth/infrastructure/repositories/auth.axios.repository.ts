import api from '@/shared/lib/axios';
import { AuthRepositoryPort } from '../../domain/ports/auth.repository.port';

/**
 * Output adapter: HTTP implementation of the auth repository.
 * Connects the domain with the backend via axios.
 * Implements AuthRepositoryPort to fulfill the domain contract.
 */
export class AuthAxiosRepository implements AuthRepositoryPort {
  /**
   * Authenticates the user by calling the backend.
   * The backend automatically sets the token in an httpOnly cookie.
   * @param email - User's email address
   * @param password - User's password
   * @returns Session token received from the backend
   */
  async login(email: string, password: string): Promise<string> {
    const { data } = await api.post('/auth/login', { email, password });
    return data.token;
  }
}