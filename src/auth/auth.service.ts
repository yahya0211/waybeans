import {
  Injectable,
  NotFoundException,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginUserDto } from './dto/login-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import { User } from './entities/auth.entity';
import cloudinary from 'src/config/cloudinary';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  private readonly logger = new Logger(AuthService.name);

  async register(createAuthDto: CreateAuthDto) {
    const existingUser = await this.prisma.user.count({
      where: {
        OR: [{ email: createAuthDto.email }],
      },
    });

    if (existingUser > 0) {
      throw new Error('User already registered');
    }

    const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);

    return this.prisma.user.create({
      data: {
        fullName: createAuthDto.fullName,
        email: createAuthDto.email,
        password: hashedPassword,
        role: 'BUYER',
        photoProfile:
          'https://res.cloudinary.com/dnsytfebt/image/upload/v1719969795/profiles/xwi2oc2abjjrm2g0stqh.jpg',
      },
    });
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    this.logger.log(`Finding user by email: ${email}`);
    const user = await this.prisma.user.findFirst({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    this.logger.log(`User found: ${user ? user.fullName : `Not Found`}`);

    return null;
  }

  async login(dto: LoginUserDto) {
    this.logger.log(`Finding user for login by email: ${dto.email}`);
    const existingUser = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
      include: {
        cart: {
          select: {
            id: true,
          },
        },
      },
    });

    this.logger.log('Checking password for login');

    const isMatchPassword = await bcrypt.compare(
      dto.password,
      existingUser.password,
    );

    if (!isMatchPassword) {
      throw new Error("Password doesn't match");
    }
    this.logger.log(
      `${isMatchPassword ? `Password valid` : `Password invalid`}`,
    );

    const payload = {
      email: existingUser.email,
      id: existingUser.id,
      role: existingUser.role,
    };

    return {
      accessToken: await this.jwtService.sign(payload),
      user: existingUser,
    };
  }

  async check(userId: string) {
    const user = await this.prisma.user.findFirst({
      where: { id: userId },
      include: {
        cart: true,
      },
    });
    return user;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  async updateUser(
    id: string,
    updateAuthDto: any,
    file: Express.Multer.File,
  ): Promise<any> {
    try {
      const existingUser = await this.prisma.user.findFirst({
        where: { id },
        select: { photoProfile: true },
      });

      if (!existingUser) {
        throw new Error('User not found');
      }

      let photoProfileUrl: string = existingUser.photoProfile || '';

      if (file) {
        const filePath = file as unknown as Express.Multer.File;
        const cloudinaryUpload = await cloudinary.uploader.upload(
          filePath.path,
          {
            folder: 'profiles',
          },
        );

        photoProfileUrl = cloudinaryUpload.secure_url;

        fs.unlinkSync(filePath.path);
      }

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: {
          fullName: updateAuthDto?.fullName,
          photoProfile: photoProfileUrl,
        },
      });

      return updatedUser;
    } catch (error) {
      throw new BadRequestException('Failed to update user: ' + error.message);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
