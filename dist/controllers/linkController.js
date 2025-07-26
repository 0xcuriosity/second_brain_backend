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
exports.handleCreateLink = void 0;
const linkModel_1 = require("../models/linkModel");
const handleCreateLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { hash } = req.body;
    if (!hash) {
        return res.status(400).json({
            message: "hash required",
        });
    }
    try {
        const userId = req.userId;
        const link = yield linkModel_1.linkModel.create({
            hash,
            userId,
        });
        return res.status(200).json(link);
    }
    catch (error) {
        return res.status(500).json({
            message: "server Error",
            error,
        });
    }
});
exports.handleCreateLink = handleCreateLink;
