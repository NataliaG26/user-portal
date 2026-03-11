import { PostRepositoryPort } from '../../domain/ports/post.repository.port';
import { PostEntity } from '../../domain/entities/post.entity';

/**
 * Use case: Update a post by ID.
 */
export class UpdatePostUseCase {
  constructor(private readonly postRepository: PostRepositoryPort) {}

  /**
   * Updates a post or throws if not found.
   * @param id - Post ID
   * @param data - Fields to update
   * @returns Updated post entity
   * @throws Error if post is not found
   */
  async execute(id: number, data: Partial<Pick<PostEntity, 'title' | 'content'>>): Promise<PostEntity> {
    const post = await this.postRepository.findById(id);
    if (!post) throw new Error(`Post ${id} not found`);
    return this.postRepository.update(id, data);
  }
}