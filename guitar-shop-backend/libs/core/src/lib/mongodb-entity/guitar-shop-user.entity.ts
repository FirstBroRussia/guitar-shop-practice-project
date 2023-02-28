import { hashSync } from 'bcrypt';
import { Document } from 'mongoose';

import { GuitarShopUserInterface, CreateGuitarShopUserDto } from '@guitar-shop/shared-types';

import { modelOptions, prop, getModelForClass,  } from '@typegoose/typegoose';


// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GuitarShopUserMongoDbEntity extends Document { }


@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  },
})
export class GuitarShopUserMongoDbEntity implements GuitarShopUserInterface {
  @prop({
    trim: true,
    required: true,
  })
  username: string;

  @prop({
    trim: true,
    unique: true,
    required: true,
  })
  email: string;

  @prop({
    trim: true,
    required: true,
  })
  passwordHash: string;

  @prop({
    required: true,
  })
  isAdmin: boolean;

  public fillObject(dto: CreateGuitarShopUserDto) {
    const { email, username, isAdmin } = dto;

    this.email = email;
    this.username = username;
    this.isAdmin = isAdmin || false;

  }

  public setPassword(password: string, salt: string) {
    this.passwordHash = hashSync(password, salt);

    return this;
  }

}

export const GuitarShopUserMongoDbModel = getModelForClass(GuitarShopUserMongoDbEntity);
