/* eslint-disable @typescript-eslint/ban-types */

import { Expose, Transform } from "class-transformer";
import { isNumber, IsNumber, isUUID, min, Min } from "class-validator";

import { BadRequestException } from "@nestjs/common";

import { GuitarShopOrderInterface, GuitarShopOrderProductItemInterface } from "@guitar-shop/shared-types";


export class GuitarShopCreateOrderBffDto implements GuitarShopOrderInterface {
  @Expose()
  @Transform(({ value }) => {
    if (!Array.isArray(value)) {
      throw new BadRequestException('Переданный вами массив с товарами для оформления заказа не является массивом. Повторите запрос с корректными данными.');
    }

    const productsArray = value as GuitarShopOrderProductItemInterface[];

    const errors = [];

    productsArray.forEach((product) => {
      const { productId, price, count, totalPrice } = product;

      if (!isUUID(productId)) {
        errors.push('Переданный вами ID товара не является форматом UUID.');
      }
      if (!isNumber(price)) {
        errors.push('Переданное вами значение цены товара не является числом.');
      }
      if (!min(price, 0)) {
        errors.push('Переданное вами значение цены товара некорректна.');
      }
      if (!isNumber(count)) {
        errors.push('Переданное вами значение количества товара не является числом.');
      }
      if (!min(count, 0)) {
        errors.push('Переданное вами значение количества товара некорректна.');
      }
      if (!isNumber(totalPrice)) {
        errors.push('Переданное вами значение общей суммы  за товар не является числом.');
      }
      if (!min(totalPrice, 0)) {
        errors.push('Переданное вами значение общей суммы за товар некорректна.');
      }

      const sum = price * count;

      if (totalPrice !== sum) {
        throw new BadRequestException('Переданная вами общая сумма за один вид товара не равна сумме помноженной на соответствующее их количество.');
      }
    });

    if (errors.length > 0) {
      throw new BadRequestException(errors.join(';\n'));
    }

    return productsArray;
  })
  products: GuitarShopOrderProductItemInterface[];

  @Expose()
  @Transform(({ obj, value }) => {
    const transformValue = +value;

    if (Number.isNaN(transformValue)) {
      throw new BadRequestException('Передано некорректное значение количества товаров.');
    }

    let sum = 0;

    (obj.products as GuitarShopOrderProductItemInterface[]).forEach((product) => {
      sum += product.count;
    });

    if (sum !== transformValue) {
      throw new BadRequestException('Передано некорректное значение количество товаров. Оно не соответствует переданному количеству товаров в заказе.');
    }

    return transformValue;
  })
  @IsNumber()
  @Min(0)
  totalCount: number;

  @Expose()
  @Transform(({ obj, value }) => {
    const transformValue = +value;

    if (Number.isNaN(transformValue)) {
      throw new BadRequestException('Передано некорректное значение общей суммы за товары. Оно не является числом!');
    }

    let sum = 0;

    (obj.products as GuitarShopOrderProductItemInterface[]).forEach((product) => {
      sum += product.totalPrice;
    });

    if (sum !== transformValue) {
      throw new BadRequestException('Передано некорректное значение общей суммы товаров. Оно не соответствует переданному значению общей суммы товаров.');
    }

    return transformValue;
  })
  @IsNumber()
  @Min(0)
  totalPrice: number;

}
