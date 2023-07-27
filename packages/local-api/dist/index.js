"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
/* eslint-disable */
const express_1 = __importDefault(require("express"));
const serve = (port, filename, dir) => {
    const app = (0, express_1.default)();
    console.log("Listening on port: ", port);
    return new Promise((resolve, reject) => {
        app.listen(port, resolve).on("error", reject);
    });
};
exports.serve = serve;
