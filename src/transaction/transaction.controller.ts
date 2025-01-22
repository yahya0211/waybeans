import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import {
  ApiBadRequestResponse,
  ApiBasicAuth,
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiHeader,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/enums/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Transactions')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  status: 401,
  description: 'Unauthorized',
})
@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly jwtService: JwtService,
  ) {}

  @Post(':cartId')
  @ApiCreatedResponse({
    status: 201,
    description: 'The transaction has been successfully created.',
    type: CreateTransactionDto,
  })
  @ApiBadRequestResponse({
    description: 'Product is not available',
    status: 400,
  })
  @ApiConsumes('multipart/form-data')
  @UseGuards(JwtAuthGuard) // @UseGuards(LocalAuthGuard)
  @UseInterceptors(FileInterceptor('attachment'))
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Request() req,
    @Param('cartId') cartId: string,
    @UploadedFile() attachment: Express.Multer.File,
  ) {
    const token = req.headers.authorization?.split(' ')[1];

    try {
      const decode = token;

      createTransactionDto.userId = decode.id;
      createTransactionDto.cartId = cartId;
      req.headers.authorization = process.env.MIDTRANS_SERVER_KEY;

      const transaction = await this.transactionService.create(
        createTransactionDto,
        attachment,
        cartId,
      );

      return transaction;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Get()
  async findAllTransaction() {
    return this.transactionService.findAllTransaction();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Get('userId/:userId')
  async findAllTransactionUser(@Param('userId') userId: string) {
    return await this.transactionService.findByUser(userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(Role.SELLER)
  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return await this.transactionService.update(id, updateTransactionDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(Role.SELLER)
  @Delete('remove/:id')
  async remove(@Param('id') id: string) {
    return await this.transactionService.remove(id);
  }
}
