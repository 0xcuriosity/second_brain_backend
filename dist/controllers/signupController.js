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
exports.handleSignUp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userValidator_1 = require("../validators/userValidator");
const userModel_1 = require("../models/userModel");
const handleSignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("signup");
    console.log(req.body);
    try {
        const userValidation = userValidator_1.userValidator.safeParse(req.body);
        if (!userValidation.success) {
            return res.status(411).json({
                message: userValidation.error,
            });
        }
        const { username, password } = userValidation.data;
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const createdUser = yield userModel_1.userModel.create({
            username,
            password: hashedPassword,
        });
        return res.status(200).json(createdUser);
    }
    catch (error) {
        console.log(error);
        if (error.code === 11000) {
            return res.status(403).json({
                message: "username already taken",
            });
        }
        return res.status(500).json({
            message: "server error",
        });
    }
});
exports.handleSignUp = handleSignUp;
