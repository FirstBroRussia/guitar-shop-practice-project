import axios from 'axios';
import { Body, Controller, Get, HttpCode, HttpStatus, Logger, LoggerService, Param, ParseUUIDPipe, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { FindGuitarCommentsQuery, GuitarShopCommentRdo, GuitarShopCreateCommentBffDto, GuitarShopCreateCommentDto, JwtPayloadDto, TransformAndValidateDtoInterceptor, TransformAndValidateQueryInterceptor } from '@guitar-shop/shared-types';

import { JwtAuthUsersGuard } from '../../assets/guard/jwt-auth-users.guard';
import { BffEnvInterface } from '../../assets/interface/bff-env.interface';


@Controller('comments')
export class CommentsController {
  private readonly logger: LoggerService = new Logger(CommentsController.name);

  private readonly commentsMicroserviceUrl: string;

  constructor(
    private readonly config: ConfigService<BffEnvInterface>,
  ) {
    this.commentsMicroserviceUrl = `http://${config.get("COMMENTS_MICROSERVICE_HOST")}:${config.get("COMMENTS_MICROSERVICE_PORT")}`;
  }


  @Post('/')
  @UseInterceptors(new TransformAndValidateDtoInterceptor(GuitarShopCreateCommentBffDto))
  @UseGuards(JwtAuthUsersGuard)
  @HttpCode(HttpStatus.CREATED)
  async createComment(@Req() req: Request & { user: JwtPayloadDto, }, @Body() dto: GuitarShopCreateCommentBffDto): Promise<GuitarShopCommentRdo> {
    const { id } = req.user;

    const dtoToCommentsMicroservice: GuitarShopCreateCommentDto = {
      creatorUserId: id,
      ...dto,
    };

    return (await axios.post(`${this.commentsMicroserviceUrl}${req.url}`, dtoToCommentsMicroservice)).data as GuitarShopCommentRdo;
  }

  @Get('/:productId')
  @UseInterceptors(new TransformAndValidateQueryInterceptor(FindGuitarCommentsQuery))
  @HttpCode(HttpStatus.OK)
  async findCommentsByProductId(@Req() req: Request & { user: JwtPayloadDto, }, @Param('productId', ParseUUIDPipe) _productId: string): Promise<[GuitarShopCommentRdo | GuitarShopCommentRdo[], number]> {
    return (await axios.get(`${this.commentsMicroserviceUrl}${req.url}`)).data as [GuitarShopCommentRdo | GuitarShopCommentRdo[], number];
  }

}
