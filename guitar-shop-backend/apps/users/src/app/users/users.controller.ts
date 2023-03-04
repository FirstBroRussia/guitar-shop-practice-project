import { fillDTO } from '@guitar-shop/core';
import { ConstantValue, GuitarShopCreateUserDto, GuitarShopUserRdo } from '@guitar-shop/shared-types';
import { BadRequestException, Controller, Get, HttpCode, HttpStatus, Logger, LoggerService, Param } from '@nestjs/common';
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

  @Get('/:cliSecret')
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
      email: 'admin@admin.com',
      username: 'admin',
      password: '123456',
      isAdmin: true,
    };

    result = await this.usersRepository.createUser(dto, true);
    this.logger.log('Создан Админ-пользователь.');

    return fillDTO(GuitarShopUserRdo, result);
  }


}
