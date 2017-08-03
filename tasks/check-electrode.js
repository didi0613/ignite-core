"use strict";

const xsh = require("xsh");
const logger = require("../lib/logger");
const chalk = require("chalk");

const checkElectrode = function(option) {
  xsh
    .exec(true, "npm show yo version")
    .then(function(yoVersion) {
      var generatorName = "";
      yoVersion = yoVersion.stdout.slice(0, -1);
      logger.log(chalk.green(`Your yeoman version is: ${yoVersion}`));

      if (option === "wml") {
        generatorName = "@walmart/generator-wml-electrode";
      } else if(option === "oss") {
        generatorName = "generator-electrode";
      }

      xsh
        .exec(true, `npm show ${generatorName} version`)
        .then(function(generatorVersion) {
          generatorVersion = generatorVersion.stdout.slice(0, -1);
          logger.log(
            chalk.green(`Your ${generatorName} version is: ${generatorVersion}`)
          );
        })
        .catch(function(err) {
          logger.log(chalk.red(`Fetching ${generatorName} version failed: ${err}`));
          return process.exit(1);
        });
    })
    .catch(function(err) {
      logger.log(chalk.red(`Fetching node version failed: ${err}`));
      return process.exit(1);
    });
};

module.exports = checkElectrode;
