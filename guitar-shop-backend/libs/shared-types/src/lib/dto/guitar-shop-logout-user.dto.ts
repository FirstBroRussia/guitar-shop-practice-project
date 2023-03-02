import { Expose } from "class-transformer";

export class GuitarShopLogoutUserDto {
  @Expose()
  accessToken: string;

  @Expose()
  exp: number;

  @Expose()
  email: string;
}
