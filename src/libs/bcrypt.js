import bcrypt from 'bcryptjs';
import { BadRequest } from '../middleware/errors';

export async function encrypt(string) {

    try {

        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(string, salt);

        return hash;

    } catch (error) {
        console.error(error);
        throw new BadRequest(error);
    }
}



export async function compare(string, hash) {

    try {

        const match = await bcrypt.compare(string, hash);

        if (!match) throw new BadRequest("Invalid password");

        return true;

    } catch (error) {
        console.error(error);
        throw new BadRequest(error);
    }
}