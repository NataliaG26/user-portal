import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { PostRepositoryPort } from '../../domain/ports';
import { PostEntity } from '../../domain/entities';
import { PostMapper } from '../mappers/post.mapper';

/**
 * Output adapter: Prisma implementation of the post repository.
 * Implements PostRepositoryPort to fulfill the domain contract.
 * Uses PostMapper to keep domain entities decoupled from Prisma models.
 */
@Injectable()
export class PostsPrismaRepository implements PostRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * @description Creates a new post in the database.
   * @param data - Post data without auto-generated fields
   * @returns Created PostEntity mapped from Prisma record
   */
  async create(data: Omit<PostEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<PostEntity> {
    const post = await this.prisma.post.create({ data: PostMapper.toPrisma(data) });
    return PostMapper.toDomain(post);
  }

  /**
   * @description Retrieves all posts ordered by creation date descending.
   * @returns Array of PostEntity mapped from Prisma records
   */
  async findAll(): Promise<PostEntity[]> {
    const posts = await this.prisma.post.findMany({ orderBy: { createdAt: 'desc' } });
    return posts.map(PostMapper.toDomain);
  }

  /**
   * @description Finds a post by its ID.
   * @param id - Post ID to search for
   * @returns PostEntity if found, null otherwise
   */
  async findById(id: number): Promise<PostEntity | null> {
    const post = await this.prisma.post.findUnique({ where: { id } });
    return post ? PostMapper.toDomain(post) : null;
  }

  /**
   * @description Updates a post by its ID.
   * @param id - Post ID to update
   * @param data - Fields to update (title and/or content)
   * @returns Updated PostEntity mapped from Prisma record
   */
  async update(id: number, data: Partial<Pick<PostEntity, 'title' | 'content'>>): Promise<PostEntity> {
    const post = await this.prisma.post.update({ where: { id }, data });
    return PostMapper.toDomain(post);
  }

  /**
   * @description Deletes a post by its ID.
   * @param id - Post ID to delete
   */
  async delete(id: number): Promise<void> {
    await this.prisma.post.delete({ where: { id } });
  }
}