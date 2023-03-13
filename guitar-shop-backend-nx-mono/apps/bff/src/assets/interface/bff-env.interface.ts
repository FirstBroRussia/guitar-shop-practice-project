export interface BffEnvInterface {
  USERS_MICROSERVICE_HOST: string;
  USERS_MICROSERVICE_PORT: number;

  PRODUCTS_MICROSERVICE_HOST: string;
  PRODUCTS_MICROSERVICE_PORT: number;

  COMMENTS_MICROSERVICE_HOST: string;
  COMMENTS_MICROSERVICE_PORT: number;

  ORDERS_MICROSERVICE_HOST: string;
  ORDERS_MICROSERVICE_PORT: number;

  UPLOAD_DIR: string;

  INTER_SERVICE_SECRET: string;


  ADMIN_EMAIL: string;

  RABBIT_USER: string;
  RABBIT_PASSWORD: string;
  RABBIT_HOST: string;
  RABBIT_PORT: number;
  RABBIT_QUEUE: string;


}
