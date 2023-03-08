import { Request } from 'express';
import { CallHandler, ExecutionContext, Injectable, Logger, LoggerService, NestInterceptor, BadRequestException } from "@nestjs/common";
import { ClassConstructor } from "class-transformer";
import { validate } from "class-validator";

import { fillDTO } from '@guitar-shop/core';

type InterceptorOptionsType = {
  isControllerUpdateMethod: boolean,
};

@Injectable()
export class TransformAndValidateDtoInterceptor implements NestInterceptor {
  private readonly logger: LoggerService = new Logger(TransformAndValidateDtoInterceptor.name);

  constructor (
    private readonly classConstructor: ClassConstructor<any>,
    private readonly options?: InterceptorOptionsType,
  ) { }

  async intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest<Request>();

    const transformDto = fillDTO(this.classConstructor, req.body);

    let errors;

    if (this.options && this.options.isControllerUpdateMethod) {
      errors = await validate(transformDto, {
        skipMissingProperties: true,
      });
    } else {
      errors = await validate(transformDto);
    }

    if (errors.length > 0) {
      throw new BadRequestException(errors.toString());
    }

    req.body = transformDto;


    return next.handle();
  }
}

