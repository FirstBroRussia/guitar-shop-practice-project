import axios from 'axios';
import { Request } from 'express';

import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, LoggerService, Param, ParseUUIDPipe, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { FindGuitarProductCardsQuery, GuitarShopCreateProductCardBffDto, GuitarShopCreateProductCardDto, GuitarShopProductCardRdo, GuitarShopUpdateProductCardBffDto, JwtPayloadDto, TransformAndValidateDtoInterceptor, TransformAndValidateQueryInterceptor } from '@guitar-shop/shared-types';
import { BffEnvInterface } from '../../assets/interface/bff-env.interface';
import { fillDTO } from '@guitar-shop/core';
import { FileInterceptor } from '@nestjs/platform-express';
import { resolve } from 'path';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { JwtAuthUsersGuard } from '../../assets/guard/jwt-auth-users.guard';

@Controller('products')
export class ProductsController {
  that = this;
  private readonly logger: LoggerService = new Logger(ProductsController.name);

  private readonly productsMicroserviceUrl: string;
  private multerOptions: MulterOptions;

  constructor(
    private readonly config: ConfigService<BffEnvInterface>,
  ) {
    this.productsMicroserviceUrl = `http://${config.get("PRODUCTS_MICROSERVICE_HOST")}:${config.get("PRODUCTS_MICROSERVICE_PORT")}`;
    this.multerOptions = {
      dest: resolve('apps', 'bff', `${this.config.get('UPLOAD_DIR')}`),
    };
  }


  @Get('/')
  @UseInterceptors(new TransformAndValidateQueryInterceptor(FindGuitarProductCardsQuery))
  @HttpCode(HttpStatus.OK)
  async findProductCards(@Req() req: Request): Promise<[GuitarShopProductCardRdo | GuitarShopProductCardRdo[], number]> {
    const [products, count] = (await axios.get(`${this.productsMicroserviceUrl}${req.url}`)).data as [GuitarShopProductCardRdo | GuitarShopProductCardRdo[], number];

    return [fillDTO(GuitarShopProductCardRdo, products), count];
  }

  @Get('/:productId')
  @UseInterceptors(new TransformAndValidateQueryInterceptor(FindGuitarProductCardsQuery))
  @HttpCode(HttpStatus.OK)
  async findProductCardById(@Req() req: Request, @Param('productId', ParseUUIDPipe) _productId: string): Promise<GuitarShopProductCardRdo> {
    const result = (await axios.get(`${this.productsMicroserviceUrl}${req.url}`)).data as GuitarShopProductCardRdo;

    return fillDTO(GuitarShopProductCardRdo, result);
  }


  @Post('/')
  @UseInterceptors(new TransformAndValidateDtoInterceptor(GuitarShopCreateProductCardBffDto))
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(JwtAuthUsersGuard)
  @HttpCode(HttpStatus.CREATED)
  async createProductCard(@Req() req: Request & { user: JwtPayloadDto, }, @Body() dto: GuitarShopCreateProductCardBffDto, @UploadedFile() file: Express.Multer.File): Promise<GuitarShopProductCardRdo> {
    const { id } = req.user;

    const dtoToProductsMicroservice: GuitarShopCreateProductCardDto = {
      creatorUserId: id,
      ...dto,
      imageLink: file ? `/api/products/${this.config.get('UPLOAD_DIR')}/${file.filename}` : '',
    };

    const result = (await axios.post(`${this.productsMicroserviceUrl}${req.url}`, dtoToProductsMicroservice)).data as GuitarShopProductCardRdo;

    return fillDTO(GuitarShopProductCardRdo, result);
  }

  @Put('/:productId')
  @UseInterceptors(new TransformAndValidateDtoInterceptor(GuitarShopUpdateProductCardBffDto, {
    isControllerUpdateMethod: true,
  }))
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(JwtAuthUsersGuard)
  @HttpCode(HttpStatus.OK)
  async updateProductCard(@Req() req: Request & { user: JwtPayloadDto, }, @Param('productId', ParseUUIDPipe) _productId: string, @Body() dto: GuitarShopUpdateProductCardBffDto, @UploadedFile() file: Express.Multer.File): Promise<GuitarShopProductCardRdo> {
    if (file) {
      dto.imageLink = `/api/products/${this.config.get('UPLOAD_DIR')}/${file.filename}`;
    }

    const result = (await axios.put(`${this.productsMicroserviceUrl}${req.url}`, dto)).data as GuitarShopProductCardRdo;

    return fillDTO(GuitarShopProductCardRdo, result);
  }

  @Delete('/:productId')
  @UseGuards(JwtAuthUsersGuard)
  @HttpCode(HttpStatus.OK)
  async deleteProductCardById(@Req() req: Request & { user: JwtPayloadDto, }, @Param('productId', ParseUUIDPipe) _productId: string): Promise<string> {
    return (await axios.delete(`${this.productsMicroserviceUrl}${req.url}`)).data as string;
  }

}
