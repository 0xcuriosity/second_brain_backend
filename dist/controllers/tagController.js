"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetAllTags = exports.handlePostTag = void 0;
const tagModel_1 = require("../models/tagModel");
const handlePostTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({
            message: "title is required",
        });
    }
    try {
        const tag = yield tagModel_1.tagModel.create({ title });
        console.log(tag);
        return res.status(200).json(tag);
    }
    catch (error) {
        return res.status(400).json({
            message: "tag already exists",
        });
    }
});
exports.handlePostTag = handlePostTag;
const handleGetAllTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTags = yield tagModel_1.tagModel.find();
        return res.status(200).json(allTags);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});
exports.handleGetAllTags = handleGetAllTags;
