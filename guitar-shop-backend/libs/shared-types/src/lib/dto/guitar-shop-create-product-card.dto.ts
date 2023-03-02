import { GuitarEnum, GuitarShopProductCardConstantValueEnum, GuitarShopProductCardInterface, GuitarStringsEnum, GuitarStringsType, GuitarType } from '@guitar-shop/shared-types';

import { Expose } from 'class-transformer';
import { IsEnum, IsInt, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';


export class GuitarShopCreateProductCardDto implements GuitarShopProductCardInterface {
  @Expose()
  @IsString()
  @MinLength(GuitarShopProductCardConstantValueEnum.TITLE_MIN_LENGTH)
  @MaxLength(GuitarShopProductCardConstantValueEnum.TITLE_MAX_LENGTH)
  title?: string;

  @Expose()
  @IsString()
  @MinLength(GuitarShopProductCardConstantValueEnum.DESCRIPTION_MIN_LENGTH)
  @MaxLength(GuitarShopProductCardConstantValueEnum.DESCRIPTION_MAX_LENGTH)
  description?: string;

  @Expose()
  @IsString()
  imageLink?: string;

  @Expose()
  @IsEnum(GuitarEnum)
  guitarType: GuitarType;

  @Expose()
  @IsString()
  @MinLength(GuitarShopProductCardConstantValueEnum.ARTICLE_MIN_LENGTH)
  @MaxLength(GuitarShopProductCardConstantValueEnum.ARTICLE_MAX_LENGTH)
  article?: string;

  @Expose()
  @IsEnum(GuitarStringsEnum)
  guitarStringsCount?: GuitarStringsType;

  @Expose()
  @IsInt()
  @Min(GuitarShopProductCardConstantValueEnum.PRICE_MIN_LENGTH)
  @Max(GuitarShopProductCardConstantValueEnum.PRICE_MAX_LENGTH)
  price?: number;

}
