import express, { response } from "express";

import AuthService from "../service/authService.js";

import { errorResponse, authResponse, results } from "../helper/response.js";
import { BadRequest } from "../middleware/errors.js";
import env from "../config/env.js";
import { asyncHandler } from "../middleware/handler.js";



function authRouter(app) {
    const router = express.Router();

    //instanciar el servicio
    const authServ = new AuthService();

    app.use('/api/v1/auth', router);
    // app.use(env.AUTH_URL, router);

    router.post("/signup", async (req, res) => {

        try {

            const body = req.body;

            const response = await authServ.signup(body);
            if (!response.success) throw new BadRequest(response.error.message);

            const { user } = response;
            results(res, 200, true, "User create ", {
                results: user,
                // token,
            });

        } catch (error) {
            errorResponse(res, error.message);
        }

    })
}



export default authRouter;