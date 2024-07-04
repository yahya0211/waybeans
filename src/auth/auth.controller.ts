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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() createAuthDto: LoginUserDto) {
    return this.authService.login(createAuthDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('check')
  async check(@Request() req) {
    return this.authService.check(req.user.id);
  }

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

    console.log('updateuser:', photoProfile);

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

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get('check')
  getProfileLogin(@Request() req) {
    return this.authService.check(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
