import user from "../models/user.js";
import {createToken} from "../utils/tokens.js"

export async function register(req, res)
{
    try {
        const {username, password} = req.body;
        // check if the user name foundnpm install express mysql2 sequelize
        const foundUser = await user.findOne({where: {username}});
        if (foundUser) {
            return res.json({message: "This user is already registered!"});
        }

        // execute the registration
        const newUser = await user.create({username: username, password: password});
        res.json({message: "User registered successfully!"});
    }
    catch (error) {
        res.status(500).json({message: "Internal Server Error!!"});
    }
}

export async function login(req, res)
{
    try {
        const {username, password} = req.body;

        // check if user registered or not
        const registeredUser = await user.findOne({where: {username}});
        if (!registeredUser) {
            return res.json({message: "Invalid Credentials!"});
        }

        // create token
        const token = createToken(registeredUser.id, username);

        return res.json({ message: "User logged in successfully!", token });

    } catch (error) {

        res.status(500).json({ message: "Internal Server Error!!" });

    }
}