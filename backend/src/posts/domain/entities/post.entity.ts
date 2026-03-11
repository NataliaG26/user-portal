/**
 * Domain entity representing a blog post.
 * Pure TypeScript class with no framework dependencies.
 * Encapsulates the core business concept of a post in the system.
 */
export class PostEntity {
  /** Unique identifier for the post */
  id: number;
  
  /** Title of the post */
  title: string;
  
  /** Main content/body of the post */
  content: string;
  
  /** ID of the user who authored this post */
  authorUserId: number;
  
  /** Timestamp when the post was created */
  createdAt: Date;
  
  /** Timestamp when the post was last updated */
  updatedAt: Date;
}
