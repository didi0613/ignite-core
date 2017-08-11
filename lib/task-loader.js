"use strict";

const xsh = require("xsh");
const pkg = require("../package.json");
const installationTaskExec = require("../tasks/installation");
const checkNode = require("../tasks/check-node");
const generator = require("../tasks/generator");
const docs = require("../tasks/docs");

function taskLoader(option, type) {
  // Electrode OSS/WML Generator
  const generatorApp =
    __dirname + "/../node_modules/generator-electrode/generators/app/index.js";
  const generatorComponent =
    __dirname + "/../node_modules/generator-electrode/component/index.js";
  const generatorComponentAdd =
    __dirname + "/../node_modules/generator-electrode/component-add/index.js";
  const wmlgeneratorApp =
    __dirname +
    "/../node_modules/@walmart/wml-electrode/generators/app/index.js";
  const wmlgeneratorComponent =
    __dirname + "/../node_modules/@walmart/wml-electrode/component/index.js";
  const wmlgeneratorComponentAdd =
    __dirname +
    "/../node_modules/@walmart/wml-electrode/component-add/index.js";

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
      // type === "oss"
      //   ? generator(type, "electrode")
      //   : generator(type, "@walmart/wml-electrode");
      type === "oss"
        ? generator(type, generatorApp)
        : generator(type, wmlgeneratorApp);
      break;
    case "4":
      type === "oss"
        ? generator(type, generatorComponent)
        : generator(type, wmlgeneratorComponent);
      break;
    case "5":
      type === "oss"
        ? generator(type, generatorComponentAdd)
        : generator(type, wmlgeneratorComponentAdd);
      break;
    case "6":
      docs(type);
      break;
  }
}

module.exports = taskLoader;
