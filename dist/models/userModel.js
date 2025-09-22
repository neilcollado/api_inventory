"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUserByEmail = exports.getAllUsers = void 0;
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const getAllUsers = () => prismaClient_1.default.user.findMany();
exports.getAllUsers = getAllUsers;
const getUserByEmail = (email) => prismaClient_1.default.user.findUnique({
    where: { email },
});
exports.getUserByEmail = getUserByEmail;
const createUser = (data) => prismaClient_1.default.user.create({ data });
exports.createUser = createUser;
