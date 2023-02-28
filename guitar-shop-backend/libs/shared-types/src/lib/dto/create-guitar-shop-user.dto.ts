import { GuitarShopUserInterface } from "../interface/guitar-shop-user.interface";

import { GuitarShopUserConstantValueEnum } from '@guitar-shop/shared-types';

import { Expose, Transform } from "class-transformer";
import { IsBoolean, IsEmail, IsString, MaxLength, MinLength } from "class-validator";


export class CreateGuitarShopUserDto implements GuitarShopUserInterface {
  @Expose()
  @IsString()
  @MinLength(GuitarShopUserConstantValueEnum.USERNAME_MIN_LENGTH)
  @MaxLength(GuitarShopUserConstantValueEnum.USERNAME_MAX_LENGTH)
  username: string;

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  @MinLength(GuitarShopUserConstantValueEnum.PASSWORD_MIN_LENGTH)
  @MaxLength(GuitarShopUserConstantValueEnum.PASSWORD_MAX_LENGTH)
  password?: string;

  @Expose()
  @Transform(({ value }) => {
    if (!value || typeof value !== 'boolean') {
      return false;
    }
    if (value && typeof value === 'boolean') {
      return value;
    }

    return false;
  })
  @IsBoolean()
  isAdmin?: boolean;

}
