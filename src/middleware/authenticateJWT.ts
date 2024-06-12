import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secretKey = "MiClave"; // Debe ser la misma clave usada para generar el token

interface JwtPayload {
    id: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        return res.status(401).send("Acceso denegado");
    }
    try {
        const decoded = jwt.verify(token, secretKey) as JwtPayload;
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send("Token inválido");
    }
};

export default authenticateJWT;
