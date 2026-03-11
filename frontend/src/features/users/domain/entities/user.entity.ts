/**
 * Domain entity representing a user.
 * Pure TypeScript — no framework dependencies.
 */
export interface UserEntity {
  /** Unique identifier from ReqRes */
  id: number;
  /** User's email address */
  email: string;
  /** User's first name */
  firstName: string;
  /** User's last name */
  lastName: string;
  /** URL to user's avatar image */
  avatar?: string | null;
  /** Record creation timestamp */
  createdAt: Date;
  /** Record last update timestamp */
  updatedAt: Date;
}