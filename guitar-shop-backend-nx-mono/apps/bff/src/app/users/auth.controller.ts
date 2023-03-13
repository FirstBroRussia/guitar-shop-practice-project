import axios from 'axios';
import { Request } from 'express';

import { Body, Controller, Get, HttpCode, HttpStatus, Logger, LoggerService, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { GuitarShopCreateUserDto, GuitarShopLoggedUserRdo, GuitarShopLoginUserDto, GuitarShopUserRdo, JwtPayloadDto, TransformAndValidateDtoInterceptor } from '@guitar-shop/shared-types';
import { fillDTO } from '@guitar-shop/core';

import { JwtAuthUsersGuard } from '../../assets/guard/jwt-auth-users.guard';
import { BffEnvInterface } from '../../assets/interface/bff-env.interface';

@Controller('auth')
export class AuthController {
  private readonly logger: LoggerService = new Logger(AuthController.name);

  private readonly usersMicroserviceUrl: string;

  constructor(
    private readonly config: ConfigService<BffEnvInterface>,
  ) {
    this.usersMicroserviceUrl = `http://${config.get("USERS_MICROSERVICE_HOST")}:${config.get("USERS_MICROSERVICE_PORT")}`;
  }


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
    return (await axios.post(`${this.usersMicroserviceUrl}/api/auth/register`, dto)).data as GuitarShopUserRdo;
  }

  @Post('login')
  @UseInterceptors(new TransformAndValidateDtoInterceptor(GuitarShopLoginUserDto))
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: GuitarShopLoginUserDto): Promise<GuitarShopLoggedUserRdo> {
    const result = (await axios.post(`${this.usersMicroserviceUrl}/api/auth/login`, dto)).data as GuitarShopLoggedUserRdo;

    return fillDTO(GuitarShopLoggedUserRdo, result);
  }

  @Get('logout')
  @UseGuards(JwtAuthUsersGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Req() req: Request & { user: JwtPayloadDto }): Promise<string> {
    const accessToken = req.headers.authorization?.split(' ')[1];

    const result = (await axios.get(`${this.usersMicroserviceUrl}/api/auth/logout`, {
      headers: { Authorization: `Bearer ${accessToken}`, }
    })).data as string;

    return result;
  }

}
