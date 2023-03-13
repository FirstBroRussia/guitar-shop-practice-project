import { fillDTO } from '@guitar-shop/core';
import { GuitarShopCreateUserDto, GuitarShopUserRdo, GuitarShopUsersCommentsInterMicroserviceDto, TransformAndValidateDtoInterceptor } from '@guitar-shop/shared-types';
import { BadRequestException, Body, Controller, ForbiddenException, Get, HttpCode, HttpStatus, Logger, LoggerService, Param, Post, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersEnvInterface } from '../../assets/interface/users-env.interface';
import { UsersRepositoryService } from '../users-repository/users-repository.service';

@Controller('users')
export class UsersController {
  private readonly logger: LoggerService = new Logger(UsersController.name);

  constructor (
    private readonly config: ConfigService<UsersEnvInterface>,
    private readonly usersRepository: UsersRepositoryService,
  ) { }

  @Get('/cli/:cliSecret')
  @HttpCode(HttpStatus.OK)
  async getAdminUser(@Param('cliSecret') cliSecret: string): Promise<GuitarShopUserRdo> {
    if (cliSecret !== this.config.get('CLI_SECRET')) {
      throw new BadRequestException('Неверный CLI секрет-пароль');
    }

    let result = await this.usersRepository.checkAdminUser();

    if (result) {
      return fillDTO(GuitarShopUserRdo, result);
    }

    const dto: GuitarShopCreateUserDto = {
      email: this.config.get('ADMIN_EMAIL'),
      username: this.config.get('ADMIN_USERNAME'),
      password: this.config.get('ADMIN_PASSWORD'),
      isAdmin: true,
    };

    result = await this.usersRepository.createUser(dto, true);
    this.logger.log('Создан Админ-пользователь.');

    return fillDTO(GuitarShopUserRdo, result);
  }

  @Post('/usersforcomments')
  @UseInterceptors(new TransformAndValidateDtoInterceptor(GuitarShopUsersCommentsInterMicroserviceDto))
  @HttpCode(HttpStatus.OK)
  async getUsersData(@Body() dto: GuitarShopUsersCommentsInterMicroserviceDto): Promise<GuitarShopUserRdo[]> {
    const { interMicroserviceSecret } = dto;

    if (interMicroserviceSecret !== this.config.get('INTER_SERVICE_SECRET')) {
      throw new ForbiddenException('Вы не имеете права доступа для получения данной информации');
    }

    return fillDTO(GuitarShopUserRdo, await this.usersRepository.findUsers(dto)) as unknown as GuitarShopUserRdo[];
  }

}
