import { Document } from 'mongoose';

import { GuitarShopCommentInterface, GuitarShopCreateCommentDto } from '@guitar-shop/shared-types';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GuitarShopCommentEntity extends Document { }


@Schema({
  collection: 'comments',
  timestamps: true,
})
export class GuitarShopCommentEntity implements GuitarShopCommentInterface {
  @Prop({
    trim: true,
    required: true,
  })
  creatorUserId?: string;

  @Prop({
    trim: true,
    required: true,
  })
  productId: string;

  @Prop({
    trim: true,
    required: true,
  })
  advantages?: string;

  @Prop({
    trim: true,
    required: true,
  })
  disadvantages?: string;

  @Prop({
    trim: true,
    required: true,
  })
  comment?: string;

  @Prop({
    trim: true,
    required: true,
  })
  score?: number;


  public fillObject(dto: GuitarShopCreateCommentDto) {
    const { creatorUserId, productId, comment, advantages, disadvantages, score } = dto;

    this.creatorUserId = creatorUserId;
    this.productId = productId;
    this.comment = comment;
    this.advantages = advantages;
    this.disadvantages = disadvantages;
    this.score = score;

    return this;
  }

}

export const GuitarShopCommentSchema = SchemaFactory.createForClass(GuitarShopCommentEntity);

