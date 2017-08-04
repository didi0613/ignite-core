"use strict";

const readline = require("readline");
const taskLoader = require("./lib/task-loader");
const errorHandler = require("./lib/error-handler");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

function igniteCore(type, task) {
  if (!task) {
    console.log(
      "---------------------------------------------------------\n" +
        " * * * * * * * Electrode Ignite Menu * * * * * * * * * * \n" +
        "---------------------------------------------------------\n" +
        "[1] Install tools for Electrode development\n" +
        "[2] Check your NodeJS and npm environment\n" +
        "[3] Check Electrode generator and tools installed\n" +
        "[4] Generate an Electrode application\n" +
        "[5] Generate an Electrode component\n" +
        "[6] Add a component to your existing component repo\n" +
        "---------------------------------------------------------\n"
    );

    rl.question("Please select your option: ", answer => {
      taskLoader(answer, type);
      rl.close();
    });
  } else if (task === "install") {
    taskLoader("1");
  } else if (task === "check-nodejs") {
    taskLoader("2");
    rl.close();
  } else if (task === "check-electrode") {
    taskLoader("3", type);
  } else if (task === "generate-app") {
    taskLoader("4", type);
    rl.close();
  } else if (task === "generate-component") {
    taskLoader("5", type);
    rl.close();
  } else if (task === "add-component") {
    taskLoader("6", type);
    rl.close();
  } else {
    errorHandler(
      "Please provide a valid task name. You can choose from: \n" +
        "---------------------------------------------------------\n" +
        " * * * * * * * Electrode Ignite Menu * * * * * * * * * * \n" +
        "---------------------------------------------------------\n" +
        "- install\n" +
        "- check-nodejs\n" +
        "- check-electrode\n" +
        "- generate-app\n" +
        "- generate-component\n" +
        "- add-component\n" +
        "---------------------------------------------------------\n"
    );
  }
}

module.exports = igniteCore;
