import express, { response } from "express";

import AuthService from "../service/authService.js";

import { errorResponse, authResponse, Responsee } from "../helper/response.js";
import { BadRequest } from "../middleware/errors.js";



function authRouter(app) {
    const router = express.Router();

    //instanciar el servicio
    const authServ = new AuthService();

    app.use("/api/v1/auth", router);

    router.post("/signup", async(req, res) => {

        try {

            const body = req.body;
            
            const response = await authServ.signup(body);
            if (!response.success) throw new BadRequest(response.error.message);
            
            const { insertedData } = response;
            Responsee(res, 200, true, "User create ", {
                payload: insertedData,
                // token,
            });
            
        } catch (error) {
            errorResponse(res, error.message);            
        }
        
    });
}



export default authRouter;