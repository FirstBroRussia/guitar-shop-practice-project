import { Expose, Transform } from "class-transformer";
import { GuitarShopUserInterface } from "../interface/guitar-shop-user.interface";

export class GuitarShopUserRdo implements GuitarShopUserInterface {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  id: string;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  isAdmin?: boolean;

}
