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

  INTER_SERVICE_SECRET: string;


  RABBIT_USER: string;
  RABBIT_PASSWORD: string;
  RABBIT_HOST: string;
  RABBIT_PORT: number;
  RABBIT_QUEUE: string;


  ADMIN_EMAIL: string;
  ADMIN_USERNAME: string;
  ADMIN_PASSWORD: string;

}
