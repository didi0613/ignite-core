"use strict";

const errorHandler = require("../lib/error-handler");
const opn = require('opn');

const electrodeDocs  = function(type){
  if(type === "oss") {
    opn("https://docs.electrode.io/");
    return process.exit(0);
  } else if(type === "wml") {
    opn("http://gitbook.qa.walmart.com/books/electrode-dev-guide/");
    return process.exit(0);
  } else {
    errorHandler("Please provide a valid type");
  }
}

module.exports = electrodeDocs;
