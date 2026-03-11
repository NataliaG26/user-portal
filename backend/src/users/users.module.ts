import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from './infrastructure/controllers';
import { UsersPrismaRepository } from './infrastructure/repositories';
import { ImportUserUseCase } from './application/use-cases/import-user.use-case';
import { GetSavedUsersUseCase } from './application/use-cases/get-saved-users.use-case';
import { GetUserByIdUseCase } from './application/use-cases/get-user-by-id.use-case';

/**
 * Users module.
 * Handles user import from ReqRes API and local user management.
 * All routes require JWT authentication.
 */
@Module({
  imports: [JwtModule],
  controllers: [UsersController],
  providers: [
    UsersPrismaRepository,
    {
      provide: ImportUserUseCase,
      useFactory: (repo: UsersPrismaRepository) => new ImportUserUseCase(repo),
      inject: [UsersPrismaRepository],
    },
    {
      provide: GetSavedUsersUseCase,
      useFactory: (repo: UsersPrismaRepository) =>
        new GetSavedUsersUseCase(repo),
      inject: [UsersPrismaRepository],
    },
    {
      provide: GetUserByIdUseCase,
      useFactory: (repo: UsersPrismaRepository) => new GetUserByIdUseCase(repo),
      inject: [UsersPrismaRepository],
    },
  ],
})
export class UsersModule {}
