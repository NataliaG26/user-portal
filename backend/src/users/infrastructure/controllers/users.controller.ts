import {
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { JwtGuard } from '../../../shared/guards';
import {
  ImportUserUseCase,
  GetSavedUsersUseCase,
  GetUserByIdUseCase,
} from '../../application/use-cases';
/**
 * Input adapter: handles HTTP requests for user management.
 * All routes are protected by JWT authentication.
 */
@ApiTags('Users')
@ApiCookieAuth('token')
@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly importUserUseCase: ImportUserUseCase,
    private readonly getSavedUsersUseCase: GetSavedUsersUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  /**
   * @description Imports a user from ReqRes API and saves to local database.
   * @param id - ReqRes user ID to import
   * @returns Imported user entity
   * @throws NotFoundException if user is not found in ReqRes
   */
  @Post('import/:id')
  @ApiOperation({ summary: 'Import a user from ReqRes and save locally' })
  @ApiParam({ name: 'id', type: Number, description: 'ReqRes user ID' })
  @ApiResponse({
    status: 201,
    description: 'User imported and saved successfully',
  })
  @ApiResponse({ status: 404, description: 'User not found in ReqRes' })
  async importUser(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.importUserUseCase.execute(id);
    } catch {
      throw new NotFoundException(`User ${id} not found`);
    }
  }

  /**
   * @description Retrieves all users saved in the local database.
   * @returns Array of user entities
   */
  @Get('saved')
  @ApiOperation({ summary: 'Get all locally saved users' })
  @ApiResponse({ status: 200, description: 'List of locally saved users' })
  async getSavedUsers() {
    return this.getSavedUsersUseCase.execute();
  }

  /**
   * @description Retrieves a single user by ID from the local database.
   * @param id - User ID to retrieve
   * @returns User entity
   * @throws NotFoundException if user is not found locally
   */
  @Get('saved/:id')
  @ApiOperation({ summary: 'Get a locally saved user by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getSavedUser(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.getUserByIdUseCase.execute(id);
    } catch {
      throw new NotFoundException(`User ${id} not found`);
    }
  }
}
