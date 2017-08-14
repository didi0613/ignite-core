"use strict";

const errorHandler = require("../lib/error-handler");
const opn = require("opn");
const logger = require("../lib/logger");
const chalk = require("chalk");

const electrodeDocs = function(type) {
  if (type === "oss") {
    opn("https://docs.electrode.io/");
    logger.log(chalk.green("You've successfully opened the oss gitbook. Please checkout your browser."));
    return process.exit(0);
  } else if (type === "wml") {
    opn("http://gitbook.qa.walmart.com/books/electrode-dev-guide/");
    logger.log(chalk.green("You've successfully opened the wml internal gitbook. Please checkout your browser."));
    return process.exit(0);
  } else {
    errorHandler("Please provide a valid type");
  }
};

module.exports = electrodeDocs;
