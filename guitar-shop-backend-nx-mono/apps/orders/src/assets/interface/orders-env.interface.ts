export interface OrdersEnvInterface {
  MONGO_DB_HOST: string;
  MONGO_DB_PORT: number;

  MONGO_DB_NAME: string;
  MONGO_AUTH_BASE: string;
  MONGO_DB_USERNAME: string;
  MONGO_DB_PASSWORD: string;

  ADMIN_EMAIL: string;


  RABBIT_USER: string;
  RABBIT_PASSWORD: string;
  RABBIT_HOST: string;
  RABBIT_PORT: number;
  RABBIT_QUEUE: string;

}
