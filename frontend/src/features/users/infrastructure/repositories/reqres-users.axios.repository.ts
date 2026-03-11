import axios from 'axios';
import { ReqResUsersResponse } from '../../domain/entities/reqres-user.entity';

/**
 * Repository for fetching users directly from ReqRes API.
 * Used for the paginated users list view.
 */
export class ReqResUsersRepository {
  /**
   * Fetches a paginated list of users from ReqRes.
   * @param page - Page number
   * @returns Paginated users response
   */
  async getUsers(page: number = 1): Promise<ReqResUsersResponse> {
    const { data } = await axios.get(`https://reqres.in/api/users?page=${page}`, {
      headers: { 'x-api-key': process.env.NEXT_PUBLIC_REQRES_API_KEY },
    });
    return data;
  }
}