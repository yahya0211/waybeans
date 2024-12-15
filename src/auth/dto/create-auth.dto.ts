import { Role } from '../entities/auth.entity';
import { ApiProperty } from '@nestjs/swagger/dist';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({
    description: 'Id user',
    example: '2',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    description: 'Email of the user',
    example: 'jJ9yK@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'password123',
  })
  @IsNotEmpty()
  password: string;

  role: Role;

  photoProfile: string;
}
