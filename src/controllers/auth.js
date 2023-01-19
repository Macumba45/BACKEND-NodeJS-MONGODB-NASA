import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
const saltRounds = 10;
const myPlainTextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextpassword = 'not_bacon';
import { getUserByEmail } from '../controllers/user.js';
const TOKEN_SECRET = 's0/\/\P4$$w0rD';



const signup = async ({ email, password }) => {
    const existedUser = await getUserByEmail(email);

    if (existedUser) {
        throw new Error('User already exists');
    }
    const hashedPassword = bcrypt.hash(myPlainTextPassword, saltRounds, function (err, hash) {
        // Store hash in your password DB.
    });

    const user = new User({ email, password: hashedPassword })
    await user.save()

    return jsonwebtoken.sign({ email: user.email }, TOKEN_SECRET)


}

export { signup }