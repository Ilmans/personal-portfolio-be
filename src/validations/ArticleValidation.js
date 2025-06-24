"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArticleValidation = exports.updateArticleValidation = exports.createArticleValidation = void 0;
var joi_1 = require("joi");
exports.createArticleValidation = joi_1.default.object({
    title: joi_1.default.string().min(10).max(100).required(),
    categoryId: joi_1.default.number().required(),
    body: joi_1.default.string().min(100).required(),
    published: joi_1.default.number().optional(),
});
exports.updateArticleValidation = joi_1.default.object({
    id: joi_1.default.number().required(),
    title: joi_1.default.string().min(10).max(100).optional(),
    categoryId: joi_1.default.number().optional(),
    body: joi_1.default.string().min(100).optional(),
    published: joi_1.default.number().optional(),
});
exports.deleteArticleValidation = joi_1.default.object({
    articleId: joi_1.default.number().required(),
});
