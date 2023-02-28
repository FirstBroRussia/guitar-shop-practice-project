import { plainToInstance } from "class-transformer";
import { IsString, IsInt, Max, Min, validateSync } from "class-validator";
import { UsersEnvInterface } from "../interface/users-env.interface";

class UserEnvValidateConfig implements UsersEnvInterface {
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

export function usersEnvValidateConfig(config: Record<string, unknown>) {
  const transformConfig = plainToInstance(UserEnvValidateConfig, config, { enableImplicitConversion: true, });

  const errors = validateSync(transformConfig);

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return transformConfig;
}
