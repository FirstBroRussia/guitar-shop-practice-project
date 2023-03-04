import { Expose, Transform } from "class-transformer";
import { GuitarShopCommentInterface } from "../interface/guitar-shop-comment.interface";

export class GuitarShopCommentRdo implements GuitarShopCommentInterface {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  id: string;

  @Expose()
  creatorUserId: string;

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
