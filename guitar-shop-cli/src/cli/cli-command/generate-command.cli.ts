import { CliCommandInterface } from "./cli-command.interface";

export default class GenerateCommandCli implements CliCommandInterface {
  public readonly name = '--generate';
  execute(...parameters: string[]): void {
    throw new Error("Method not implemented.");
  }
  
}
