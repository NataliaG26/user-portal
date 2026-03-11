import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { AuthRepositoryPort } from '../../domain';

/**
 * Output adapter: HTTP implementation of the auth repository.
 * Implements AuthRepositoryPort to fulfill the domain contract.
 * Communicates with ReqRes API for authentication.
 */
@Injectable()
export class AuthPrismaRepository implements AuthRepositoryPort {
  /**
   * @description Validates user credentials against ReqRes API.
   * @param email - User's email address
   * @param password - User's password
   * @returns Authentication token from ReqRes
   * @throws UnauthorizedException if credentials are invalid
   */
  async login(email: string, password: string): Promise<string> {
    try {
      const { data } = await axios.post(
        `${process.env.REQRES_BASE_URL}/login`,
        { email, password },
        {
          headers: {
            'x-api-key': process.env.REQRES_API_KEY,
          },
        },
      );
      return data.token;
    } catch {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
