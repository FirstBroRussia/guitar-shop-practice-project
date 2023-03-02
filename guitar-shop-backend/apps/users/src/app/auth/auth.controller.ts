import { Request } from 'express';

import { GuitarShopCreateUserDto, GuitarShopLoginUserDto, GuitarShopLogoutUserDto, GuitarShopUserDto, JwtPayloadDto, TransformAndValidateDtoInterceptor } from '@guitar-shop/shared-types';
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { Logger, LoggerService } from '@nestjs/common/services';
import { UsersRepositoryService } from '../users-repository/users-repository.service';
import { JwtAuthUsersGuard } from '../../assets/guard/jwt-auth-users.guard';
import { fillDTO } from '@guitar-shop/core';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  private readonly logger: LoggerService = new Logger(AuthController.name);

  constructor (
    private readonly usersRepository: UsersRepositoryService,
    private readonly jwtService: JwtService,
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
  async register(@Body() dto: GuitarShopCreateUserDto): Promise<GuitarShopUserDto> {
    return fillDTO(GuitarShopUserDto, await this.usersRepository.createUser(dto));
  }

  @Post('login')
  @UseInterceptors(new TransformAndValidateDtoInterceptor(GuitarShopLoginUserDto))
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: GuitarShopLoginUserDto): Promise<any> {
    const { email, username } = await this.usersRepository.verifyUser(dto);

    const payload = {
      email: email,
      username: username,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken: accessToken,
      ...payload,
    };
  }

  @Get('logout')
  @UseGuards(JwtAuthUsersGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request & { user: JwtPayloadDto }): Promise<any> {
    const accessToken = req.headers.authorization?.split(' ')[1];
    const { exp } = req.user;

    const dto: GuitarShopLogoutUserDto = {
      accessToken: accessToken,
      exp: exp,
    };

    await this.usersRepository.createLogoutedUser(dto);

    return 'Вы успешно вышли из системы.';
  }

}
