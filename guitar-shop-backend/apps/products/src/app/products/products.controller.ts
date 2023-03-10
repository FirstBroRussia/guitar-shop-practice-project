import { fillDTO } from '@guitar-shop/core';
import { FindGuitarProductCardsQuery, GuitarShopCreateProductCardDto, GuitarShopProductCardRdo, TransformAndValidateDtoInterceptor, TransformAndValidateQueryInterceptor } from '@guitar-shop/shared-types';
import { Body, Controller, Logger, LoggerService, NotFoundException, ParseUUIDPipe, Post, Query } from '@nestjs/common';
import { HttpCode } from '@nestjs/common';
import { Delete, Get, Param, Put, UseInterceptors } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  private readonly logger: LoggerService = new Logger(ProductsController.name);

  constructor (
    private readonly productsService: ProductsService,
  ) { }


  @Get('/')
  @UseInterceptors(new TransformAndValidateQueryInterceptor(FindGuitarProductCardsQuery))
  @HttpCode(HttpStatus.OK)
  async findProductCards(@Query() query: FindGuitarProductCardsQuery): Promise<[GuitarShopProductCardRdo | GuitarShopProductCardRdo[], number]> {
    const [results, resultsCount] = await this.productsService.findProductCards(query);

    return [fillDTO(GuitarShopProductCardRdo, results), resultsCount];
  }

  @Get('/:productId')
  @UseInterceptors(new TransformAndValidateQueryInterceptor(FindGuitarProductCardsQuery))
  @HttpCode(HttpStatus.OK)
  async findProductCardById(@Param('productId', ParseUUIDPipe) productId: string): Promise<GuitarShopProductCardRdo> {
    return fillDTO(
      GuitarShopProductCardRdo,
      await this.productsService.findProductCardById(productId)
        .then((res) => {
          if (res === null) {
            throw new NotFoundException(`Товара с данным ID: ${productId} не найдено.`);
          }

          return res;
        })
      );
  }

  @Post('/')
  @UseInterceptors(new TransformAndValidateDtoInterceptor(GuitarShopCreateProductCardDto))
  @HttpCode(HttpStatus.CREATED)
  async createProductCard(@Body() dto: GuitarShopCreateProductCardDto): Promise<GuitarShopProductCardRdo> {
    return fillDTO(GuitarShopProductCardRdo, await this.productsService.createProductCard(dto));
  }

  @Put('/:productId')
  @UseInterceptors(new TransformAndValidateDtoInterceptor(GuitarShopCreateProductCardDto, {
    isControllerUpdateMethod: true,
  }))
  @HttpCode(HttpStatus.OK)
  async updateProductCard(@Param('productId', ParseUUIDPipe) productId: string, @Body() dto: GuitarShopCreateProductCardDto): Promise<GuitarShopProductCardRdo> {
    return fillDTO(GuitarShopProductCardRdo, await this.productsService.updateProductCard(productId, dto));
  }

  @Delete('/:productId')
  @HttpCode(HttpStatus.OK)
  async deleteProductCardById(@Param('productId', ParseUUIDPipe) productId: string): Promise<string> {
    await this.productsService.deleteProductCard(productId);

    return `Удаления продукта с ID: ${productId} прошло успешно.`;
  }

}
