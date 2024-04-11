import express from "express";
import { cleanEnv, str, port } from "envalid";
import morgan from "morgan";
import cookie from "cookie-parser";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from "./helper/swagger/swagger.js";
import authRouterInstance from "./routes/authRouter.js"; // Importar el enrutador de autenticación como un Singleton
import fileRouter from "./routes/fileRouter.js";
import fileEjemploRouter from "./routes/fileEjemploRouter.js";

// const { str, port } = envalid;
const app = express();

// Middlewares globales
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookie());

// Configuración de rutas
app.use('/api/v1/auth', authRouterInstance); // Usar el enrutador de autenticación Singleton
app.use('/api/v1/file', fileRouter);
app.use('/api/v1/file-ejemplo', fileEjemploRouter);

// Configuración de la documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware de manejo de errores
app.use((error, req, res, next) => {
    console.error(error.message);
   res.status(500).json({ message:  error.message || error });
});

export default app;
