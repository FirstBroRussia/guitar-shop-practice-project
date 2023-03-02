import { fillDTO } from "@guitar-shop/core";
import { IsNumber, IsString, validateSync } from "class-validator";
import { ProductsEnvInterface } from "../interface/products-env.interface";

class ProductsEnvValidateConfig implements ProductsEnvInterface {
  @IsString()
  POSTGRES_DB_HOST: string;

  @IsNumber()
  POSTGRES_DB_PORT: number;

  @IsString()
  POSTGRES_DB_NAME: string;

}

export const productsEnvValidateConfig = (config: Record<string, unknown>) => {
  const transformConfig = fillDTO(ProductsEnvValidateConfig, config);
  const errors = validateSync(transformConfig);

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return transformConfig;
}
