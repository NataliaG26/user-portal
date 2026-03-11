import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Custom parameter decorator to extract the current authenticated user from the request.
 * Should be used in conjunction with JwtGuard to ensure user is authenticated.
 * 
 * @example
 * ```typescript
 * @Get('profile')
 * @UseGuards(JwtGuard)
 * getProfile(@CurrentUser() user: { email: string }) {
 *   return user;
 * }
 * ```
 */
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
