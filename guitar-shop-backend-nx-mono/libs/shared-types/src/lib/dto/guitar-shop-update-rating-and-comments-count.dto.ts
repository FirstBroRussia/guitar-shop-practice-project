import { GuitarShopCommentConstantValueEnum } from "@guitar-shop/shared-types";
import { Expose } from "class-transformer";
import { IsInt, Max, Min } from "class-validator";

export class GuitarShopUpdateRatingAndCommentsCountProductCardDto {
  @Expose()
  @IsInt()
  @Min(GuitarShopCommentConstantValueEnum.SCORE_MIN_VALUE)
  @Max(GuitarShopCommentConstantValueEnum.SCORE_MAX_VALUE)
  score: number;

}
