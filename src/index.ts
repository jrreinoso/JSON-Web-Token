import { Server } from "./server";
import connectToDatabase from "./config/mongoose"; // Importa la conexión a la base de datos

const startServer = async () => {
    await connectToDatabase(); // Conéctate a la base de datos antes de iniciar el servidor

    const server = new Server();
    server.start();
};

startServer();
