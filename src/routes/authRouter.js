import express from "express";
import authService from "../service/authService.js";
import { errorResponse, authResponse, results } from "../helper/response.js";
import { BadRequest } from "../middleware/errors.js";
import env from "../config/env.js";
import { asyncHandler } from "../middleware/handler.js";

class AuthRouter {
    static #instance;

    constructor() {
        if (!AuthRouter.#instance) {
            AuthRouter.#instance = this;
            this.router = express.Router();
            this.setupRoutes();
        }

        return AuthRouter.#instance;
    }

    setupRoutes() {
        this.router.post("/signup", asyncHandler(async (req, res) => {
            const body = req.body;
            const response = await authService.signup(body);
            if (!response.success) throw new BadRequest(response.error.message);
            const { user } = response;
            results(res, 200, true, "User created", { results: user });
        }));

        this.router.post("/login", asyncHandler(async (req, res) => {
            try {
                const body = req.body;
                const response = await authService.login(body);
                if (!response.success) throw new BadRequest(response.error.message);
                response.success
                    ? res.cookie("token", response.token, {
                        httpOnly: true,
                        expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day
                        secure: false,
                    }) &&
                    authResponse(res, 201, true, "signup successful", {
                        payload: response.user,
                        token: response.token,
                    })
                    : errorResponse(res, response.error);
            } catch (error) {
                errorResponse(res, error);
            }
        }));

        // Puedes agregar más rutas aquí si es necesario
    }
    // esta linea  es para que se pueda exportar el router y se pueda usar en el index.js 
    getRouter() {
        return this.router;
    }
}

const authRouterInstance = new AuthRouter();
export default authRouterInstance.getRouter();
