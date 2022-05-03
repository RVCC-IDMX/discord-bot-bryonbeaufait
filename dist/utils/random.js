"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getRandomINt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
exports.default = getRandomINt;
