/**
 * Entity representing a user from ReqRes API.
 * Used for the paginated users list (not saved locally).
 */
export interface ReqResUserEntity {
  /** User ID */
  id: number;
  /** User email */
  email: string;
  /** User first name */
  first_name: string;
  /** User last name */
  last_name: string;
  /** URL to user avatar */
  avatar: string;
}

/**
 * Paginated response from ReqRes API.
 */
export interface ReqResUsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: ReqResUserEntity[];
}