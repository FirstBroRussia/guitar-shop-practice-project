import { GuitarShopUserMongoDbModel } from "@guitar-shop/core";
import { CliCommandInterface } from "@guitar-shop/shared-types";

import mongoose from 'mongoose';

import { getParsePostgresDbConnectionString } from "../assets/helper/helpers";
import { ParsePostgresStringInObjectType } from "../assets/type/parse-postgres-string.type";

export default class GenerateCommandCli implements CliCommandInterface {
  public readonly name = '--generate';

  public async execute(...parameters: string[]): Promise<void> {
    const [count, mongoDbUrl, postgresDbUrl] = parameters;
    const dataCount = Number.parseInt(count, 10);

    const postgresData: ParsePostgresStringInObjectType = getParsePostgresDbConnectionString(postgresDbUrl);

    try {
      await mongoose.connect(mongoDbUrl);
    } catch (err) {
      console.error(`Не удалось подключиться к MongoDB по URL: ${mongoDbUrl}`);
      console.log(err);
    }

    console.log('PRE MONGO MODEL');
    const result = await GuitarShopUserMongoDbModel.find();
    console.log(result);

  }
}
