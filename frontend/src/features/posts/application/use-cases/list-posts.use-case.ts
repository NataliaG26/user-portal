import { PostRepositoryPort } from '../../domain/ports/post.repository.port';
import { PostEntity } from '../../domain/entities/post.entity';

/**
 * Use case: List all posts.
 */
export class ListPostsUseCase {
  constructor(private readonly postRepository: PostRepositoryPort) {}

  /**
   * Returns all posts ordered by creation date.
   * @returns List of post entities
   */
  async execute(): Promise<PostEntity[]> {
    return this.postRepository.findAll();
  }
}