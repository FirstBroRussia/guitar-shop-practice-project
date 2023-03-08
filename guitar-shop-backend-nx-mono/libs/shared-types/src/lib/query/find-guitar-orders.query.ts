import { ConstantValue, GuitarShopSortEnum, GuitarShopQueryOrderSortFieldType } from "@guitar-shop/shared-types";
import { BadRequestException } from "@nestjs/common";
import { Expose, Transform } from "class-transformer";
import { IsObject } from "class-validator";

export class FindGuitarOrdersQuery {
  @Expose()
  @Transform(({ value }) => {
    const transformValue = +value;

    if (value && Number.isNaN(transformValue)) {
      throw new BadRequestException('Переданное пагинационное значение не является числом. Передайте корректное значение');
    }
    if (!value || transformValue <= 0) {
      return ConstantValue.ONE_VALUE;
    }

    return transformValue;
  })
  page: number;

  @Expose()
  @Transform(({ value }) => {
    const transformValueInArr = String(value).split(',');

    const dateSort = [];
    const priceSort = [];

    for (const item of transformValueInArr) {
      switch (item) {
        case GuitarShopSortEnum.DateDesc: {
          dateSort.push(-1);

          continue;
        }
        case GuitarShopSortEnum.DateAsc: {
          dateSort.push(1);

          continue;
        }
        case GuitarShopSortEnum.PriceDesc: {
          priceSort.push(-1);

          continue;
        }
        case GuitarShopSortEnum.PriceAsc: {
          priceSort.push(1);

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

    if (dateSort.length > 0 && priceSort.length > 0) {
      throw new BadRequestException('Вы не можете одновременно отсортировать по двум критериям. Выберите один критерий и повторите попытку.');
    }

    return {
      dateSort: priceSort.length > 0 ? null : (dateSort[0] || -1),
      priceSort: priceSort[0] || null,
    } as GuitarShopQueryOrderSortFieldType;
  })
  @IsObject()
  sort: GuitarShopQueryOrderSortFieldType;

}
