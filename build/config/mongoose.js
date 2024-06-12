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
const mongoose_1 = __importDefault(require("mongoose"));
const MONGO_URL = "mongodb+srv://etitcmongo:FCs2Ykz1T72vFNqV@cluster0.bftyrj1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    if (mongoose_1.default.connection.readyState === 0) {
        try {
            yield mongoose_1.default.connect(MONGO_URL, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true
            });
            console.log("Conexión a la base de datos establecida");
        }
        catch (error) {
            console.error("Error al conectar a la base de datos:", error);
        }
    }
    else {
        console.log("Ya hay una conexión a la base de datos activa");
    }
});
exports.default = connectToDatabase;
