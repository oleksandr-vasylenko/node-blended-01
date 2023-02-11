// index.js
const argv = require("yargs").argv;
const { sum, minus, mult, divide } = require("./functions");

// TODO: рефакторить
function invokeAction({ action, arg1, arg2 }) {
  switch (action) {
    case "sum":
      sum(arg1, arg2);
      break;

    case "minus":
      minus(arg1, arg2);
      break;

    case "mult":
      mult(arg1, arg2);
      break;

    case "divide":
      divide(arg1, arg2);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
