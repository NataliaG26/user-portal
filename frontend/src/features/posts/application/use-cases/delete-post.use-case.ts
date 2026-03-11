import { PostRepositoryPort } from '../../domain/ports/post.repository.port';

/**
 * Use case: Delete a post by ID.
 */
export class DeletePostUseCase {
  constructor(private readonly postRepository: PostRepositoryPort) {}

  /**
   * Deletes a post or throws if not found.
   * @param id - Post ID
   * @throws Error if post is not found
   */
  async execute(id: number): Promise<void> {
    const post = await this.postRepository.findById(id);
    if (!post) throw new Error(`Post ${id} not found`);
    return this.postRepository.delete(id);
  }
}