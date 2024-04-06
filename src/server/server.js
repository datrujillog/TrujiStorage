import colors from "colors";
import envalid from "envalid";

import app from "../index.js";
import  env  from "../config/env.js"
import db from "../database/db.js";



const startServer = async () => {
    await db
    app.listen(env.PORT, () => {
        console.log("")
        console.log(`Server is running on port ${env.PORT}`.bgBlue.black);
        console.log("")
        console.log(`http://localhost:${env.PORT}`.bgBlue.bgBlack);
    });
}

startServer();