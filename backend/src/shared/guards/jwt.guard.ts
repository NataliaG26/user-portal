import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

/**
 * JWT authentication guard.
 * Validates JWT tokens from httpOnly cookies and attaches user payload to request.
 * Implements NestJS CanActivate interface for route protection.
 */
@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * @description Validates JWT token from cookie and authorizes the request.
   * @param context - Execution context containing the HTTP request
   * @returns True if token is valid, throws UnauthorizedException otherwise
   * @throws UnauthorizedException if token is missing or invalid
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies?.token;

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET || 'secret',
      });
      request['user'] = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
