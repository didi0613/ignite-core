"use strict";

const readline = require("readline");
const xsh = require("xsh");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const Installation = function() {
  xsh
    .exec(true, "npm show xclap-cli version")
    .then(function(npmRegistryVerion) {
      const xclapLatestVersion = npmRegistryVerion.stdout.slice(0, -1);
      xsh
        .exec(true, "npm list -g --depth=0 | grep xclap-cli")
        .then(function(localVersion) {
          const start = localVersion.stdout.indexOf("xclap-cli") + 10;
          const end = localVersion.stdout.indexOf("\n");
          localVersion = localVersion.stdout.substr(start, end).slice(0, -1);

          if (localVersion === xclapLatestVersion) {
            console.log(
              "Congratulations, you've already installed the latest xclap-cli"
            );
            rl.close();
          } else if (localVersion < xclapLatestVersion) {
            console.log(
              "Electrode Ignite is about to update the following modules globally:"
            );
            console.log(
              `- generator-electrode (from version ${localVersion} to version ${xclapLatestVersion})`
            );

            rl.question("Proceed? (Y/n)\n", answer => {
              if (answer.toLowerCase() === "y") {
                xsh.exec("npm install -g xclap-cli");
              }
              rl.close();
            });
          } else {
            console.log(
              "Error when fetching Electrode packages. Exiting now ..."
            );
            rl.close();
          }
        })
        .catch(function(err) {
          console.log(
            "Electrode Ignite is about to install the following modules globally:\n- xclap-cli\n"
          );

          rl.question("Proceed? (Y/n)\n", answer => {
            if (answer.toLowerCase() === "y") {
              xsh.exec("npm install -g xclap-cli");
            }
            rl.close();
          });
        });
    });
};

module.exports = Installation;
