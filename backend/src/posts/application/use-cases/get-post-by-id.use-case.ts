import { PostRepositoryPort } from '../../domain/ports';
import { PostEntity } from '../../domain/entities';

/**
 * Use case: Retrieve a single post by ID.
 * Pure TypeScript — no framework dependencies.
 */
export class GetPostByIdUseCase {
  constructor(
    /** Output port — decoupled from Prisma implementation */
    private readonly postRepository: PostRepositoryPort,
  ) {}

  /**
   * @description Retrieves a post by its ID or throws if not found.
   * @param id - Post ID to retrieve
   * @returns PostEntity
   * @throws Error if post is not found
   */
  async execute(id: number): Promise<PostEntity> {
    const post = await this.postRepository.findById(id);
    if (!post) throw new Error(`Post ${id} not found`);
    return post;
  }
}
