import { TypeOrmBase } from '@guitar-shop/core';
import { CreateGuitarShopProductCardDto, GuitarShopProductCardInterface, GuitarStringsType, GuitarType } from '@guitar-shop/shared-types';

import { Column } from 'typeorm';

export default class GuitarShopProductCardTypeOrmEntity extends TypeOrmBase implements GuitarShopProductCardInterface {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    default: '',
  })
  imageLink: string;

  @Column()
  guitarType: GuitarType;

  @Column()
  article: string;

  @Column()
  guitarStringsCount: GuitarStringsType;

  @Column({
    default: 0,
  })
  rating: number;

  @Column()
  price: number;

  @Column({
    default: 0,
  })
  feedbackCount: number;

  public fillObject(dto: CreateGuitarShopProductCardDto): this {
    const { title, description, guitarType, article, guitarStringsCount, price, imageLink } = dto;

    this.title = title;
    this.description = description;
    this.guitarType = guitarType;
    this.article = article;
    this.guitarStringsCount = guitarStringsCount;
    this.price = price;
    this.imageLink = imageLink;

    return this;
  }

}
