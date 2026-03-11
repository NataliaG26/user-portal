/**
 * Domain entity representing a post.
 * Pure TypeScript — no framework dependencies.
 */
export interface PostEntity {
  /** Unique identifier */
  id: number;
  /** Post title */
  title: string;
  /** Post content/body */
  content: string;
  /** ID of the author (ReqRes user ID or saved user ID) */
  authorUserId: number;
  /** Record creation timestamp */
  createdAt: Date;
  /** Record last update timestamp */
  updatedAt: Date;
}