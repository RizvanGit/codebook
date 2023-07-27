"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCommand = void 0;
const commander_1 = require("commander");
//angle brackets for required value
//square brackets for optional value
exports.serveCommand = new commander_1.Command()
    .command("serve [filename]")
    .description("Open a file for editing")
    .option("-p, --port <number>", "port to run server on", "4005")
    .action((filename = "notebook.js", options) => {
    console.log("Getting ready to serve a file");
    console.log("filename: ", filename);
    console.log("options: ", options);
});