import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * Global Prisma module.
 * Provides PrismaService to all modules without requiring explicit imports.
 * Marked as @Global to make PrismaService available application-wide.
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
