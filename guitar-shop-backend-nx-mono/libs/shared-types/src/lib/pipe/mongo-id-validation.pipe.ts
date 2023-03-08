import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { Types } from "mongoose";

const BAD_MONGOID_ERROR = 'Вы передали невалидный MongoID';


@Injectable()
export class MongoIdValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param') {
      throw new Error('В данном пайпе проверяются только параметры!');
    }

    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(BAD_MONGOID_ERROR);
    }

    return value;
  }
}
