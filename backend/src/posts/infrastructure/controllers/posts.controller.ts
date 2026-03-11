import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
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
import { CreatePostDto, UpdatePostDto } from '../dtos';
import {
  CreatePostUseCase,
  ListPostsUseCase,
  GetPostByIdUseCase,
  UpdatePostUseCase,
  DeletePostUseCase,
} from '../../application/use-cases';
import { CurrentUser } from '../../../shared/decorators/current-user.decorator';

/**
 * Input adapter: handles HTTP requests for post management.
 * All routes are protected by JWT authentication.
 */
@ApiTags('Posts')
@ApiCookieAuth('token')
@UseGuards(JwtGuard)
@Controller('posts')
export class PostsController {
  constructor(
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly listPostsUseCase: ListPostsUseCase,
    private readonly getPostByIdUseCase: GetPostByIdUseCase,
    private readonly updatePostUseCase: UpdatePostUseCase,
    private readonly deletePostUseCase: DeletePostUseCase,
  ) {}

  /**
   * @description Creates a new post with the provided data.
   * @param dto - Post creation data (title, content, authorUserId)
   * @returns Created post entity
   * @throws NotFoundException if creation fails
   */
  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({ status: 201, description: 'Post created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async create(@Body() dto: CreatePostDto) {
    try {
      return await this.createPostUseCase.execute(dto);
    } catch (e) {
      throw new NotFoundException((e as Error).message);
    }
  }

  /**
   * @description Retrieves all posts ordered by creation date descending.
   * @returns Array of post entities
   */
  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({ status: 200, description: 'List of all posts' })
  async findAll() {
    return this.listPostsUseCase.execute();
  }

  /**
   * @description Retrieves a single post by its ID.
   * @param id - Post ID to retrieve
   * @returns Post entity
   * @throws NotFoundException if post is not found
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a post by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Post ID' })
  @ApiResponse({ status: 200, description: 'Post found' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.getPostByIdUseCase.execute(id);
    } catch {
      throw new NotFoundException(`Post ${id} not found`);
    }
  }

  /**
   * @description Updates an existing post by its ID.
   * @param id - Post ID to update
   * @param dto - Fields to update (title and/or content)
   * @returns Updated post entity
   * @throws NotFoundException if post is not found
   */
  @Put(':id')
  @ApiOperation({ summary: 'Update a post by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Post ID' })
  @ApiResponse({ status: 200, description: 'Post updated successfully' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePostDto,
  ) {
    try {
      return await this.updatePostUseCase.execute(id, dto);
    } catch {
      throw new NotFoundException(`Post ${id} not found`);
    }
  }

  /**
   * @description Deletes a post by its ID.
   * @param id - Post ID to delete
   * @returns Success message
   * @throws NotFoundException if post is not found
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Post ID' })
  @ApiResponse({ status: 200, description: 'Post deleted successfully' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.deletePostUseCase.execute(id);
      return { message: 'Post deleted successfully' };
    } catch {
      throw new NotFoundException(`Post ${id} not found`);
    }
  }
}
