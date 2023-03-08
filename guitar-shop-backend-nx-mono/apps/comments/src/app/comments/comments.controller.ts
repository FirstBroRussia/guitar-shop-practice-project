import { fillDTO } from '@guitar-shop/core';
import { FindGuitarCommentsQuery, GuitarShopCommentRdo, GuitarShopCreateCommentDto, TransformAndValidateDtoInterceptor, TransformAndValidateQueryInterceptor } from '@guitar-shop/shared-types';
import { Body, Controller, Get, HttpCode, HttpStatus, Logger, LoggerService, Param, ParseUUIDPipe, Post, Query, UseInterceptors } from '@nestjs/common';
import { CommentsRepositoryService } from '../comments-repository/comments-repository.service';

@Controller('comments')
export class CommentsController {
  private readonly logger: LoggerService = new Logger(CommentsController.name);

  constructor (
    private readonly commentsRepository: CommentsRepositoryService,
  ) { }


  @Post('/')
  @UseInterceptors(new TransformAndValidateDtoInterceptor(GuitarShopCreateCommentDto))
  @HttpCode(HttpStatus.CREATED)
  async createComment(@Body() dto: GuitarShopCreateCommentDto): Promise<GuitarShopCommentRdo> {
    return fillDTO(GuitarShopCommentRdo, await this.commentsRepository.createComment(dto));
  }

  @Get('/:productId')
  @UseInterceptors(new TransformAndValidateQueryInterceptor(FindGuitarCommentsQuery))
  @HttpCode(HttpStatus.OK)
  async findCommentsByProductId(@Param('productId', ParseUUIDPipe) productId: string, @Query() query: FindGuitarCommentsQuery): Promise<[GuitarShopCommentRdo| GuitarShopCommentRdo[], number]> {
    const [comments, count] = await this.commentsRepository.findCommentsByProductId(productId, query);

    return [fillDTO(GuitarShopCommentRdo, comments), count];
  }

}
