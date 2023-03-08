import { Expose } from "class-transformer";
import { IsEmail, IsString } from "class-validator";
import { GuitarShopUserInterface } from "../interface/guitar-shop-user.interface";

export class GuitarShopNotifySendNewUserDto implements GuitarShopUserInterface {
  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  username: string;

  @Expose()
  @IsString()
  password: string;
}
