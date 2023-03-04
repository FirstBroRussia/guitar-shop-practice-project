import { BadRequestException } from "@nestjs/common";
import { Expose, Transform } from "class-transformer";
import { ConstantValue } from "../enum/constant-value.enum";

export class FindGuitarCommentsQuery {
  @Expose()
  @Transform(({ value }) => {
    const transformValue = +value;
    if (Number.isNaN(transformValue)) {
      throw new BadRequestException('Переданное пагинационное значение не является числом. Передайте корректное значение');
    }
    if (!value || transformValue <= 0) {
      return ConstantValue.ONE_VALUE;
    }

    return transformValue;
  })
  page: number;

}
