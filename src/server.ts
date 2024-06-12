import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import authenticateJWT from "./middleware/authenticateJWT";
import authRouter from "./routes/auth";
import User from "./models/User";

class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    private config() {
        this.app.set("port", process.env.PORT || 4040);
        this.app.use(morgan("dev"));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
        this.app.use(express.json());
    }

    private routes() {
        this.app.use("/auth", authRouter);

        // Ejemplo de una ruta protegida
        this.app.get("/posts", authenticateJWT, async (req, res) => {
            const posts = await User.find();
            res.json(posts);
        });
    }

    public start() {
        this.app.listen(this.app.get("port"), () => {
            console.log("El servidor está escuchando en el puerto", this.app.get("port"));
        });
    }
}

export { Server };
