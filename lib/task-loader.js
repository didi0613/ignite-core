"use strict";

const xsh = require("xsh");
const pkg = require("../package.json");
const installationTaskExec = require("../tasks/installation");
const checkNode = require("../tasks/check-node");
const checkElectrode = require("../tasks/check-electrode");
const generateApp = require("../tasks/generate-app");
const generateComponent = require("../tasks/generate-component");
const generateComponentAdd = require("../tasks/generate-component-add");
const errorHandler = require("../lib/error-handler");

function taskLoader(option, type) {
  switch (option) {
    case "1":
      console.log("Checking your Electrode environment...\n");
      installationTaskExec();
      break;
    case "2":
      console.log("Checking your NodeJS and npm environment...\n");
      checkNode();
      break;
    case "3":
      console.log("Checking your Electrode environment...\n");
      checkElectrode(type);
      break;
    case "4":
      generateApp(type);
      break;
    case "5":
      console.log("Generating your Electrode component...\n");
      generateComponent(type);
      break;
    case "6":
      console.log("Adding a new Electrode component...\n");
      generateComponentAdd(type);
      break;
    default:
      errorHandler("Please provide a valid task number between 1 - 6.");
      break;
  }
}

module.exports = taskLoader;
