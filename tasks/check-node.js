"use strict";

const xsh = require("xsh");
const logger = require("../lib/logger");
const chalk = require("chalk");
const errorHandler = require("../lib/error-handler");

const checkNode = function(option, type) {
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

              return process.exit(0);
            })
            .catch(err => errorHandler(err, "Failed at: Fetching node path."));
        })
        .catch(err => errorHandler(err, "Failed at: Fetching npm version."));
    })
    .catch(err => errorHandler(err, "Failed at: Fetching node version."));
};

module.exports = checkNode;
