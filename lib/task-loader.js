"use strict";

const xsh = require("xsh");
const pkg = require("../package.json");
const installationTaskExec = require("../tasks/installation");
const checkNode = require("../tasks/check-node");
const generator = require("../tasks/generator");

function taskLoader(option, type, parent) {
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
      type === "oss"
        ? generator(type, "electrode")
        : generator(type, "@walmart/wml-electrode");
      break;
    case "4":
      type === "oss"
        ? generator(type, "electrode:component")
        : generator(type, "@walmart/wml-electrode:component");
      break;
    case "5":
      type === "oss"
        ? generator(type, "electrode:component-add")
        : generator(type, "@walmart/wml-electrode:component-add");
      break;
  }
}

module.exports = taskLoader;
