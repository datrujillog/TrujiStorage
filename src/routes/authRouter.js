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
            const body = req.body;
            const response = await authService.login(body);
            if (!response.success) throw new BadRequest(response.error.message);
            const { user, token } = response;
            authResponse(res, 200, true, "User logged in", { payload: user, token });
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
