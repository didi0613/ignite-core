"use strict";

const readline = require("readline");
const xsh = require("xsh");
const logger = require("../lib/logger");
const chalk = require("chalk");
const errorHandler = require("../lib/error-handler");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const installXClapCLI = function() {
  rl.question("Proceed? (y/n) ", answer => {
    if (answer.toLowerCase() === "y") {
      return xsh
        .exec("npm install -g xclap-cli")
        .then(function() {
          logger.log(
            chalk.green("You've successfully installed the latest xclap-cli.")
          );
          rl.close();
        })
        .catch(err =>
          errorHandler(err, "Failed at: Installing the latest xclap-cli.")
        );
    }
  });
};

const checkXClapCLI = function() {
  return new Promise((resolve, reject) => {
    return xsh
      .exec(true, `npm ls -g -j --depth=0 xclap-cli`)
      .then(function(ret) {
        resolve(JSON.parse(ret.stdout).dependencies["xclap-cli"].version);
      })
      .catch(function() {
        resolve();
      });
  });
};

const checkXClapCLILatestVersion = function() {
  return new Promise((resolve, reject) => {
    return xsh
      .exec(true, "npm show xclap-cli version")
      .then(function(version) {
        resolve(version.stdout.slice(0, -1));
      })
      .catch(err =>
        errorHandler(err, "Failed at showing the latest xclap-cli version.")
      );
  });
};

const cmp = function(a, b) {
  var pa = a.split(".");
  var pb = b.split(".");
  for (var i = 0; i < 3; i++) {
    var na = Number(pa[i]);
    var nb = Number(pb[i]);
    if (na > nb) return 1;
    if (nb > na) return -1;
    if (!isNaN(na) && isNaN(nb)) return 1;
    if (isNaN(na) && !isNaN(nb)) return -1;
  }
  return 0;
};

const Installation = function() {
  checkXClapCLI().then(function(version) {
    if (!version) {
      /* Case 1: xclap-cli does not installed globally */
      console.log(
        `Electrode Ignite is about to install the following modules globally:\n- xclap-cli\n`
      );
      installXClapCLI();
    } else {
      checkXClapCLILatestVersion().then(function(latestversion) {
        /* Case 2: xclap-cli already got the latest version */
        if (cmp(version, latestversion) === 0) {
          logger.log(
            chalk.green(
              `Congratulations, you've already installed the latest xclap-cli@${latestversion} globally.`
            )
          );
          rl.close();
        } else if (cmp(version, latestversion) < 0) {
          /* Case 3: xclap-cli version is out-dated */
          console.log(
            `Electrode Ignite is about to update the following modules globally:\n- xclap-cli (from version ${version} to version ${latestversion})`
          );
          installXClapCLI();
        } else {
          errorHandler("Error when fetching Electrode packages");
        }
      });
    }
  });
};

module.exports = Installation;
