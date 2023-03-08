import { JwtPayloadDto } from "@guitar-shop/shared-types";
import { BadRequestException, CanActivate, ExecutionContext, Injectable, InternalServerErrorException, Logger, LoggerService } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';

import { Request } from 'express';
import axios, { AxiosError } from "axios";
import { BffEnvInterface } from "../interface/bff-env.interface";

@Injectable()
export class JwtAuthUsersGuard implements CanActivate {
  private readonly logger: LoggerService = new Logger(JwtAuthUsersGuard.name);

  private readonly usersMicroserviceUrl: string;

  constructor(
    private readonly config: ConfigService<BffEnvInterface>,
  ) {
    this.usersMicroserviceUrl = `http://${config.get("USERS_MICROSERVICE_HOST")}:${config.get("USERS_MICROSERVICE_PORT")}`;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request & { user: JwtPayloadDto }>();
    const accessToken = req.headers.authorization?.split(' ')[1];

    const jwtPayload: JwtPayloadDto = (await axios.get(`${this.usersMicroserviceUrl}/api/auth/checktoken`, {
      headers: { Authorization: `Bearer ${accessToken || ''}`, }
    })).data;

    req.user = jwtPayload;


    return true;
  }
}

