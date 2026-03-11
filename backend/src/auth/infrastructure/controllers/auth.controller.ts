import { Controller, Post, Body, Res, HttpCode } from '@nestjs/common';
import type { Response } from 'express';
import { LoginUseCase } from '../../application';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { LoginDto } from '../dtos';

/**
 * Input adapter: handles HTTP requests for authentication.
 * Manages user login and session token creation.
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  /**
   * @description Authenticates a user and sets an httpOnly cookie with JWT token.
   * @param dto - Login credentials (email and password)
   * @param res - Express response object for setting cookies
   * @returns Success message
   * @throws UnauthorizedException if credentials are invalid
   */
  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login with ReqRes credentials' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Login successful — token set in httpOnly cookie' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() dto: LoginDto, @Res() res: Response): Promise<Response> {
    const token = await this.loginUseCase.execute(dto.email, dto.password);
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
    });
    return res.json({ message: 'Login successful' });
  }
}
