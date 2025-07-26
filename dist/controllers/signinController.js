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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSignIn = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = require("../models/userModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret";
const handleSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(403).json({
                message: "username and password required",
            });
        }
        const foundUser = yield userModel_1.userModel.findOne({
            username,
        });
        if (!foundUser) {
            return res.status(403).json({
                message: "username not registered",
            });
        }
        const match = yield bcrypt_1.default.compare(password, foundUser === null || foundUser === void 0 ? void 0 : foundUser.password);
        if (!match) {
            return res.status(403).json({
                message: "invalid password",
            });
        }
        // if control reaches here, the passwords match
        const accessToken = jsonwebtoken_1.default.sign({
            id: foundUser._id,
        }, JWT_SECRET);
        return res.status(200).json({
            token: accessToken,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "server error",
            error,
        });
    }
});
exports.handleSignIn = handleSignIn;
