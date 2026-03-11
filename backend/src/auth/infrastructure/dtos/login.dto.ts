import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object for user login request.
 * Validates incoming authentication credentials.
 */
export class LoginDto {
  /** User's email address */
  @ApiProperty({ example: 'eve.holt@reqres.in', description: 'User email address' })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  /** User's password */
  @ApiProperty({ example: 'cityslicka', description: 'User password' })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
