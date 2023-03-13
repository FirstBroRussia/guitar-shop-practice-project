import { Expose } from "class-transformer";

export class GuitarShopCommentBffRdo {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  productId: string;

  @Expose()
  advantages: string;

  @Expose()
  disadvantages: string;

  @Expose()
  comment: string;

  @Expose()
  score: number;

  @Expose()
  createdAt: string;
}
