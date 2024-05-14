import { BadRequest } from "../middleware/errors.js";
import userRepository from "../repositories/userRepository.js";
import { compare, encrypt } from "../libs/bcrypt.js";
import { createToken } from "../libs/jwt.js";
import { parseSignup } from "../helper/normalizeData.js";
import { verifyToken } from "../middleware/auth.js";

class AuthService {
    static #instance; 

    constructor() {
        if (!AuthService.#instance) {

            AuthService.#instance = this;
        }

        return AuthService.#instance;
    }

    async login(data) {
        const { email, password } = data;
        const results = await userRepository.getByEmail(email);

        const { resulEmail } = results;
        await compare(password, resulEmail.password)
        const token = await createToken(resulEmail);

        return {
            success: true,
            user: resulEmail,
            token
        };
    }

    async signup(body) {
        if (body.password) body.password = await encrypt(body.password);

        const save = await parseSignup(body)
        if (!save.success) throw new BadRequest(save.error);

        const users = await userRepository.createUsers(save.user);
        // if (!users.success) throw new BadRequest(users.error);

        const { user } = users;
        return {
            success: true,
            user
        }
    }

    async verifyToken(token) {
        const data = await verifyToken(token);
        console.log(data)
        return {
            success: true,
            data,
            message: 'Token is valid',
        }
    }
    
}

export default new AuthService();
