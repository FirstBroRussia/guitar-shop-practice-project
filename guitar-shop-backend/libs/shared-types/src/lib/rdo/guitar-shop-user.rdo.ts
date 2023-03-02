import { Expose } from "class-transformer";
import { GuitarShopUserInterface } from "../interface/guitar-shop-user.interface";

export class GuitarShopUserRdo implements GuitarShopUserInterface {
  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  isAdmin?: boolean;

}
