import { BadRequestException } from "@nestjs/common";
import { Expose, Transform } from "class-transformer";
import { IsArray, isMongoId, IsString } from "class-validator";

export class GuitarShopUsersCommentsInterMicroserviceDto {
  @Expose()
  @Transform(({ value }) => {
    if (!Array.isArray(value)) {
      throw new BadRequestException('Некорректные данные, ожидался массив!');
    }

    value.forEach(item => {
      if (item && !isMongoId(item)) {
        throw new BadRequestException('Переданный ID пользователя не является MongoID!!!');
      }
    })

    return value;
  })
  @IsArray()
  creatorUserIds: string[];

  @Expose()
  @IsString()
  interMicroserviceSecret: string;

}
