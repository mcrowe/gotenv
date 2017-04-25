"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const parser_1 = require("./parser");
const ENCODING = 'utf8';
const ENV_PATH = '.env';
const ENV_TEST_PATH = '.env.test';
function run() {
    const path = getFilePath();
    if (path) {
        const body = fs.readFileSync(path, ENCODING);
        const map = parseSafe(path, body);
        mergeEnvMap(map);
    }
}
exports.default = { run };
function getFilePath() {
    if (isTestEnvironment() && fs.existsSync(ENV_TEST_PATH)) {
        return ENV_TEST_PATH;
    }
    else if (fs.existsSync(ENV_PATH)) {
        return ENV_PATH;
    }
}
function parseSafe(path, body) {
    try {
        return parser_1.default.parse(body);
    }
    catch (e) {
        console.error(`Gotenv found that your ${path} file was invalid. Aborting...`);
        process.exit();
    }
}
function isTestEnvironment() {
    return process.env.NODE_ENV == 'test';
}
function mergeEnvMap(map) {
    for (let key in map) {
        process.env[key] = map[key] || process.env[key];
    }
}
