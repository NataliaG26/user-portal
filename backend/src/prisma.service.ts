import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Prisma database service.
 * Extends PrismaClient to provide database connectivity throughout the application.
 * Automatically connects to the database when the module initializes.
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  /**
   * @description Establishes database connection when the module initializes.
   * Called automatically by NestJS during application bootstrap.
   */
  async onModuleInit(): Promise<void> {
    await this.$connect();
  }
}
