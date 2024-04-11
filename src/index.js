import express from "express";
import { cleanEnv, str, port } from "envalid";
import morgan from "morgan";
import cookie from "cookie-parser";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from "./helper/swagger/swagger.js";
import router from "./routes/index.js";

const app = express();

// Middlewares globales
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());

// rutas
app.use(router);


// Configuración de la documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware de manejo de errores
app.use((error, req, res, next) => {
    console.error(error.message);
    res.status(500).json({ message: error.message || error });
});

export default app;
