"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProjectValidation = void 0;
var joi_1 = require("joi");
exports.createProjectValidation = joi_1.default.object({
    image: joi_1.default.string().required(),
    stacks: joi_1.default.string().required(),
    name: joi_1.default.string().required(),
    description: joi_1.default.string().optional(),
    url: joi_1.default.string(),
});
