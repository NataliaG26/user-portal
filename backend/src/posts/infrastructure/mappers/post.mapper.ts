import { Post as PrismaPost } from '@prisma/client';
import { PostEntity } from '../../domain/entities/post.entity';

/**
 * Mapper for transforming post data between layers.
 * Keeps domain entities decoupled from Prisma models.
 */
export class PostMapper {
  /**
   * @description Maps a Prisma Post record to a domain PostEntity.
   * @param prismaPost - Raw Prisma post object from DB
   * @returns Domain PostEntity
   */
  static toDomain(prismaPost: PrismaPost): PostEntity {
    return {
      id: prismaPost.id,
      title: prismaPost.title,
      content: prismaPost.content,
      authorUserId: prismaPost.authorUserId,
      createdAt: prismaPost.createdAt,
      updatedAt: prismaPost.updatedAt,
    };
  }

  /**
   * @description Maps a domain PostEntity to a Prisma-compatible create object.
   * @param post - Domain PostEntity data
   * @returns Prisma-compatible post object
   */
  static toPrisma(
    post: Omit<PostEntity, 'id' | 'createdAt' | 'updatedAt'>,
  ): Omit<PrismaPost, 'id' | 'createdAt' | 'updatedAt'> {
    return {
      title: post.title,
      content: post.content,
      authorUserId: post.authorUserId,
    };
  }
}