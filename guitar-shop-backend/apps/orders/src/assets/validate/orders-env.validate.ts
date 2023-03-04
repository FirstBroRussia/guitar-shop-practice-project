import { plainToInstance } from "class-transformer";
import { IsString, IsInt, Max, Min, validateSync } from "class-validator";
import { OrdersEnvInterface } from "../interface/orders-env.interface";

class OrdersEnvValidateConfig implements OrdersEnvInterface {
  @IsString()
  MONGO_DB_HOST: string;

  @IsInt()
  @Min(0)
  @Max(65535)
  MONGO_DB_PORT: number;


  @IsString()
  MONGO_DB_NAME: string;

  @IsString()
  MONGO_AUTH_BASE: string;

  @IsString()
  MONGO_DB_USERNAME: string;

  @IsString()
  MONGO_DB_PASSWORD: string;

}

export function ordersEnvValidateConfig(config: Record<string, unknown>) {
  const transformConfig = plainToInstance(OrdersEnvValidateConfig, config, { enableImplicitConversion: true, });

  const errors = validateSync(transformConfig);

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return transformConfig;
}
