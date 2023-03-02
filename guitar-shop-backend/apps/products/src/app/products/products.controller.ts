import { Controller, Logger, LoggerService } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  private readonly logger: LoggerService = new Logger(ProductsController.name);



}
