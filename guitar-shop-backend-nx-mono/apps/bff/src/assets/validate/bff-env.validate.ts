import { plainToInstance } from "class-transformer";
import { IsString, IsInt, Max, Min, validateSync } from "class-validator";
import { BffEnvInterface } from "../interface/bff-env.interface";

class BffEnvValidateConfig implements BffEnvInterface {
  @IsString()
  USERS_MICROSERVICE_HOST: string;

  @IsInt()
  @Min(0)
  @Max(65535)
  USERS_MICROSERVICE_PORT: number;


  @IsString()
  PRODUCTS_MICROSERVICE_HOST: string;

  @IsInt()
  @Min(0)
  @Max(65535)
  PRODUCTS_MICROSERVICE_PORT: number;


  @IsString()
  COMMENTS_MICROSERVICE_HOST: string;

  @IsInt()
  @Min(0)
  @Max(65535)
  COMMENTS_MICROSERVICE_PORT: number;


  @IsString()
  ORDERS_MICROSERVICE_HOST: string;

  @IsInt()
  @Min(0)
  @Max(65535)
  ORDERS_MICROSERVICE_PORT: number;


  @IsString()
  UPLOAD_DIR: string;


  @IsString()
  INTER_SERVICE_SECRET: string;

}

export function bffEnvValidateConfig(config: Record<string, unknown>) {
  const transformConfig = plainToInstance(BffEnvValidateConfig, config, { enableImplicitConversion: true, });

  const errors = validateSync(transformConfig);

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return transformConfig;
}
