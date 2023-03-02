import { GuitarShopUserConstantValueEnum, GuitarShopUserInterface } from "@guitar-shop/shared-types";
import { Expose } from "class-transformer";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";


export class GuitarShopLoginUserDto implements GuitarShopUserInterface {
  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  @MinLength(GuitarShopUserConstantValueEnum.PASSWORD_MIN_LENGTH)
  @MaxLength(GuitarShopUserConstantValueEnum.PASSWORD_MAX_LENGTH)
  password?: string;
}
