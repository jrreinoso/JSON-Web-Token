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
exports.AuthRouter = void 0;
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
class AuthRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.secretKey = "MiClave"; // Cambiar por una clave secreta fuerte
        this.routes();
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            try {
                const user = new User_1.default({ username, password });
                yield user.save();
                return res.status(201).send("Usuario registrado exitosamente");
            }
            catch (error) {
                return res.status(500).send("Error al registrar el usuario");
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            try {
                const user = yield User_1.default.findOne({ username });
                if (!user || !(yield user.comparePassword(password))) {
                    return res.status(401).send("Credenciales incorrectas");
                }
                const token = jsonwebtoken_1.default.sign({ id: user._id }, this.secretKey, { expiresIn: "1h" });
                return res.status(200).json({ token });
            }
            catch (error) {
                console.error(error); // Añadir esta línea para imprimir el error
                return res.status(500).send("Error al iniciar sesión");
            }
        });
    }
    routes() {
        // Asegúrate de vincular los métodos al contexto de la clase
        this.router.post("/register", (req, res) => this.register(req, res));
        this.router.post("/login", (req, res) => this.login(req, res));
    }
}
exports.AuthRouter = AuthRouter;
const authRoutes = new AuthRouter();
exports.default = authRoutes.router;
