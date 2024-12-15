import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Param,
  Delete,
  UseGuards,
  Patch,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginUserDto } from './dto/login-auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateAuthDto } from './dto/update-auth.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger/dist/decorators';

@ApiTags('User')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiCreatedResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: CreateAuthDto,
  })
  @ApiBadRequestResponse({ description: 'User is available', status: 400 })
  async register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Post('login')
  @ApiCreatedResponse({
    status: 201,
    description: 'Login success',
    content: {
      'application/json': {
        schema: {
          properties: {
            access_token: {
              type: 'string',
              example:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJ1eWVyMkBtYWlsLmNvbSIsImlkIjoiYzI3Nzk4MzktNWRlMy00YTk4LWI0YjgtNGY0YzBjYTU1MmY2Iiwicm9sZSI6IkJVWUVSIiwiaWF0IjoxNzI2MjI3MzgxLCJleHAiOjE3MjYzMTM3ODF9.D2UM2RMUFrGO5DHQCAdOFGCO24PWN_ISjcrrrvQg_6o',
            },
          },
        },
      },
    },
  })
  @ApiBadRequestResponse({ description: 'Invalid credentials', status: 401 })
  async login(@Body() createAuthDto: LoginUserDto, @Request() req) {
    return this.authService.login(createAuthDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('check')
  async check(@Request() req) {
    return this.authService.check(req.user.id);
  }

  @ApiCreatedResponse({
    status: 201,
    description: 'The user has been successfully updated.',
    type: UpdateAuthDto,
  })
  @ApiBadRequestResponse({ description: 'User is available', status: 400 })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async updateProfile(
    @Param('id') id: string,
    @UploadedFile() photoProfile: Express.Multer.File,
    @Body() UpdateAuthDto: any,
  ) {
    if (!photoProfile) {
      throw new BadRequestException('No file uploaded');
    }

    try {
      const updatedUser = await this.authService.updateUser(
        id,
        UpdateAuthDto,
        photoProfile,
      );

      return {
        message: 'Profile image updated successfully',
        data: updatedUser,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to update profile image: ' + error.message,
      );
    }
  }

  @Get('check')
  getProfileLogin(@Request() req) {
    return this.authService.check(req.user.id);
  }

  @Get()
  async findAll() {
    return this.authService.findAll();
  }

  @ApiCreatedResponse({
    status: 201,
    description: 'The user has been successfully deleted.',
    type: CreateAuthDto,
  })
  @ApiBadRequestResponse({ description: 'User is not available', status: 400 })
  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.authService.remove(id);
  }
}
