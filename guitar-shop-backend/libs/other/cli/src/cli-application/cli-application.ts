import { CliCommandInterface } from '@guitar-shop/shared-types';

import { ParseCommandType } from "../assets/type/parsed-command.type";

export default class CliApplication {
  private readonly defaultCommand = '--help';
  private commands: {[propertyName: string]: CliCommandInterface} = {};

  public registerCliCommands(commandList: CliCommandInterface[]): void {
    commandList.forEach((command) => {
      this.commands[command.name] = command;
    });
  }

  private parseCommand(cliArguments: string[]): ParseCommandType {
    const parsedCommand: ParseCommandType = {};
    let command = '';

    cliArguments.forEach((item) => {
      if (item.startsWith('--')) {
        parsedCommand[item] = [];
        command = item;
      } else if (command && item) {
        parsedCommand[command].push(item);
      }
    });

    return parsedCommand;
  }

  public getCommand(commandName: string): CliCommandInterface {
    return this.commands[commandName] ?? this.commands[this.defaultCommand];
  }

  public processCommand(argv: string[]): void {
    const parsedCommand = this.parseCommand(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArguments = parsedCommand[commandName] ?? [];
    command.execute(...commandArguments);
  }

}
