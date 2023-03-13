import { getNewRatingForProductCard } from '@guitar-shop/core';
import { FindGuitarProductCardsQuery, GuitarProductCardConstantValueEnum, GuitarShopCreateProductCardDto, GuitarShopFindProductsInterMicroserviceDto, GuitarShopUpdateRatingAndCommentsCountProductCardDto } from '@guitar-shop/shared-types';
import { Injectable, Logger, LoggerService, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, In, Not, Repository } from 'typeorm';
import GuitarShopProductCardEntity from './entity/guitar-shop-product-card.entity';

@Injectable()
export class ProductsService {
  private readonly logger: LoggerService = new Logger(ProductsService.name);

  constructor (
    @InjectRepository(GuitarShopProductCardEntity) private readonly productCardRepository: Repository<GuitarShopProductCardEntity>,
  ) { }


  public async createProductCard(dto: GuitarShopCreateProductCardDto): Promise<GuitarShopProductCardEntity> {
    const newProductCard = new GuitarShopProductCardEntity().fillObject(dto);

    const result = await this.productCardRepository.save(newProductCard);
    this.logger.log(`Новый товар создан.`);

    return result;
  }

  public async updateProductCard(productId: string, dto: GuitarShopCreateProductCardDto): Promise<GuitarShopProductCardEntity> {
    const existProductCard = await this.findProductCardById(productId);

    if (!existProductCard) {
      throw new NotFoundException(`Товара с данным ID: ${productId} не найдено.`);
    }

    await this.productCardRepository.update({
      id: productId
    }, {
      ...dto,
    });

    const result = await this.findProductCardById(productId);
    this.logger.log(`Товар с ID: ${productId} обновлён.`);

    return result;
  }

  public async updateRatingAndIncCommentsCountByProductId(productId: string, dto: GuitarShopUpdateRatingAndCommentsCountProductCardDto): Promise<void> {
    const existProductCard = await this.findProductCardById(productId);

    if (!existProductCard) {
      throw new NotFoundException(`Товара с данным ID: ${productId} не найдено.`);
    }

    const { rating, commentsCount } = existProductCard;
    const { score } = dto;

    const newRating = getNewRatingForProductCard(rating, commentsCount, score);

    await this.productCardRepository.update({
      id: productId
    }, {
      commentsCount: existProductCard.commentsCount + 1,
      rating: newRating,
    });
    this.logger.log(`У товара с ID: ${productId} обновлено количество комментариев и рейтинг.`);
  }

  public async deleteProductCard(productId: string): Promise<void> {
    const existProductCard = await this.findProductCardById(productId);

    if (!existProductCard) {
      throw new NotFoundException(`Товара с данным ID: ${productId} не найдено.`);
    }

    await this.productCardRepository.delete({
      id: productId,
    });
    this.logger.log(`Товар с ID: ${productId} удалён.`);
  }

  public async findProductCards(query: FindGuitarProductCardsQuery): Promise<[GuitarShopProductCardEntity[], number]> {
    const { page, strings, type, sort } = query;
    const { dateSort, priceSort, ratingSort } = sort;

    const options: FindManyOptions<GuitarShopProductCardEntity> = {
      skip: GuitarProductCardConstantValueEnum.DEFAULT_PRODUCT_CARD_LIMIT * (page - 1),
      take: GuitarProductCardConstantValueEnum.DEFAULT_PRODUCT_CARD_LIMIT,
    };

    if (dateSort) {
      options.order = {
        createdAt: { direction: dateSort, },
      };
    } else if (priceSort) {
      options.order = {
        price: { direction: priceSort, },
      };
    } else if (ratingSort) {
      options.order = {
        rating: { direction: ratingSort, },
      };
    }

    if (strings) {
      options.where = {
        ...options.where,
        guitarStringsCount: In(strings),
      };
    } else {
      return [[], 0];
    }
    if (type) {
      options.where = {
        ...options.where,
        guitarType: In(type),
      };
    } else {
      return [[], 0];
    }

    return await this.productCardRepository.findAndCount(options);
  }

  public async findProductCardByProductIds(dto: GuitarShopFindProductsInterMicroserviceDto): Promise<GuitarShopProductCardEntity[]> {
    const { productsIds } = dto;

    return await this.productCardRepository.find({
      where: {
        id: In(productsIds),
      },
    });
  }

  public async findProductCardById(productId: string): Promise<GuitarShopProductCardEntity> {
    return await this.productCardRepository.findOneBy({
      id: productId,
    });
  }

}
