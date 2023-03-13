import { BadRequestException } from "@nestjs/common";
import { Expose, Transform } from "class-transformer";
import { IsArray, isUUID } from "class-validator";


export class GuitarShopFindProductsInterMicroserviceDto {
  @Expose()
  @Transform(({ obj, value }) => {
    console.log(obj);
    if (!Array.isArray(value)) {
      throw new BadRequestException('Вы передали не массив!');
    }

    value.forEach(item => {
      if (item && !isUUID(item)) {
        throw new BadRequestException('Вы передали некорректное значение. Ожидается UUID в качестве ID карточки товара!');
      }
    });

    return value;
  })
  @IsArray()
  productsIds: string[];

}
