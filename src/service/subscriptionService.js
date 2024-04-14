
import Stripe from 'stripe';

import { BadRequest } from '../middleware/errors.js';
import env from '../config/env.js';

const stripe = new Stripe(env.STRIPE_PUBLIC_KEY);

// const customer = await stripe.customers.create({
//   email: 'customer@example.com',
// });

console.log(customer.id);


class SubscriptionService {
    static #instance;

    constructor() {
        if (!SubscriptionService.#instance) {
            SubscriptionService.#instance = this;
        }

        return SubscriptionService.#instance;
    }

    async createSubscription(data) {

        console.log(data)

        return {
            success: true,
            subscription: data
        }

        
    }

    

    
}

export default new SubscriptionService();
