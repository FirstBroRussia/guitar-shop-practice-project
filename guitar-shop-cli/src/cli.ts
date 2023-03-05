#!/usr/bin/env node

import CliApplication from "./cli-application/cli-application.js";
import GenerateCommandCli from "./cli-command/generate-command.cli.js";
import HelpCommandCli from "./cli-command/help-command.cli.js";


const cliManager = new CliApplication();
cliManager.registerCliCommands([
  new HelpCommandCli,
  new GenerateCommandCli,
]);
cliManager.processCommand(process.argv);
