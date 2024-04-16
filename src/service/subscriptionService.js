import Stripe from 'stripe';

import subscriptionRepository from '../repositories/subscriptionRepository.js';

import { BadRequest } from '../middleware/errors.js';
import env from '../config/env.js';

const stripe = new Stripe(env.STRIPE_PUBLIC_KEY);

// const customer = await stripe.customers.create({
//   email: 'customer@example.com',
// });



class SubscriptionService {
    static #instance;

    constructor() {
        if (!SubscriptionService.#instance) {
            SubscriptionService.#instance = this;
        }

        return SubscriptionService.#instance;
    }

    async createSubscription(customerId, priceId) {

       

            const subscription = await subscriptionRepository.createSubscription(customerId, priceId);  

            // const data = {
            //     stripeSubscriptionId: subscription.id,
            //     stripeCustomerId: customerId,
            //     stripePriceId: priceId,
            //     status: subscription.status,
            // }


            return {
                success: true,
                subscription
            }
    }




}

export default new SubscriptionService();
