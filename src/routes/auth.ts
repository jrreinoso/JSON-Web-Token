import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User"; 

class AuthRouter {
    public router: Router;
    private secretKey: string;

    constructor() {
        this.router = Router();
        this.secretKey = "MiClave"; // Cambiar por una clave secreta fuerte
        this.routes();
    }

    private async register(req: Request, res: Response): Promise<Response> {
        const { username, password } = req.body;
        try {
            const user = new User({ username, password });
            await user.save();
            return res.status(201).send("Usuario registrado exitosamente");
        } catch (error) {
            return res.status(500).send("Error al registrar el usuario");
        }
    }

    private async login(req: Request, res: Response): Promise<Response> {
        const { username, password } = req.body;
        try {
            const user = await User.findOne({ username });
            if (!user || !(await user.comparePassword(password))) {
                return res.status(401).send("Credenciales incorrectas");
            }
            const token = jwt.sign({ id: user._id }, this.secretKey, { expiresIn: "1h" });
            return res.status(200).json({ token });
        } catch (error) {
            console.error(error); // Añadir esta línea para imprimir el error
            return res.status(500).send("Error al iniciar sesión");
        }
    }

    private routes(): void {
        // Asegúrate de vincular los métodos al contexto de la clase
        this.router.post("/register", (req, res) => this.register(req, res));
        this.router.post("/login", (req, res) => this.login(req, res));
    }
}

const authRoutes = new AuthRouter();
export { AuthRouter };
export default authRoutes.router;
