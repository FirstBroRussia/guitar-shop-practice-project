#!/usr/bin/env node

import CliApplication from "./cli-application/cli-application";
import GenerateCommandCli from "./cli-command/generate-command.cli";
import HelpCommandCli from "./cli-command/help-command.cli";

const cliManager = new CliApplication();
cliManager.registerCliCommands([
  new HelpCommandCli,
  new GenerateCommandCli,
]);
cliManager.processCommand(process.argv);
