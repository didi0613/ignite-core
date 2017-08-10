"use strict";

const xsh = require("xsh");
const logger = require("../lib/logger");
const chalk = require("chalk");
const errorHandler = require("../lib/error-handler");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const checkNode = function() {
  return new Promise((resolve, reject) => {
    return xsh
      .exec(true, "node -v")
      .then(function(nodeVersion) {
        nodeVersion = nodeVersion.stdout.slice(0, -1);
        return xsh
          .exec(true, "npm -v")
          .then(function(npmVersion) {
            npmVersion = npmVersion.stdout.slice(0, -1);

            if (process.platform.startsWith("win")) {
              logger.log(chalk.green(`Your Node version is: ${nodeVersion}`));
              logger.log(chalk.green(`Your npm version is: ${npmVersion}`));
              logger.log(
                chalk.green(
                  `Your Node binary path is: ${process.env.NODE_PATH}`
                )
              );
              rl.close();
              resolve(true);
            } else {
              return xsh
                .exec(true, "which node")
                .then(function(nodePath) {
                  nodePath = nodePath.stdout.slice(0, -1);

                  logger.log(
                    chalk.green(`Your Node version is: ${nodeVersion}`)
                  );
                  logger.log(chalk.green(`Your npm version is: ${npmVersion}`));
                  logger.log(
                    chalk.green(`Your Node binary path is: ${nodePath}`)
                  );
                  rl.close();
                  resolve(true);
                })
                .catch(err =>
                  errorHandler(err, "Failed at: Fetching node path.")
                );
            }
          })
          .catch(err => errorHandler(err, "Failed at: Fetching npm version."));
      })
      .catch(err => errorHandler(err, "Failed at: Fetching node version."));
  });
};

module.exports = checkNode;
