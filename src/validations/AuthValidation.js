"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = void 0;
var joi_1 = require("joi");
exports.loginValidation = joi_1.default.object({
    username: joi_1.default.string().max(100).required(),
    password: joi_1.default.string().max(100).required(),
});
