import { GuitarShopCommentConstantValueEnum, GuitarShopCommentInterface } from "@guitar-shop/shared-types";
import { Expose } from "class-transformer";
import { IsInt, IsString, IsUUID, Max, MaxLength, Min, MinLength } from "class-validator";


export class GuitarShopCreateCommentBffDto implements GuitarShopCommentInterface {
  @Expose()
  @IsUUID()
  productId: string;

  @Expose()
  @IsString()
  @MinLength(GuitarShopCommentConstantValueEnum.ADVANTAGES_MIN_LENGTH)
  @MaxLength(GuitarShopCommentConstantValueEnum.ADVANTAGES_MAX_LENGTH)
  advantages: string;

  @Expose()
  @IsString()
  @MinLength(GuitarShopCommentConstantValueEnum.DISADVANTAGES_MIN_LENGTH)
  @MaxLength(GuitarShopCommentConstantValueEnum.DISADVANTAGES_MAX_LENGTH)
  disadvantages: string;

  @Expose()
  @IsString()
  @MinLength(GuitarShopCommentConstantValueEnum.COMMENT_MIN_LENGTH)
  @MaxLength(GuitarShopCommentConstantValueEnum.COMMENT_MAX_LENGTH)
  comment: string;

  @Expose()
  @IsInt()
  @Min(GuitarShopCommentConstantValueEnum.SCORE_MIN_VALUE)
  @Max(GuitarShopCommentConstantValueEnum.SCORE_MAX_VALUE)
  score: number;

}
