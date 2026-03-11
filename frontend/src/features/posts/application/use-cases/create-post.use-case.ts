import { PostRepositoryPort } from '../../domain/ports/post.repository.port';
import { PostEntity } from '../../domain/entities/post.entity';

/**
 * Use case: Create a new post.
 */
export class CreatePostUseCase {
  constructor(private readonly postRepository: PostRepositoryPort) {}

  /**
   * Creates a new post with the provided data.
   * @param data - Post data without auto-generated fields
   * @returns Created post entity
   */
  async execute(data: Omit<PostEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<PostEntity> {
    return this.postRepository.create(data);
  }
}