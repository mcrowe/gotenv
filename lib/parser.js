"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parse(body) {
    const map = {};
    for (let line of body.split('\n')) {
        // matching "KEY' and 'VAL' in 'KEY=VAL'
        const keyValueArr = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/);
        // matched?
        if (keyValueArr != null) {
            const key = keyValueArr[1];
            // default undefined or missing values to empty string
            let value = keyValueArr[2] ? keyValueArr[2] : '';
            // expand newlines in quoted values
            const len = value ? value.length : 0;
            if (len > 0 && value.charAt(0) === '"' && value.charAt(len - 1) === '"') {
                value = value.replace(/\\n/gm, '\n');
            }
            // remove any surrounding quotes and extra spaces
            value = value.replace(/(^['"]|['"]$)/g, '').trim();
            map[key] = value;
        }
    }
    return map;
}
exports.default = { parse };
