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
            this.stripe = new Stripe(env.STRIPE_SECRET_KEY);
        }

        // Devolvemos la instancia existente
        return UserRepository.#instance;
    }

    async createUsers(data) {

        try {

            await this.existingUser(data.email);
            const customer = await this.stripe.customers.create({
                email: data.email,
                name: data.name
            })
            const user = await this.#userModel.create({
                data: {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    active: true,
                    subscription: {
                        create: {
                            // stripeCustomerId: "ejmplo",
                            stripeCustomerId: customer.id,
                        }
                    }
                },
                include: {
                    subscription: true
                }

            });

            if (!user) throw new BadRequest("Error creating user");

            return {
                success: true,
                user
            };

        } catch (error) {
            if (error.code === "P2002") {
                throw new BadRequest("Email already exists");
            }
            console.log(error);
            throw new BadRequest(error.message);
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

    async existingUser(data) {
        try {
            const existingUser = await this.#userModel.findUnique({
                where: {
                    email: data
                }
            });

            if (existingUser) {
                throw new NotFound("Email already exists");
            }


            return {
                success: true,
                existingUser
            };
        } catch (error) {
            // Lanza el error en lugar de devolverlo para mantener el flujo de errores consistente
            throw new BadRequest(error);
        }
    }
}

// Exporta una instancia única de UserRepository en lugar de la clase
export default new UserRepository();

