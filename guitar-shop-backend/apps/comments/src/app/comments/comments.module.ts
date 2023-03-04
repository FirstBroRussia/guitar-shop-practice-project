import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsRepositoryService } from '../comments-repository/comments-repository.service';
import { GuitarShopCommentEntity, GuitarShopCommentSchema } from '../comments-repository/entity/guitar-shop-comment.entity';
import { CommentsController } from './comments.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GuitarShopCommentEntity.name, schema: GuitarShopCommentSchema, },
    ]),
  ],
  controllers: [CommentsController],
  providers: [CommentsRepositoryService],
})
export class CommentsModule {}
