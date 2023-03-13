import { checkPassword } from '@guitar-shop/core';
import { GuitarShopCreateUserDto, GuitarShopLoginUserDto, GuitarShopLogoutUserDto, GuitarShopUsersCommentsInterMicroserviceDto } from '@guitar-shop/shared-types';
import { BadRequestException, Injectable, Logger, LoggerService, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersEnvInterface } from '../../assets/interface/users-env.interface';
import { LogoutUserEntity } from './entity/guitar-shop-logouted-user.entity';
import { GuitarShopUserEntity } from './entity/guitar-shop-user.entity';

const ONE_THOUSAND_VALUE = 1_000;
const BYPASS_DATABASE_TIME = 1_000 * 60 * 120;

@Injectable()
export class UsersRepositoryService {
  private readonly logger: LoggerService = new Logger(UsersRepositoryService.name);

  constructor (
    private readonly config: ConfigService<UsersEnvInterface>,
    @InjectModel(GuitarShopUserEntity.name) private readonly usersModel: Model<GuitarShopUserEntity>,
    @InjectModel(LogoutUserEntity.name) private readonly logoutedUsersModel: Model<LogoutUserEntity>,
  ) {
    this.bypassDatabase();
  }


  private async bypassDatabase() {
    setInterval(async () => {
      const correctDateNow = Date.now() / ONE_THOUSAND_VALUE;
      await this.logoutedUsersModel.deleteMany({
        exp: { $lte: correctDateNow, },
      });
      this.logger.log(`Произведена операция по очистке авторизационных токенов в БД вышедших из системы пользователей.`);
    }, BYPASS_DATABASE_TIME);
  }


  public async checkUser(email: string): Promise<GuitarShopUserEntity | null> {
    return await this.usersModel.findOne({
      email: email,
    });
  }

  public async checkAdminUser(): Promise<GuitarShopUserEntity | null> {
    return await this.usersModel.findOne({
      isAdmin: true,
    });
  }

  public async verifyUser(dto: GuitarShopLoginUserDto): Promise<GuitarShopUserEntity> {
    const { email, password } = dto;

    const existUser = await this.checkUser(email);

    if (!existUser) {
      throw new NotFoundException(`Пользователя с данным email: ${email} не найден.`);
    }

    if (!checkPassword(password, existUser.passwordHash, this.config.get('MONGO_DB_CREATE_USERS_SECRET'))) {
      throw new BadRequestException('Неверный пароль. Попробуйте еще.');
    }

    return existUser;
  }

  public async createUser(dto: GuitarShopCreateUserDto, isCli?: boolean): Promise<GuitarShopUserEntity> {
    const { email, password, isAdmin } = dto;

    const existUser = await this.checkUser(email);

    if (existUser) {
      throw new BadRequestException(`Пользователь с email: ${email} уже создан. Измените email.`);
    }

    if (isAdmin && !isCli) {
      throw new BadRequestException('Вы не имеете права регистрироваться как Администратор');
    }

    const newUser = new GuitarShopUserEntity().fillObject(dto).setPasswordHash(password, this.config.get('MONGO_DB_CREATE_USERS_SECRET'));
    const newUserModel = new this.usersModel(newUser);

    const result =  await newUserModel.save();
    this.logger.log(`Создан новый пользователь с email: ${email}.`);

    return result;
  }

  public async createLogoutedUser(dto: GuitarShopLogoutUserDto): Promise<LogoutUserEntity> {
    const { email } = dto;
    const newLogoutedUser = new LogoutUserEntity().fillObject(dto);
    const newLogoutedUserModel = new this.logoutedUsersModel(newLogoutedUser);

    const result = await newLogoutedUserModel.save();
    this.logger.log(`Создана запись в БД вышедшего из системы пользователя с email: ${email}.`);

    return result;
  }

  public async findLogoutedUser(accessToken: string): Promise<LogoutUserEntity | null> {
    return await this.logoutedUsersModel.findOne({
      accessToken: accessToken,
    });
  }

  public async findUsers(dto: GuitarShopUsersCommentsInterMicroserviceDto): Promise<LogoutUserEntity[] | null> {
    const { creatorUserIds }= dto;

    return await this.usersModel.find({
      _id: creatorUserIds,
    });
  }

}
