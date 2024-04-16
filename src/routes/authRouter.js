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
        this.router.post("/signup", async (req, res) => {

            try {

                const body = req.body;
                const response = await authService.signup(body);
                if (!response.success) throw new BadRequest(response.error.message);
                const { user } = response;
                results(res, 200, true, "User created", { results: user });

            } catch (error) {
                errorResponse(res, error.message);

            }

        });

        this.router.post("/login", async (req, res) => {
            try {
                const body = req.body;
                const response = await authService.login(body);
                const { success, token, user, error } = response;
                if (success) {
                    res.cookie("token", token, {
                        httpOnly: true,
                        expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day
                        // sameSite: "strict", // "strict" | "lax" | "none"
                        secure: false,
                    });
                    authResponse(res, 201, true, "signup successful", { payload: user, token });
                } else {
                    errorResponse(res, error);
                }
            } catch (error) {
                // Manejar errores generales
                errorResponse(res, error);
            }
        });

        this.router.get("/logout", async (req, res) => {
            res.clearCookie("token");
            res.status(200).json({ message: "Logged out" });
        });

        this.router.post("/validate", async (req, res) => {
            try {
                const { token } = req.body;
                const response = await authService.verifyToken(token);
                const { success, data, message } = response;
                if (success) {
                    authResponse(res, 200, success, message, { payload: data, token });
                } else {
                    errorResponse(res, { message });
                }
            } catch (error) {
                errorResponse(res, error);
            }
        });


        // Puedes agregar más rutas aquí si es necesario
    }
    // esta linea  es para que se pueda exportar el router y se pueda usar en el index.js 
    getRouter() {
        return this.router;
    }
}

const authRouterInstance = new AuthRouter();
export default authRouterInstance.getRouter();
