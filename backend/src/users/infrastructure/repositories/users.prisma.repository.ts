import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from '../../../prisma.service';
import { UserRepositoryPort } from '../../domain/ports';
import { UserEntity } from '../../domain/entities';
import { UserMapper } from '../mappers/user.mapper';

/**
 * Output adapter: Prisma implementation of the user repository.
 * Implements UserRepositoryPort to fulfill the domain contract.
 * Uses UserMapper to keep domain entities decoupled from Prisma models.
 */
@Injectable()
export class UsersPrismaRepository implements UserRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * @description Saves a user entity to the database.
   * Uses upsert to avoid duplicates — updates if exists, creates if not.
   * @param user - Domain UserEntity to persist
   * @returns Saved UserEntity mapped from Prisma record
   */
  async save(user: UserEntity): Promise<UserEntity> {
    const saved = await this.prisma.user.upsert({
      where: { id: user.id },
      update: UserMapper.toPrisma(user),
      create: UserMapper.toPrisma(user),
    });
    return UserMapper.toDomain(saved);
  }

  /**
   * @description Finds a user by their ID.
   * @param id - User ID to search for
   * @returns UserEntity if found, null otherwise
   */
  async findById(id: number): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? UserMapper.toDomain(user) : null;
  }

  /**
   * @description Retrieves all locally saved users.
   * @returns Array of UserEntity mapped from Prisma records
   */
  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany();
    return users.map(UserMapper.toDomain);
  }

  /**
   * Fetches a user from ReqRes API, maps to domain entity and persists locally.
   * @param id - ReqRes user ID to import
   * @returns Saved UserEntity
   * @throws Error if user not found in ReqRes
   */
  async importFromReqRes(id: number): Promise<UserEntity> {
    try {
      const { data } = await axios.get<{
        data: {
          id: number;
          email: string;
          first_name: string;
          last_name: string;
          avatar: string;
        };
      }>(`${process.env.REQRES_BASE_URL}/users/${id}`, {
        headers: { 'x-api-key': process.env.REQRES_API_KEY || '' },
      });
      const userEntity = UserMapper.fromReqRes(data.data);
      return this.save(userEntity);
    } catch {
      throw new Error(`User ${id} not found in ReqRes`);
    }
  }

  /**
   * Finds a user by their email address.
   * @param email - Email to search for
   * @returns UserEntity if found, null otherwise
   */
  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? UserMapper.toDomain(user) : null;
  }
}
