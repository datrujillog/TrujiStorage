
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

    #subscriptionsModel;

    constructor() {
        if (!subscriptionRepository.#instance) {
            subscriptionRepository.#instance = this;
            this.#subscriptionsModel = getClient().subscription;
            // this.#folderModel = new PrismaClient().subscription;
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