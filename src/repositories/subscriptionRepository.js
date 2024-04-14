
import Stripe from 'stripe';
import { PrismaClient } from "@prisma/client";

import getClient from "../libs/db.js";
import { BadRequest, NotFound } from "../middleware/errors.js";

const stripe = new Stripe(env.STRIPE_PUBLIC_KEY);

const customer = await stripe.customers.create({
  email: 'customer@example.com',
});



class subscriptionRepository {
    static #instance; // Propiedad estática para almacenar la única instancia

    #folderModel;

    constructor() {
        if (!subscriptionRepository.#instance) {
            subscriptionRepository.#instance = this;
            this.#folderModel = getClient().folder;
            // this.#folderModel = new PrismaClient().folder;
        }

        // Devolvemos la instancia existente
        return subscriptionRepository.#instance;
    }



    async createSubscription(data) {

        console.log(data)

        return {
            success: true,
            subscription: data
        }

        
    }
}

export default new subscriptionRepository();