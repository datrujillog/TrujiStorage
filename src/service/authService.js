
import { BadRequest } from "../middleware/errors.js";

import { UserRepository } from "../repositories/userRepository.js";

import { compare, encrypt } from "../libs/bcrypt.js";
import { parseSignup } from "../helper/normalizeData.js";



class AuthService extends UserRepository {

    constructor() {
        super();

    }

    async login(data) {
        try {
            const { email, password } = data;
            
            const results = await this.getByEmail(email);
            if (!results.success) throw new BadRequest(results.error.message);

            await compare(password, results.results.password)
            const token = await this.crearToken(results);
            const user = results.results;

            return { 
                success: true, 
                user, token 
            };

        } catch (error) {
            return { success: false, error };
        }
    }

    async signup(body) {

        if (body.password) body.password = await encrypt(body.password);

        const save = await parseSignup(body)
        if (!save.success) throw new BadRequest(save.error);

        const users = await this.createUsers(save.user);
        if (!users.success) throw new BadRequest(users.error.message);

        const { user } = users;
        return {
            success: true,
            user
        }

    }




}

export default AuthService;