import { PostRepositoryPort } from '../../domain/ports/post.repository.port';
import { PostEntity } from '../../domain/entities/post.entity';

/**
 * Use case: Create a new post.
 * Pure TypeScript — no framework dependencies.
 */
export class CreatePostUseCase {
  constructor(
    /** Output port — decoupled from Prisma implementation */
    private readonly postRepository: PostRepositoryPort,
  ) {}

  /**
   * @description Creates a new post with the provided data.
   * @param data - Post data without auto-generated fields
   * @returns Created PostEntity
   */
  async execute(data: Omit<PostEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<PostEntity> {
    return this.postRepository.create(data);
  }
}