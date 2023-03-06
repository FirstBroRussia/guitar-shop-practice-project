import { GuitarEnum, GuitarShopProductCardConstantValueEnum, GuitarShopProductCardInterface, GuitarStringsEnum, GuitarStringsType, GuitarType } from '@guitar-shop/shared-types';
import { BadRequestException } from '@nestjs/common';

import { Expose, Transform } from 'class-transformer';
import { IsEnum, IsInt, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';


export class GuitarShopCreateProductCardBffDto implements GuitarShopProductCardInterface {
  @Expose()
  @IsString()
  @MinLength(GuitarShopProductCardConstantValueEnum.TITLE_MIN_LENGTH)
  @MaxLength(GuitarShopProductCardConstantValueEnum.TITLE_MAX_LENGTH)
  title: string;

  @Expose()
  @IsString()
  @MinLength(GuitarShopProductCardConstantValueEnum.DESCRIPTION_MIN_LENGTH)
  @MaxLength(GuitarShopProductCardConstantValueEnum.DESCRIPTION_MAX_LENGTH)
  description: string;

  @Expose()
  @IsEnum(GuitarEnum)
  guitarType: GuitarType;

  @Expose()
  @Transform(({ value }) => {
    const transformValue = +value;
    if (Number.isNaN(transformValue)) {
      throw new BadRequestException('Переданное вами значение количества струн на гитаре не является числом. Передайте корректное значение');
    }

    return transformValue;
  })
  @IsEnum(GuitarStringsEnum)
  guitarStringsCount: GuitarStringsType;

  @Expose()
  @IsString()
  @MinLength(GuitarShopProductCardConstantValueEnum.ARTICLE_MIN_LENGTH)
  @MaxLength(GuitarShopProductCardConstantValueEnum.ARTICLE_MAX_LENGTH)
  article: string;

  @Expose()
  @Transform(({ value }) => {
    const transformValue = +value;
    if (Number.isNaN(transformValue)) {
      throw new BadRequestException('Переданное вами значение стоимости гитары не является числом. Передайте корректное значение');
    }

    return transformValue;
  })
  @IsInt()
  @Min(GuitarShopProductCardConstantValueEnum.PRICE_MIN_LENGTH)
  @Max(GuitarShopProductCardConstantValueEnum.PRICE_MAX_LENGTH)
  price: number;

}
