require("dotenv").config();
const {userValidationLogin} = require("../validation/user");
const db = require("../db");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const secret = process.env.SECRET
const generateAccessToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, secret, {expiresIn: process.env.EXPIRE_TOKEN});
}

class AuthController {
    async login(req, res) {
        const {email, password} = req.body;
        const {error} = userValidationLogin(req.body);
        if (error) {
            return res.status(400).json({
                error: error.message,
            });
        }

        const userQuery = await db.query(`SELECT *
                                          FROM users
                                          WHERE email = $1;`, [email]);
        const user = userQuery.rows[0];
        if (!user) {
            return res.status(400).json({
                error: "User not found"
            });
        }

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(400).json({
                error: "wrong password"
            });
        }

        const token = generateAccessToken(user.id)
        return res.json({token})
    }
}

module.exports = new AuthController()