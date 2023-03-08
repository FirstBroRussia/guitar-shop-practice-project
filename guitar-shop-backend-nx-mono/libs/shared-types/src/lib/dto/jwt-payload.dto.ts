import { GuitarShopUserInterface } from "../interface/guitar-shop-user.interface";

export class JwtPayloadDto implements GuitarShopUserInterface {
  id: string;
  email: string;
  username: string;
  isAdmin: boolean;
  exp: number;
  iat: number;
}
