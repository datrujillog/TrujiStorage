import Stripe from 'stripe';
import { PrismaClient } from "@prisma/client";

import { BadRequest, NotFound } from "../middleware/errors.js";
import getClient from "../libs/db.js";
import env from '../config/env.js';

// const stripe = new Stripe(env.STRIPE_PUBLIC_KEY);

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
            this.stripe = new Stripe(env.STRIPE_PUBLIC_KEY);
        }

        // Devolvemos la instancia existente
        return UserRepository.#instance;
    }

    async createUsers(data) {
        try {
            const customer = await stripe.customers.create({
                email:data.email,
                name:data.name
            })
            const user = await this.#userModel.create({
                data: {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    active: true,
                    subscription: {
                        create: {
                            stripeCustomerId: "customer_id",
                            // stripeCustomerId: customer.id,
                        }
                    }
                }

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

            const resulEmail = await this.#userModel.findUnique({
                where: {
                    email
                }
            });

            if (!resulEmail) throw new NotFound("User not found");

            return {
                success: true,
                resulEmail
            };
        } catch (error) {
            // Lanza el error en lugar de devolverlo para mantener el flujo de errores consistente
            throw error;
        }
    }
}

// Exporta una instancia única de UserRepository en lugar de la clase
export default new UserRepository();

