"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cowsay = tslib_1.__importStar(require("cowsay"));
const random_1 = tslib_1.__importDefault(require("./random"));
const quotes_json_1 = tslib_1.__importDefault(require("./quotes.json"));
function default_1(file) {
    let quote = (0, random_1.default)(0, quotes_json_1.default.length);
    const randomQuote = quotes_json_1.default[quote];
    let opts = {
        text: `${randomQuote.quote} - ${randomQuote.author}`,
    };
    if (file) {
        opts.f = file;
        opts.r = false;
    }
    else {
        opts.r = true;
    }
    let str = '';
    try {
        str = cowsay.say(opts);
        console.log(`str after cowsay is ${str}`);
    }
    catch {
        str = 'This is not available';
        console.log(`cowsay had a error`);
    }
    str = str.replace(/```/g, "'''");
    if (str.length > 1994) {
        str = str.substring(0, 1994);
    }
    return `\`\`\`${str}\`\`\``;
}
exports.default = default_1;
