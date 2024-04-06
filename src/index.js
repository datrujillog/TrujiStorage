
import express from "express";
// import morgan from "morgan";
// import cookie from "cookie-parser";
// import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from "./helper/swagger/swagger.js";
// import express from "express";
// import morgan from "morgan";
// import cookie from "cookie-parser";
// import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from "./helper/swagger/swagger.js";

const app = express();


//middlewares
// app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
// app.use(cookie());


app.listen(3000, () => {
    console.log("Server is running on port 3000");
}
);