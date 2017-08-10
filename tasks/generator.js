"use strict";

const checkNode = require("../tasks/check-node");
const errorHandler = require("../lib/error-handler");
const xsh = require("xsh");
const { spawn } = require("child_process");

const Generator = function(type, generator) {
  checkNode()
    .then(function(nodeCheckPassed) {
      if (nodeCheckPassed) {
        const yoPath = __dirname + "/../node_modules/.bin/yo";
        let generatorPath = "";
        let child = "";

        if(generator === "electrode") {
          generatorPath = __dirname + "/../node_modules/generator-electrode/generators/app/index.js";
        } else if(generator === "electrode:component") {
          generatorPath = __dirname + "/../node_modules/generator-electrode/component/index.js"
        } else if(generator === "electrode:component-add") {
          generatorPath = __dirname + "/../node_modules/generator-electrode/component-add/index.js"
        }

        if(process.platform.startsWith("win")) {
          yoPath = yoPath.replace(/\\/g,"/");
          generatorPath = generatorPath.replace(/\\/g,"/");
          child = spawn("cmd", [`${yoPath} ${generatorPath}`], {
            stdio: "inherit"
          });
        } else {
          child = spawn(yoPath, [`${generatorPath}`], {
            stdio: "inherit"
          });
        }

        child.on("error", err =>
          errorHandler(err, `Failed at: Running ${generator} generator.`)
        );
      }
    })
    .catch(err => errorHandler(err, "Failed at: checking node env."));
};

module.exports = Generator;
