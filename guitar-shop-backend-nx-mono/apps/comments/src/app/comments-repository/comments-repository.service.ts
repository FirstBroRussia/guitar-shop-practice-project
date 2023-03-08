import { FindGuitarCommentsQuery, GuitarShopCommentsConstantValue, GuitarShopCreateCommentDto } from '@guitar-shop/shared-types';
import { Injectable, Logger, LoggerService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { GuitarShopCommentEntity } from './entity/guitar-shop-comment.entity';

@Injectable()
export class CommentsRepositoryService {
  private readonly logger: LoggerService = new Logger(CommentsRepositoryService.name);

  constructor (
    @InjectModel(GuitarShopCommentEntity.name) private readonly commentsModel: Model<GuitarShopCommentEntity>,
  ) { }


  public async createComment(dto: GuitarShopCreateCommentDto): Promise<GuitarShopCommentEntity> {
    const newComment = new GuitarShopCommentEntity().fillObject(dto);
    const newCommentModel = new this.commentsModel(newComment);

    const result =  await newCommentModel.save();
    this.logger.log('Создан новый комментарий.');

    return result;
  }

  public async findCommentsByProductId(productId: string, query: FindGuitarCommentsQuery): Promise<[GuitarShopCommentEntity[], number]> {
    const { page } = query;

    const comments = await this.commentsModel.find(
      { productId: productId },
      null,
      {
        limit: GuitarShopCommentsConstantValue.DEFAULT_COMMENTS_LIMIT,
        skip: GuitarShopCommentsConstantValue.DEFAULT_COMMENTS_LIMIT * (page - 1),
        sort: { createdAt: -1 },
      })
      .exec();

    const count = await this.commentsModel.count({ productId: productId });

    return [comments, count];
  }

}
