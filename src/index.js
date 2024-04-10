
import express from "express";
import { cleanEnv, str, port } from "envalid";
import morgan from "morgan";
import cookie from "cookie-parser";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from "./helper/swagger/swagger.js";


// const { str, port } = envalid;
const app = express();



//importar las rutas 
import auth from "./routes/authRouter.js";
// import file from "./routes/fileRouter.js";
import fileEjemploRouter from "./routes/fileEjemploRouter.js";



//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookie());


// importar las rutas
auth(app)
// file(app)
fileEjemploRouter(app)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))


//middleware de errores
app.use((error, req, res, next) => {
    console.error(error.message);
   res.status(500).json({ message:  error.message || error });
  
  });

  
export default app;