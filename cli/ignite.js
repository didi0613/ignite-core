"use strict";

const logger = require("../lib/logger");
const chalk = require("chalk");
const pkg = require("../package.json");
const xsh = require("xsh");
const Path = require("path");
const readline = require('readline');
const taskLoader = require("../lib/task-loader");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ignite(args, offset) {
  logger.log(chalk.green(`Welcome to electrode-ignite version ${pkg.version}`));
  logger.log(chalk.green("Checking latest version available on npm"));

  xsh.exec(true, "npm show electrode-ignite version").then(function(latestVersion) {
    var version = latestVersion.stdout.slice(0, -1);

    if (version !== pkg.version) {
      logger.log(chalk.yellow(
        `Latest version is ${version} - trying to update.\nelectrode-ignite updated to ${version}, exiting, please run your command again.`
      ));
    } else {
      logger.log(chalk.green("You've aleady installed the latest electrode-ignite.\n"));
    };

    if (!args) {
      console.log("---------------------------------------------------------\n");
      console.log(" * * * * * * * Electrode Ignite Menu * * * * * * * * * * \n");
      console.log("---------------------------------------------------------\n");
      console.log("[1] Install tools for Electrode development\n");
      console.log("[2] Check your NodeJS and NPM environment\n");
      console.log("[3] Check Electrode generator and tools installed\n");
      console.log("[4] Generate an Electrode application\n");
      console.log("[5] Generate an Electrode component\n");
      console.log("[6] Add a component to your existing component repo\n");

      rl.question('Please select your option ', (answer) => {
        taskLoader(answer);
      });
    }
  });
};

module.exports = ignite;
