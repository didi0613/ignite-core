"use strict";

const checkNode = require("../tasks/check-node");
const checkElectrode = require("../tasks/check-electrode");
const errorHandler = require("../lib/error-handler");
const xsh = require("xsh");
const { spawn } = require("child_process");

const Generator = function(type, generator) {
  checkNode()
    .then(function(nodeCheckPassed) {
      if (nodeCheckPassed) {
        checkElectrode(type)
          .then(function(electrodeCheckPassed) {
            if (electrodeCheckPassed) {
              const yoPath = __dirname + "/../node_modules/.bin/yo";
              
              const child = spawn(yoPath, [`${generator}`], {
                stdio: "inherit"
              });
              child.on("error", err =>
                errorHandler(err, `Failed at: Running ${generator} generator.`)
              );
            }
          })
          .catch(err =>
            errorHandler(err, "Failed at: checking Electrode env.")
          );
      }
    })
    .catch(err => errorHandler(err, "Failed at: checking node env."));
};

module.exports = Generator;
