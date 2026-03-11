import { IsString, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object for updating an existing post.
 * All fields are optional - only provided fields will be updated.
 */
export class UpdatePostDto {
  /** Updated title of the post */
  @ApiProperty({ example: 'Updated Post Title', description: 'Post title (minimum 3 characters)', required: false })
  @IsString({ message: 'Title must be a string' })
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  @IsOptional()
  title?: string;

  /** Updated content/body of the post */
  @ApiProperty({ example: 'Updated content...', description: 'Post content (minimum 10 characters)', required: false })
  @IsString({ message: 'Content must be a string' })
  @MinLength(10, { message: 'Content must be at least 10 characters long' })
  @IsOptional()
  content?: string;
}
