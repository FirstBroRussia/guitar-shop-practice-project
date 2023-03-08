import { ConstantValue, GuitarEnum, GuitarShopSortEnum, GuitarShopQueryProductSortFieldType, GuitarStringsEnum, GuitarStringsType, GuitarType } from "@guitar-shop/shared-types";
import { BadRequestException } from "@nestjs/common";
import { Expose, Transform } from "class-transformer";
import { isEnum, IsInt, IsObject } from "class-validator";

export class FindGuitarProductCardsQuery {
  @Expose()
  @Transform(({ value }) => {
    const transformValue = (+value);

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
  @Transform(({ value })=> {
    if (value && !isEnum(value, GuitarEnum)) {
      throw new BadRequestException('Переданное значение типа гитары не соответствует ни одному из возможных значений. Повторите попытку с корректным значением');
    }
    if (!value) {
      return null;
    }

    return value;
  })
  type: GuitarType;

  @Expose()
  @Transform(({ value })=> {
    if (value && !isEnum(+value, GuitarStringsEnum)) {
      throw new BadRequestException('Переданное значение количества струн на гитаре не соответствует ни одному из возможных значений. Повторите попытку с корректным значением');
    }
    if (!value) {
      return null;
    }

    return +value;
  })
  strings: GuitarStringsType;

  @Expose()
  @Transform(({ value }) => {
    const transformValueInArr = String(value).split(',');

    const dateSort = [];
    const priceSort = [];
    const ratingSort = [];

    for (const item of transformValueInArr) {
      switch (item) {
        case GuitarShopSortEnum.DateDesc: {
          dateSort.push('desc');

          continue;
        }
        case GuitarShopSortEnum.DateAsc: {
          dateSort.push('asc');

          continue;
        }
        case GuitarShopSortEnum.PriceDesc: {
          priceSort.push('desc');

          continue;
        }
        case GuitarShopSortEnum.PriceAsc: {
          priceSort.push('asc');

          continue;
        }
        case GuitarShopSortEnum.RatingDesc: {
          ratingSort.push('desc');

          continue;
        }
        case GuitarShopSortEnum.RatingAsc: {
          ratingSort.push('asc');

          continue;
        }
        default: continue
      }
    }

    if (dateSort.length > 1) {
      throw new BadRequestException('Возможно выбрать только один вид сортировки по дате добавления');
    }
    if (priceSort.length > 1) {
      throw new BadRequestException('Возможно выбрать только один вид сортировки по стоимости товара');
    }
    if (ratingSort.length > 1) {
      throw new BadRequestException('Возможно выбрать только один вид сортировки по рейтингу товара');
    }

    return {
      dateSort: dateSort[0] || 'desc',
      priceSort: priceSort[0] || null,
      ratingSort: ratingSort[0] || null,
    } as GuitarShopQueryProductSortFieldType;
  })
  @IsObject()
  sort: GuitarShopQueryProductSortFieldType;

}
