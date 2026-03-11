import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Request, Response } from 'express';

/**
 * Global exception filter for consistent error handling across the application.
 * Catches all exceptions and formats them into a standardized JSON response.
 * Implements NestJS ExceptionFilter interface.
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  /**
   * @description Catches and formats exceptions into standardized error responses.
   * @param exception - The caught exception (can be HttpException or any error)
   * @param host - ArgumentsHost containing request/response context
   */
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';

    response.status(status).json({
      statusCode: status,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
