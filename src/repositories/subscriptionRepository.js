
import Stripe from 'stripe';
import { PrismaClient } from "@prisma/client";

import getClient from "../libs/db.js";
import { BadRequest, NotFound } from "../middleware/errors.js";
import env from '../config/env.js';

// const stripe = new Stripe(env.STRIPE_PUBLIC_KEY);




class SubscriptionRepository {
    static #instance; // Propiedad estática para almacenar la única instancia

    #subscriptionsModel;
    #stripe;

    constructor() {
        if (!SubscriptionRepository.#instance) {
            SubscriptionRepository.#instance = this;
            this.#subscriptionsModel = getClient().subscription;
            // this.#subscriptionsModel = new PrismaClient().subscription;
            this.#stripe = new Stripe(env.STRIPE_SECRET_KEY);
        }

        // Devolvemos la instancia existente
        return SubscriptionRepository.#instance;
    }



    async createSubscription(customerId, priceId) {

        try {

            const subscription = await this.#stripe.subscriptions.create({
                customer: customerId,
                items: [
                    { price: priceId },
                ],
                payment_behavior: 'default_incomplete',  // es la linea  es para que si no se completa el pago se cancele la suscripcion
                expand: ['latest_invoice.payment_intent'],  // es para que se muestre el intento de pago en la respuesta
            });

            // console.log(subscription);

            // const userId = '64'
            // const newSubscription = await this.#subscriptionsModel.create({
            //     data: {
            //         stripeSubscriptionId: subscription.id,
            //         stripeCustomerId: customerId,
            //         // stripePriceId: priceId,
            //         // status: subscription.status,
            //         user: {
            //             connect: {
            //                 // id: Number.parseInt(userId)
            //                 id: Number.parseInt(64)
            //             }

            //         }
            //     }
            // });

            return {
                succes: true,
                subscription: {
                    stripeSubscriptionId: subscription.id,
                    stripeCustomerId: customerId,
                    stripePriceId: priceId,
                    status: subscription.status,
                    billing_details: subscription.billing_details,
                    payment_intent: subscription.latest_invoice.payment_intent,  //el intento de pago
                    //el numero de la factura
                    invoice: subscription.latest_invoice,
                },
                subscriptionID: subscription.id,
                clientSecret: subscription.latest_invoice.payment_intent.client_secret

            };

        } catch (error) {
            console.log(error);
            // return { success: false, error: { message: error.message } };
            throw new BadRequest(error.message);
        }

    }

    async activateSubscription(idCustomer, subscriptionId, type) {
        
        try {

            const user = await this.#subscriptionsModel.updateMany({
                where: {
                    stripeCustomerId: idCustomer
                },
                data: {
                    type: "PREMIUM",
                    stripeSubscriptionId: subscriptionId
                }
            });

            console.log("PREMIUM ",user);

            return user;

        } catch (error) {
            throw new BadRequest(error.message);
        }
    }
}


export default new SubscriptionRepository();