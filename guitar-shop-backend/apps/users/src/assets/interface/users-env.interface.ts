export interface UsersEnvInterface {
  MONGO_DB_HOST: string;
  MONGO_DB_PORT: number;

  MONGO_DB_NAME: string;
  MONGO_AUTH_BASE: string;
  MONGO_DB_USERNAME: string;
  MONGO_DB_PASSWORD: string;
  MONGO_DB_CREATE_USERS_SECRET: string;

  JWT_SECRET: string;

  CLI_SECRET: string;

}
