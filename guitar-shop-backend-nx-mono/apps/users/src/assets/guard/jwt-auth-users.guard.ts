import { JwtPayloadDto } from "@guitar-shop/shared-types";
import { Injectable, Logger, LoggerService, CanActivate, BadRequestException, UnauthorizedException } from "@nestjs/common";
import { ExecutionContext } from "@nestjs/common/interfaces";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import e, { Request } from "express";
import { UsersRepositoryService } from "../../app/users-repository/users-repository.service";

@Injectable()
export class JwtAuthUsersGuard implements CanActivate {
  private readonly logger: LoggerService = new Logger(JwtAuthUsersGuard.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepositoryService,
    private readonly reflector: Reflector,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request & { user: JwtPayloadDto }>();
    const accessToken = req.headers.authorization?.split(' ')[1];

    const existLogoutedUser = await this.usersRepository.findLogoutedUser(accessToken);

    if (existLogoutedUser) {
      throw new BadRequestException('Ваш токен доступа уже вышел из системы, прошу вас заново пройти аутентификацию.');
    }

    const jwtPayload: JwtPayloadDto = await this.jwtService.verifyAsync(accessToken)
    .catch((err) => {
      throw new UnauthorizedException((err as Error).message);
    });
    req.user = jwtPayload;


    return true;
  }
}
