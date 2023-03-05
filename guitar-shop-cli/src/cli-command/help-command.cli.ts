import chalk from 'chalk';

import { CliCommandInterface } from '../assets/interface/cli-command.interface.js';


export default class HelpCommandCli implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(chalk.yellow(`
		Программа для подготовки данных для REST API сервера.

        Пример:
            main.js --<command> [--arguments]

        Команды:
            --help                              # печатает этот текст
            --generate <n> <cli_secret> <url>  # генерирует произвольное количество тестовых данных карточек товаров, где <n> - количество генерируемых данных; <cli_secret> - секрет для подтверждения действия генерации; <url> - URL к ресурсу с моковыми данными;
		`));
  }
}
