"use strict";

const xsh = require("xsh");
const pkg = require("../package.json");
const installationTaskExec = require("./installation");

function taskLoader(option) {
  switch (option) {
    case "1":
      console.log("Checking your Electrode environment...\n");
      installationTaskExec();
      break;
    case "2":
      //Statements executed when the result of expression matches value2
      break;
    case "3":
      //Statements executed when the result of expression matches value2
      break;
    case "4":
      //Statements executed when the result of expression matches value2
      break;
    case "5":
      //Statements executed when the result of expression matches value2
      break;
    case "6":
      //Statements executed when the result of expression matches value2
      break;
    default:
      console.log("Invalid Option");
      break;
  }
}

module.exports = taskLoader;
