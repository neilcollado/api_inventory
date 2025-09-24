"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const itemRoute_1 = __importDefault(require("./routes/itemRoute"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Serve uploads folder statically
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../public/uploads')));
// Routes
app.use('/auth', authRoute_1.default);
app.use('/item', itemRoute_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === "production") {
        console.log(`Server running on port ${PORT}`);
    }
    else {
        console.log(`Server running on http://localhost:${PORT}`);
    }
});
