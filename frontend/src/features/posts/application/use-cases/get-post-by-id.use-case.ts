import { PostRepositoryPort } from '../../domain/ports/post.repository.port';
import { PostEntity } from '../../domain/entities/post.entity';

/**
 * Use case: Get a post by ID.
 */
export class GetPostByIdUseCase {
  constructor(private readonly postRepository: PostRepositoryPort) {}

  /**
   * Returns a post by ID or throws if not found.
   * @param id - Post ID
   * @returns Post entity
   * @throws Error if post is not found
   */
  async execute(id: number): Promise<PostEntity> {
    const post = await this.postRepository.findById(id);
    if (!post) throw new Error(`Post ${id} not found`);
    return post;
  }
}