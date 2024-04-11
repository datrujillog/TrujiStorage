import { PrismaClient } from "@prisma/client";
import { BadRequest, NotFound } from "../middleware/errors.js";
import getClient from "../libs/db.js";

class UserRepository {
    static #instance; // Propiedad estática para almacenar la única instancia

    #userModel;

    constructor() {
        // Verificamos si ya hay una instancia creada
        if (!UserRepository.#instance) {
            // Si no hay una instancia, creamos una nueva y la asignamos a la propiedad estática
            UserRepository.#instance = this;
            // this.#userModel = new PrismaClient().user;
            this.#userModel = getClient().user;
        }

        // Devolvemos la instancia existente
        return UserRepository.#instance;
    }

    async createUsers(data) {
        try {
            const user = await this.#userModel.create({
                data
            });

            return {
                success: true,
                user
            };
        } catch (error) {
            console.log(error);
            return { success: false, error: { message: error.message } };
        }
    }

    async getByEmail(email) {
        try {
            if (email === undefined) throw new BadRequest("Email is required");

            const resultEmail = await this.#userModel.findUnique({
                where: {
                    email
                }
            });

            if (!resultEmail) throw new NotFound("User not found");

            return {
                success: true,
                resultEmail
            };
        } catch (error) {
            // Lanza el error en lugar de devolverlo para mantener el flujo de errores consistente
            throw error;
        }
    }
}

// Exporta una instancia única de UserRepository en lugar de la clase
export default new UserRepository();

