import { PostRepositoryPort } from '../../domain/ports/post.repository.port';
import { PostEntity } from '../../domain/entities/post.entity';

/**
 * Use case: Update an existing post by ID.
 * Pure TypeScript — no framework dependencies.
 */
export class UpdatePostUseCase {
  constructor(
    /** Output port — decoupled from Prisma implementation */
    private readonly postRepository: PostRepositoryPort,
  ) {}

  /**
   * @description Updates a post or throws if not found.
   * @param id - Post ID to update
   * @param data - Fields to update
   * @returns Updated PostEntity
   * @throws Error if post is not found
   */
  async execute(id: number, data: Partial<Pick<PostEntity, 'title' | 'content'>>): Promise<PostEntity> {
    const post = await this.postRepository.findById(id);
    if (!post) throw new Error(`Post ${id} not found`);
    return this.postRepository.update(id, data);
  }
}