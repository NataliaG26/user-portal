import { IsString, IsNumber, MinLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object for creating a new post.
 * Validates incoming post creation data.
 */
export class CreatePostDto {
  /** Title of the post */
  @ApiProperty({ example: 'My First Post', description: 'Post title (minimum 3 characters)' })
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  title: string;

  /** Content/body of the post */
  @ApiProperty({ example: 'This is the content of my first post...', description: 'Post content (minimum 10 characters)' })
  @IsString({ message: 'Content must be a string' })
  @IsNotEmpty({ message: 'Content is required' })
  @MinLength(10, { message: 'Content must be at least 10 characters long' })
  content: string;

  /** ID of the user creating the post */
  @ApiProperty({ example: 1, description: 'ID of the user who authored this post' })
  @IsNumber({}, { message: 'Author user ID must be a number' })
  @IsNotEmpty({ message: 'Author user ID is required' })
  authorUserId: number;
}
