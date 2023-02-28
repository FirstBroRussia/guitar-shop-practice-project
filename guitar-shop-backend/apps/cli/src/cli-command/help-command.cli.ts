import chalk from 'chalk';

import { CliCommandInterface } from "@guitar-shop/shared-types";

export default class HelpCommandCli implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(chalk.yellow(`
		Программа для подготовки данных для REST API сервера.

        Пример:
            main.js --<command> [--arguments]

        Команды:
            --help                              # печатает этот текст
            --generate <n> <secret_salt> <mongodb://[username]:[password]@[host][port]/[dbname]?authSource=admin> <postgresql://[user]:[password]@[host]:[port]/[dbname]>  # генерирует произвольное количество тестовых данных карточек товаров, где <n> - количество генерируемых данных; <secret_salt> - секрет для генерации пароля; <MongoDB connection string> - строка с URL для подключения к базе данных пользователей MongoDB; <Postgres connection string> - строка с URL для подключения к базе данных карточек товаров Postgres;
		`));
  }
}
