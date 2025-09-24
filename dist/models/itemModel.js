"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItem = exports.deleteItem = exports.createItem = exports.getItemById = exports.getAllItems = void 0;
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const getAllItems = () => prismaClient_1.default.item.findMany();
exports.getAllItems = getAllItems;
const getItemById = (id) => prismaClient_1.default.item.findUnique({
    where: { id },
});
exports.getItemById = getItemById;
const createItem = (data) => prismaClient_1.default.item.create({ data });
exports.createItem = createItem;
const deleteItem = (id) => prismaClient_1.default.item.delete({
    where: { id },
});
exports.deleteItem = deleteItem;
const updateItem = (id, data) => prismaClient_1.default.item.update({
    where: { id },
    data,
});
exports.updateItem = updateItem;
