"use strict";

const checkNode = require("../tasks/check-node");
const checkElectrode = require("../tasks/check-electrode");
const errorHandler = require("../lib/error-handler");
const xsh = require("xsh");

const generateApp = function(type) {
  checkNode().then(function(nodeCheckPassed) {
    if (nodeCheckPassed) {
      checkElectrode(type).then(function(electrodeCheckPassed) {
        if (electrodeCheckPassed) {
          console.log("Generating your Electrode application...\n");
          if (type === "oss") {
            xsh.exec("yo electrode").catch(err => errorHandler(err));
          } else if (type === "wml") {
            xsh
              .exec("yo @walmart/wml-electrode")
              .catch(err => errorHandler(err));
          } else {
            errorHandler(
              "Please provide a valid electrode ignite name, for example: oss or wml."
            );
          }
        }
      });
    }
  });
};

module.exports = generateApp;
