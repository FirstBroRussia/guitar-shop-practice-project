import { TypeOrmBase } from '@guitar-shop/core';
import { GuitarEnum, GuitarShopCreateProductCardDto, GuitarShopProductCardInterface, GuitarStringsEnum, GuitarStringsType, GuitarType } from '@guitar-shop/shared-types';

import { Entity, Column } from 'typeorm';


@Entity('products')
export default class GuitarShopProductCardEntity extends TypeOrmBase implements GuitarShopProductCardInterface {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    default: '',
  })
  imageLink: string;

  @Column({
    type: "enum",
    enum: GuitarEnum,
  })
  guitarType: GuitarType;

  @Column()
  article: string;

  @Column({
    type: "enum",
    enum: GuitarStringsEnum,
  })
  guitarStringsCount: GuitarStringsType;

  @Column({
    default: 0,
  })
  rating: number;

  @Column()
  price: number;

  // @Column({
  //   default: 0,
  // })
  // feedbackCount: number;

  public fillObject(dto: GuitarShopCreateProductCardDto): this {
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
