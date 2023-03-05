import { config } from 'dotenv';
import { resolve } from 'path';

import { CliEnvInterface } from "../assets/interface/cli-env.interface.js";
import { ConfigInterface } from "../assets/interface/config.interface.js";
import { configSchema } from "./config.schema.js";


export default class ConfigService implements ConfigInterface {
  private readonly logger: Console = console;
  private config: CliEnvInterface;

  constructor () {
    const parsedOutput = config({
      path: resolve('environments', 'development.env'),
    });

    if (parsedOutput.error) {
      throw new Error('Файл *.env не найден. Повторите попытку.');
    }

    configSchema.load({});
    configSchema.validate({
      allowed: 'strict',
      output: this.logger.info,
    });

    this.config = configSchema.getProperties();
    this.logger.info('.env файл найден и удачно прочтен!');
  }

  get<T extends keyof CliEnvInterface>(key: T): CliEnvInterface[T] {
    return this.config[key];
  }

}
