
import { ObjectId } from 'mongodb';
// import log4js from 'log4js'
import { BadRequest } from '../middleware/errors.js';
// import ProductService from '../service/productService.js';



// const log = log4js.getLogger(`${process.env.NODE_ENV} - normalizeData`);


const Ejemplo = async (body, businessId, user, results) => {
    const requiredFields = ['tableId', 'servidores'];

    try {
        for (const field of requiredFields) {
            if (!(field in body)) {
                throw new BadRequest(`Falta el campo obligatorio: ${field}`);
            }
        }

        

        

    } catch (error) {
        return { success: false, error: error.message };
    }
};


const parseSignup = async (body) => {
    const requiredFields = ['name'];

    try {
        for (const field of requiredFields) {
            if (!(field in body)) {
                throw new BadRequest(`Falta el campo obligatorio: ${field}`);
            }
        }

        const user = {
            name: body.name,
        }

        return { success: true, user };

        

    } catch (error) {
        return { success: false, error: error.message };
    }
}; 









export {
    parseSignup
}