import axios from 'axios';
import { Body, Controller, Get, HttpCode, HttpStatus, Logger, LoggerService, Param, ParseUUIDPipe, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ConstantValue, FindGuitarCommentsQuery, GuitarShopCommentBffRdo, GuitarShopCommentRdo, GuitarShopCreateCommentBffDto, GuitarShopCreateCommentDto, GuitarShopUpdateRatingAndCommentsCountProductCardDto, GuitarShopUserRdo, GuitarShopUsersCommentsInterMicroserviceDto, JwtPayloadDto, TransformAndValidateDtoInterceptor, TransformAndValidateQueryInterceptor } from '@guitar-shop/shared-types';

import { JwtAuthUsersGuard } from '../../assets/guard/jwt-auth-users.guard';
import { BffEnvInterface } from '../../assets/interface/bff-env.interface';


@Controller('comments')
export class CommentsController {
  private readonly logger: LoggerService = new Logger(CommentsController.name);

  private readonly usersMicroserviceUrl: string;
  private readonly productsMicroserviceUrl: string;
  private readonly commentsMicroserviceUrl: string;

  constructor(
    private readonly config: ConfigService<BffEnvInterface>,
  ) {
    this.usersMicroserviceUrl = `http://${config.get("USERS_MICROSERVICE_HOST")}:${config.get("USERS_MICROSERVICE_PORT")}`;
    this.productsMicroserviceUrl = `http://${config.get("PRODUCTS_MICROSERVICE_HOST")}:${config.get("PRODUCTS_MICROSERVICE_PORT")}`;
    this.commentsMicroserviceUrl = `http://${config.get("COMMENTS_MICROSERVICE_HOST")}:${config.get("COMMENTS_MICROSERVICE_PORT")}`;
  }


  @Post('/')
  @UseInterceptors(new TransformAndValidateDtoInterceptor(GuitarShopCreateCommentBffDto))
  @UseGuards(JwtAuthUsersGuard)
  @HttpCode(HttpStatus.CREATED)
  async createComment(@Req() req: Request & { user: JwtPayloadDto, }, @Body() dto: GuitarShopCreateCommentBffDto): Promise<GuitarShopCommentBffRdo> {
    const { id } = req.user;

    const dtoToCommentsMicroservice: GuitarShopCreateCommentDto = {
      creatorUserId: id,
      ...dto,
    };

    const newComment = (await axios.post(`${this.commentsMicroserviceUrl}${req.url}`, dtoToCommentsMicroservice)).data as GuitarShopCommentRdo;

    const dtoToProductsMicroservice: GuitarShopUpdateRatingAndCommentsCountProductCardDto = {
      score: newComment.score,
    };

    await axios.patch(`${this.productsMicroserviceUrl}/api/products/updateratingandinccommentscount/${newComment.productId}`, dtoToProductsMicroservice);

    const dtoToUsersCommentsInterMicroservice: GuitarShopUsersCommentsInterMicroserviceDto = {
      creatorUserIds: [id],
      interMicroserviceSecret: this.config.get('INTER_SERVICE_SECRET'),
    };

    const user = (await axios.post(`${this.usersMicroserviceUrl}/api/users/usersforcomments`, dtoToUsersCommentsInterMicroservice)).data as GuitarShopUserRdo[];

    const transformNewComment: GuitarShopCommentBffRdo  = {
      ...newComment,
      username: user[0].username,
    };


    return transformNewComment;
  }

  @Get('/:productId')
  @UseInterceptors(new TransformAndValidateQueryInterceptor(FindGuitarCommentsQuery))
  @HttpCode(HttpStatus.OK)
  async findCommentsByProductId(@Req() req: Request & { user: JwtPayloadDto, }, @Param('productId', ParseUUIDPipe) _productId: string): Promise<[GuitarShopCommentBffRdo[], number]> {
    const [comments, count] = (await axios.get(`${this.commentsMicroserviceUrl}${req.url}`)).data as [GuitarShopCommentRdo[], number];

    if (count === ConstantValue.ZERO_VALUE) {
      return [[], 0];
    }

    const creatorUserIds = [];
    comments.forEach(item => creatorUserIds.push(item.creatorUserId));

    const dto: GuitarShopUsersCommentsInterMicroserviceDto = {
      creatorUserIds: creatorUserIds,
      interMicroserviceSecret: this.config.get('INTER_SERVICE_SECRET'),
    };

    const users = (await axios.post(`${this.usersMicroserviceUrl}/api/users/usersforcomments`, dto)).data as GuitarShopUserRdo[];

    const transformComments = comments.map((item) => {
      const creatorUserId = item.creatorUserId;

      const transformItem = {
        ...item,
        username: users.find(item => item.id === creatorUserId).username,
      };

      delete transformItem.creatorUserId;

      return transformItem;
    }) as unknown as GuitarShopCommentBffRdo[];


    return [transformComments, count];
  }

}
