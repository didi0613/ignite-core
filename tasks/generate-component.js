"use strict";

const checkNode = require("../tasks/check-node");
const checkElectrode = require("../tasks/check-electrode");
const xsh = require("xsh");

const generateComponent = function(type) {
  checkNode();
  checkElectrode(type);

  if (type === "oss") {
    xsh.exec("yo electrode:component").catch(function(err) {
      console.log("Failed when generating your component by:", err);
      return process.exit(1);
    });
  } else if (type === "wml") {
    xsh.exec("yo @walmart/wml-electrode:component").catch(function(err) {
      console.log("Failed when generating your component by:", err);
      return process.exit(1);
    });
  }
};

module.exports = generateComponent;
