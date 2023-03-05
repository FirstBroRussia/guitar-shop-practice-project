import axios, { AxiosError } from 'axios';

import { CliCommandInterface } from '../assets/interface/cli-command.interface.js';
import { GuitarShopCreateProductCardDto } from '../assets/interface/create-product-card.interface.js';
import { UsersDbResponseInterface } from '../assets/interface/users-db-response.interface.js';
import ProductCardDataGenerator from '../common/product-card-generator/product-card-generator.js';

import ConfigService from '../config/config.service.js';


export default class GenerateCommandCli implements CliCommandInterface {
  public readonly name = '--generate';

  public async execute(...parameters: string[]): Promise<void> {
    try {
      const config = new ConfigService();

      const [count, cliSecret, url] = parameters;

      if (!count || count === '' || !cliSecret || cliSecret === '' || !url || url === '') {
        throw new Error('Вы не передали в качестве аргумента один из обязательных параметров «<n>, <cli_secret>, <url>». Повторите запрос снова.');
      }

      const productCardCount = Number.parseInt(count, 10);

      const usersDbMicroserviceUrl = `http://${config.get('USERS_DB_HOST')}:${config.get('USERS_DB_PORT')}`;
      const productsDbMicroserviceUrl = `http://${config.get('PRODUCTS_DB_HOST')}:${config.get('PRODUCTS_DB_PORT')}`;
      
      
      const adminUser = (await axios.get(`${usersDbMicroserviceUrl}/api/users/cli/${cliSecret}`)
        .catch((err) => {
          const error = err as AxiosError;

          throw {
            request: 'Запрос к БД Users',
            response: error.response?.data,
          };
      })).data as UsersDbResponseInterface;
      
      const mocksData = (await axios.get(url)
        .catch((err) => {
          const error = err as AxiosError;

          throw {
            request: 'Запрос к БД Моковых данных',
            response: error.response?.data,
          };
      })).data;

      const productCardGenerator = new ProductCardDataGenerator(mocksData);

      for (let index = 0; index < productCardCount; index++) {
        const generatedProductCard = productCardGenerator.generate();

        const dto: GuitarShopCreateProductCardDto = {
          creatorUserId: adminUser.id,
          ...generatedProductCard
        };

        await axios.post(`${productsDbMicroserviceUrl}/api/products`, dto)
          .catch((err) => {
            const error = err as AxiosError;

            throw {
              request: 'Запрос к БД Products',
              response: error.response?.data,
            };
        })
      }

      console.log(`Сгенерировано и добавлено в БД карточек товара ${productCardCount} штук.`);
    } catch (err) {
      console.log();
      console.log();
      console.error(err);

      process.exit(1);
    }
  }
}
