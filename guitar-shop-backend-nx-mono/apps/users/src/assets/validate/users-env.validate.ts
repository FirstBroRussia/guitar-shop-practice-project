import { plainToInstance } from "class-transformer";
import { IsString, IsInt, Max, Min, validateSync } from "class-validator";
import { UsersEnvInterface } from "../interface/users-env.interface";

class UsersEnvValidateConfig implements UsersEnvInterface {
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

  @IsString()
  MONGO_DB_CREATE_USERS_SECRET: string;


  @IsString()
  JWT_SECRET: string;

  @IsString()
  CLI_SECRET: string;


  @IsString()
  RABBIT_USER: string;

  @IsString()
  RABBIT_PASSWORD: string;

  @IsString()
  RABBIT_HOST: string;

  @IsInt()
  @Min(0)
  @Max(65535)
  RABBIT_PORT: number;

  @IsString()
  RABBIT_QUEUE: string;

}

export function usersEnvValidateConfig(config: Record<string, unknown>) {
  const transformConfig = plainToInstance(UsersEnvValidateConfig, config, { enableImplicitConversion: true, });

  const errors = validateSync(transformConfig);

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return transformConfig;
}
