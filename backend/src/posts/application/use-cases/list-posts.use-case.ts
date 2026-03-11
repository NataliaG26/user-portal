import { PostRepositoryPort } from '../../domain/ports/post.repository.port';
import { PostEntity } from '../../domain/entities/post.entity';

/**
 * Use case: Retrieve all posts.
 * Pure TypeScript — no framework dependencies.
 */
export class ListPostsUseCase {
  constructor(
    /** Output port — decoupled from Prisma implementation */
    private readonly postRepository: PostRepositoryPort,
  ) {}

  /**
   * @description Returns all posts ordered by creation date descending.
   * @returns Array of PostEntity
   */
  async execute(): Promise<PostEntity[]> {
    return this.postRepository.findAll();
  }
}