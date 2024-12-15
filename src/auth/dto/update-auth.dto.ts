import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {
  @ApiProperty({
    description: 'Id user',
    example: '2',
  })
  id?: string;

  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  fullName?: string;

  @ApiProperty({
    description: 'Email of the user',
    example: 'jJ9yK@example.com',
  })
  email?: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'password123',
  })
  password?: string;

  @ApiProperty({
    description: 'Photo profile of the user',
    example:
      'https://res.cloudinary.com/dnsytfebt/image/upload/v1719969795/profiles/xwi2oc2abjjrm2g0stqh.jpg',
  })
  photoProfile?: string;

  @ApiProperty({
    description: 'Phone number of the user',
    example: '123456789',
  })
  phone?: string;
}
