import { User as PrismaUser } from '@prisma/client';
import { UserEntity } from '../../domain/entities/user.entity';

/**
 * Mapper for transforming user data between layers.
 * Keeps domain entities decoupled from external data sources.
 */
export class UserMapper {
  /**
   * @description Maps a Prisma User record to a domain UserEntity.
   * @param prismaUser - Raw Prisma user object from DB
   * @returns Domain UserEntity
   */
  static toDomain(prismaUser: PrismaUser): UserEntity {
    return {
      id: prismaUser.id,
      email: prismaUser.email,
      firstName: prismaUser.firstName,
      lastName: prismaUser.lastName,
      avatar: prismaUser.avatar,
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt,
    };
  }

  /**
   * @description Maps a ReqRes API response to a domain UserEntity.
   * @param reqResUser - Raw user object from ReqRes API
   * @returns Domain UserEntity
   */
  static fromReqRes(reqResUser: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  }): UserEntity {
    return {
      id: reqResUser.id,
      email: reqResUser.email,
      firstName: reqResUser.first_name,
      lastName: reqResUser.last_name,
      avatar: reqResUser.avatar,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  /**
   * @description Maps a domain UserEntity to a Prisma-compatible create/update object.
   * @param user - Domain UserEntity
   * @returns Prisma-compatible user object
   */
  static toPrisma(user: UserEntity): Omit<PrismaUser, 'createdAt' | 'updatedAt'> {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar ?? null,
    };
  }
}