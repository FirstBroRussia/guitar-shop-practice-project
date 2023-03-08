import { Request } from 'express';

import { GuitarShopCreateUserDto, GuitarShopLoggedUserRdo, GuitarShopLoginUserDto, GuitarShopLogoutUserDto, GuitarShopUserRdo, JwtPayloadDto, RabbitMqEventEnum, TransformAndValidateDtoInterceptor, UniqueNameEnum } from '@guitar-shop/shared-types';
import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { Logger, LoggerService } from '@nestjs/common/services';
import { UsersRepositoryService } from '../users-repository/users-repository.service';
import { JwtAuthUsersGuard } from '../../assets/guard/jwt-auth-users.guard';
import { fillDTO } from '@guitar-shop/core';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  private readonly logger: LoggerService = new Logger(AuthController.name);

  constructor (
    @Inject(UniqueNameEnum.RabbitMqClient) private readonly rabbitMqClient: ClientProxy,
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepositoryService,

  ) { }

  @Get('checktoken')
  @UseGuards(JwtAuthUsersGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  async checkUser(@Req() req: Request & { user: JwtPayloadDto }): Promise<JwtPayloadDto> {
    const jwtPayload = req.user;

    return jwtPayload;
  }

  @Post('register')
  @UseInterceptors(new TransformAndValidateDtoInterceptor(GuitarShopCreateUserDto))
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: GuitarShopCreateUserDto): Promise<GuitarShopUserRdo> {
    const result = await this.usersRepository.createUser(dto);

    const transformResult = fillDTO(GuitarShopUserRdo, result);

    this.rabbitMqClient.emit(
      RabbitMqEventEnum.AddNewUser,
      transformResult
    );

    return transformResult;
  }

  @Post('login')
  @UseInterceptors(new TransformAndValidateDtoInterceptor(GuitarShopLoginUserDto))
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: GuitarShopLoginUserDto): Promise<GuitarShopLoggedUserRdo> {
    const { id, email, username, isAdmin } = await this.usersRepository.verifyUser(dto);

    const payload = {
      id: id,
      email: email,
      username: username,
      isAdmin: isAdmin,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken: accessToken,
      ...payload,
    } as GuitarShopLoggedUserRdo;
  }

  @Get('logout')
  @UseGuards(JwtAuthUsersGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request & { user: JwtPayloadDto }): Promise<string> {
    const accessToken = req.headers.authorization?.split(' ')[1];
    const { email, exp } = req.user;

    const dto: GuitarShopLogoutUserDto = {
      accessToken: accessToken,
      email: email,
      exp: exp,
    };

    await this.usersRepository.createLogoutedUser(dto);

    return 'Вы успешно вышли из системы.';
  }

}
