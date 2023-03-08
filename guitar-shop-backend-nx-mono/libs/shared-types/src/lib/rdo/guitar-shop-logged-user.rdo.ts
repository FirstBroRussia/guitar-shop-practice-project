import { Expose } from "class-transformer";

export class GuitarShopLoggedUserRdo {
  @Expose()
  accessToken: string;

  @Expose()
  email: string;

  @Expose()
  username: string;

  @Expose()
  isAdmin: boolean;
}
