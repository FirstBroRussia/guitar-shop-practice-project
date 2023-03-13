import { ConstantValue, GuitarEnum, GuitarShopSortEnum, GuitarShopQueryProductSortFieldType, GuitarStringsEnum, GuitarStringsType, GuitarType } from "@guitar-shop/shared-types";
import { BadRequestException } from "@nestjs/common";
import { Expose, Transform } from "class-transformer";
import { isEnum, IsInt, IsObject } from "class-validator";

export class FindGuitarProductCardsQuery {
  @Expose()
  @Transform(({ value }) => {
    const transformValue = +value;

    if (transformValue && Number.isNaN(transformValue)) {
      throw new BadRequestException('Переданное пагинационное значение не является числом');
    }
    if (!transformValue || transformValue <= 0) {
      return ConstantValue.ONE_VALUE;
    }

    return transformValue;
  })
  @IsInt()
  page: number;

  @Expose()
  @Transform(({ value }) => {
    if (!value) {
      return null;
    }

    const transformValueInArr = String(value).split(',');

    transformValueInArr.forEach(item => {
      if (item && !isEnum(item, GuitarEnum)) {
        throw new BadRequestException('Переданное значение типа гитары не соответствует ни одному из возможных значений. Повторите попытку с корректным значением');
      }
    });

    return transformValueInArr;
  })
  type: GuitarType[] | null;

  @Expose()
  @Transform(({ value }) => {
    if (!value) {
      return null;
    }

    let transformValueInArr = String(value).split(',') as any[];

    transformValueInArr = transformValueInArr.map(item => {
      const transformItem = +item;

      if (transformItem && !isEnum(transformItem, GuitarStringsEnum)) {
        throw new BadRequestException('Переданное значение количества струн на гитаре не соответствует ни одному из возможных значений. Повторите попытку с корректным значением');
      }

      return transformItem;
    });


    return transformValueInArr as number[];
  })
  strings: GuitarStringsType[] | null;

  @Expose()
  @Transform(({ value }) => {
    const transformValueInArr = String(value).split(',');

    if (transformValueInArr.length > 1) {
      throw new BadRequestException('Одновременно возможно выбрать только один вид сортировки. Повторите запрос.');
    }

    switch (transformValueInArr[0]) {
      case GuitarShopSortEnum.DateDesc: {
        return {
          dateSort: 'desc',
        }
      }
      case GuitarShopSortEnum.DateAsc: {
        return {
          dateSort: 'asc',
        }
      }
      case GuitarShopSortEnum.PriceDesc: {
        return {
          priceSort: 'desc',
        }
      }
      case GuitarShopSortEnum.PriceAsc: {
        return {
          priceSort: 'asc',
        }
      }
      case GuitarShopSortEnum.RatingDesc: {
        return {
          ratingSort: 'desc',
        }
      }
      case GuitarShopSortEnum.RatingAsc: {
        return {
          ratingSort: 'asc',
        }
      }
      default: return {
        dateSort: 'desc',
      };
    }

  })
  @IsObject()
  sort: GuitarShopQueryProductSortFieldType;

}
