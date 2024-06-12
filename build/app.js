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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const auth_1 = __importDefault(require("./routes/auth"));
const Post_1 = __importDefault(require("./models/Post"));
const authenticateJWT_1 = __importDefault(require("./middleware/authenticateJWT"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
// Rutas de autenticación
app.use("/auth", auth_1.default);
// Rutas protegidas
app.get("/posts", authenticateJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield Post_1.default.find();
    res.json(posts);
}));
app.post("/posts", authenticateJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = new Post_1.default(req.body);
    yield post.save();
    res.status(201).json(post);
}));
app.put("/posts/:id", authenticateJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield Post_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(post);
}));
app.delete("/posts/:id", authenticateJWT_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Post_1.default.findByIdAndDelete(req.params.id);
    res.status(204).send();
}));
mongoose_1.default.connect("mongodb://localhost:27017/tuBaseDeDatos", { useNewUrlParser: true, useUnifiedTopology: true });
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
