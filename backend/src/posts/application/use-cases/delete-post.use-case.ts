import { PostRepositoryPort } from '../../domain/ports/post.repository.port';

/**
 * Use case: Delete a post by ID.
 * Pure TypeScript — no framework dependencies.
 */
export class DeletePostUseCase {
  constructor(
    /** Output port — decoupled from Prisma implementation */
    private readonly postRepository: PostRepositoryPort,
  ) {}

  /**
   * @description Deletes a post or throws if not found.
   * @param id - Post ID to delete
   * @throws Error if post is not found
   */
  async execute(id: number): Promise<void> {
    const post = await this.postRepository.findById(id);
    if (!post) throw new Error(`Post ${id} not found`);
    return this.postRepository.delete(id);
  }
}