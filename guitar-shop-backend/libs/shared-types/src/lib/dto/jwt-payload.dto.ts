import { GuitarShopUserInterface } from "../interface/guitar-shop-user.interface";

export class JwtPayloadDto implements GuitarShopUserInterface {
  email: string;
  username: string;
  exp: number;
  iat: number;
}
