"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkModel = void 0;
const mongoose_1 = require("mongoose");
const linkSchema = new mongoose_1.Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
});
exports.linkModel = (0, mongoose_1.model)("Link", linkSchema);
