import convict from 'convict';
import validator from 'convict-format-with-validator';

import { CliEnvInterface } from '../assets/interface/cli-env.interface';

convict.addFormats(validator);

export const configSchema = convict<CliEnvInterface>({
  USERS_DB_HOST: {
    default: '127.0.0.1',
    format: 'ipaddress',
    env: 'USERS_DB_HOST',
    doc: 'Хост микросервиса Users',
  },
  USERS_DB_PORT: {
    default: 4000,
    format: 'port',
    env: 'USERS_DB_PORT',
    doc: 'Порт микросервиса Users',
  },

  PRODUCTS_DB_HOST: {
    default: '127.0.0.1',
    format: 'ipaddress',
    env: 'PRODUCTS_DB_HOST',
    doc: 'Хост микросервиса Products',
  },
  PRODUCTS_DB_PORT: {
    default: 4000,
    format: 'port',
    env: 'PRODUCTS_DB_PORT',
    doc: 'Порт микросервиса Products',
  },
});
