import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './infrastructure/controllers';
import { AuthPrismaRepository } from './infrastructure/repositories';
import { LoginUseCase } from './application';

/**
 * Authentication module.
 * Handles user authentication via ReqRes API and JWT token generation.
 * Configures JWT globally for use across the application.
 */
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '1d' },
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthPrismaRepository,
    {
      provide: LoginUseCase,
      useFactory: (repo: AuthPrismaRepository, jwt: JwtService) =>
        new LoginUseCase(repo, jwt),
      inject: [AuthPrismaRepository, JwtService],
    },
  ],
})
export class AuthModule {}
