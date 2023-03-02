import { FindGuitarProductCardsQuery, GuitarProductCardConstantValueEnum, GuitarShopCreateProductCardDto } from '@guitar-shop/shared-types';
import { Injectable, Logger, LoggerService, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import GuitarShopProductCardEntity from './entity/guitar-shop-product-card.entity';

@Injectable()
export class ProductsService {
  private readonly logger: LoggerService = new Logger(ProductsService.name);

  constructor (
    @InjectRepository(GuitarShopProductCardEntity) private readonly productCardRepository: Repository<GuitarShopProductCardEntity>,
  ) { }


  public async createProductCard(dto: GuitarShopCreateProductCardDto): Promise<GuitarShopProductCardEntity> {
    const newProductCard = new GuitarShopProductCardEntity().fillObject(dto);
    console.log(newProductCard);

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
      take: GuitarProductCardConstantValueEnum.DEFAULT_PRODUCT_CARD_LIMIT * page,
      order: {
        createdAt: {
          direction: dateSort,
        },
      },
    };

    if (priceSort) {
      options.order.price = { direction: priceSort, };
    }
    if (ratingSort) {
      options.order.rating = { direction: ratingSort, };
    }
    if (strings) {
      options.where = {
        guitarStringsCount: strings,
      };
    }
    if (type) {
      options.where = {
        guitarType: type,
      };
    }

    return await this.productCardRepository.findAndCount(options);
  }

  public async findProductCardById(productId: string): Promise<GuitarShopProductCardEntity> {
    return await this.productCardRepository.findOneBy({
      id: productId,
    });
  }

}
