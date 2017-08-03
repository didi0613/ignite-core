"use strict";

const checkNode = require("../tasks/check-node");
const checkElectrode = require("../tasks/check-electrode");
const xsh = require("xsh");

const generateComponentAdd = function(type) {
  checkNode();
  checkElectrode(type);

  if (type === "oss") {
    xsh.exec("yo electrode:component-add").catch(function(err){
      console.log("Failed when adding a new component by:", err);
      return process.exit(1);
    });
  } else if (type === "wml") {
    xsh.exec("yo @walmart/wml-electrode:component-add").catch(function(err){
      console.log("Failed when adding a new component by:", err);
      return process.exit(1);
    });
  }
};

module.exports = generateComponentAdd;
