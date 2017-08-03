"use strict";

const xsh = require("xsh");
const logger = require("../lib/logger");
const chalk = require("chalk");

const checkNode = function() {
  xsh
    .exec(true, "node -v")
    .then(function(nodeVersion) {
      nodeVersion = nodeVersion.stdout.slice(0, -1);
      xsh
        .exec(true, "npm -v")
        .then(function(npmVersion) {
          npmVersion = npmVersion.stdout.slice(0, -1);
          xsh
            .exec(true, "which node")
            .then(function(nodePath) {
              nodePath = nodePath.stdout.slice(0, -1);

              logger.log(chalk.green(`Your Node version is: ${nodeVersion}`));
              logger.log(chalk.green(`Your npm version is: ${npmVersion}`));
              logger.log(chalk.green(`Your Node binary path is: ${nodePath}`));
            })
            .catch(function(err) {
              logger.log(chalk.red(`Fetching node path failed: ${err}`));
            });
        })
        .catch(function(err) {
          logger.log(chalk.red(`Fetching npm version failed: ${err}`));
        });
    })
    .catch(function(err) {
      logger.log(chalk.red(`Fetching node version failed: ${err}`));
    });
};

module.exports = checkNode;
