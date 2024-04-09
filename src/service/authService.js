import { parseSignup } from "../helper/normalizeData.js";
import { BadRequest } from "../middleware/errors.js";
import { UserRepository } from "../repositories/userRepository.js";



class AuthService extends UserRepository {

    constructor() {
        super();

    }

    async login(data) {
        try {
            const { email, password } = data;
            const results = await this.getByEmail(email);
            if(!results.success) throw new BadRequest(results.error.message);

            
            //   await this.#compare(password, results.results.password);
            const token = await this.crearToken(results);
            const user = results.results;
            return { success: true, user, token };
        } catch (error) {
            return { success: false, error };
        }
    }

    async signup(body) {

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