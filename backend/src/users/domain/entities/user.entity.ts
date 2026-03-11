/**
 * Domain entity representing a user.
 * Pure TypeScript class with no framework dependencies.
 * Encapsulates the core business concept of a user in the system.
 */
export class UserEntity {
  /** Unique identifier for the user (matches ReqRes ID) */
  id: number;
  
  /** User's email address */
  email: string;
  
  /** User's first name */
  firstName: string;
  
  /** User's last name */
  lastName: string;
  
  /** Optional URL to user's avatar image */
  avatar?: string | null;
  
  /** Timestamp when the user was created locally */
  createdAt: Date;
  
  /** Timestamp when the user was last updated locally */
  updatedAt: Date;
}
