"use strict";

const readline = require("readline");
const xsh = require("xsh");
const logger = require("../lib/logger");
const errorHandler = require("../lib/error-handler");
const chalk = require("chalk");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const uninstallXClapGlobally = function() {
  rl.question(
    "You are not suppose to install xclap globally, proceed to uninstall xclap? (y/n) ",
    answer => {
      if (answer.toLowerCase() === "y") {
        xsh
          .exec("npm uninstall -g xclap")
          .then(function() {
            logger.log(
              chalk.green(
                "You've successfully uninstalled the xclap globally, please re-run your command.\n"
              )
            );
            rl.close();
          })
          .catch(err =>
            errorHandler(
              err,
              "Failed at: uninstalling xclap, please run `npm uninstall -g xclap` manually.\n"
            )
          );
      }
    }
  );
};

const checkXClap = new Promise((resolve, reject) => {
  xsh
    .exec(true, "npm list -g --depth=0 | grep xclap")
    .then(function(version) {
      if (version.stdout.indexOf("xclap@") > 0) {
        uninstallXClapGlobally();
        resolve(false);
      } else {
        resolve(true);
      }
    })
    .catch(function() {
      resolve(true);
    });
});

const checkElectrode = function(option) {
  checkXClap.then(function(checkPassed) {
    if (checkPassed) {
      xsh
        .exec(true, "npm show yo version")
        .then(function(yoVersion) {
          var generatorName = "";
          yoVersion = yoVersion.stdout.slice(0, -1);

          if (option === "wml") {
            generatorName = "@walmart/generator-wml-electrode";
          } else if (option === "oss") {
            generatorName = "generator-electrode";
          } else {
            errorHandler("Please provide a valid electrode ignite name, for example: oss or wml.");
          }

          xsh
            .exec(true, `npm show ${generatorName} version`)
            .then(function(generatorVersion) {
              generatorVersion = generatorVersion.stdout.slice(0, -1);
              logger.log(chalk.green(`Your yeoman version is: ${yoVersion}`));
              logger.log(
                chalk.green(
                  `Your ${generatorName} version is: ${generatorVersion}`
                )
              );
              rl.close();
            })
            .catch(err =>
              errorHandler(`Fetching ${generatorName} version failed: ${err}.`)
            );
        })
        .catch(err => errorHandler(`Fetching node version failed: ${err}.`));
    }
  });
};

module.exports = checkElectrode;
