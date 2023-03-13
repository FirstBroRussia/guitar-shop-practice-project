export interface NotifyEnvInterface {
  MONGO_DB_HOST: string;
  MONGO_DB_PORT: number;

  MONGO_DB_NAME: string;
  MONGO_AUTH_BASE: string;
  MONGO_DB_USERNAME: string;
  MONGO_DB_PASSWORD: string;

  MAIL_SMTP_HOST: string;
  MAIL_SMTP_PORT: number;
  MAIL_USERNAME: string;
  MAIL_PASSWORD: string;
  MAIL_FROM: string;

  CURRENT_GUITAR_SHOP_DOMAIN: string;
  BACKEND_URL: string;

  RABBIT_USER: string;
  RABBIT_PASSWORD: string;
  RABBIT_HOST: string;
  RABBIT_PORT: number;
  RABBIT_QUEUE: string;

}
