import { Document } from 'mongoose';

import { GuitarShopUserInterface, GuitarShopCreateUserDto } from '@guitar-shop/shared-types';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { createSHA256 } from '@guitar-shop/core';


// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GuitarShopUserEntity extends Document { }


@Schema({
  collection: 'users',
  timestamps: true,
})
export class GuitarShopUserEntity implements GuitarShopUserInterface {
  @Prop({
    trim: true,
    required: true,
  })
  username: string;

  @Prop({
    trim: true,
    unique: true,
    required: true,
  })
  email: string;

  @Prop({
    trim: true,
    required: true,
  })
  passwordHash: string;

  @Prop({
    required: true,
  })
  isAdmin: boolean;

  public fillObject(dto: GuitarShopCreateUserDto) {
    const { email, username, isAdmin } = dto;

    this.email = email;
    this.username = username;
    this.isAdmin = isAdmin || false;

    return this;
  }

  public setPasswordHash(password: string, salt: string) {
    this.passwordHash = createSHA256(password, salt);

    return this;
  }

}

export const GuitarShopUserSchema = SchemaFactory.createForClass(GuitarShopUserEntity);
