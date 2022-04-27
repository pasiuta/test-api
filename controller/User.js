const {io} = require("socket.io-client");
const db = require('../db')
const bcrypt = require('bcrypt')
const {userValidationCreate} = require("../validation/user");
const {userValidationGet} = require("../validation/user");
const socket = io(process.env.SOCKET_HOST);
socket.on("connect", () => {
    console.log(`You are connected with id : ${socket.id}`)
});

class UserController {
    async createUser(req, res) {
        const {first_name, last_name, email, phone, password} = req.body
        const {error} = userValidationCreate(req.body);
        if (error) {
            return res.status(400).json({
                error: error.message,
            });
        }

        const queryUser = await db.query(`SELECT *
                                          FROM users
                                          WHERE email = $1;`, [email]);
        const user = queryUser.rows[0];
        if (user) {
            return res.status(400).json({
                error: "User with current email already exist"
            });
        }

        const hashPassword = await bcrypt.hash(password, 7)
        const newUser = await db.query(`INSERT INTO users (first_name, last_name, email, phone, password)
                                        values ($1, $2, $3, $4, $5) RETURNING *`,
            [first_name, last_name, email, phone, hashPassword])
        const createdUser = newUser.rows[0];
        delete createdUser.password;
        res.json(createdUser);
    }

    async getUser(req, res) {
        const id = req.params.id;
        const {error} = userValidationGet({id});
        if (error) {
            return res.status(400).json({
                error: error.message,
            });
        }

        const user = await db.query('SELECT * FROM users where id = $1', [id]);
        if (!user.rows[0]) {
            return res.status(404).json({
                error: "user not found",
            });
        }

        res.json(user.rows[0]);
    }

    async updateUser(req, res) {
        const {id, first_name, last_name, email, phone} = req.body;
        const {error} = userValidationGet({id});
        if (error) {
            return res.status(400).json({
                error: error.message,
            });
        }

        const user = await db.query(`SELECT *
                                     FROM users
                                     WHERE id = $1`, [id]);
        if (!user.rows[0]) {
            return res.status(404).json({
                error: "user not found"
            });
        }

        if (req.body.email != undefined) {
            const checkEmail = await db.query('select * from users where email = $1', [email]);

            if (checkEmail.rows[0]) {
                return res.status(400).json({
                    error: "user with this email already exist",
                });
            }
        }

        const updatedUser = await db.query(
            'UPDATE users set first_name=$1,last_name=$2,email=$3,phone=$4 where id = $5 RETURNING *',
            [first_name || user.first_name, last_name || user.last_name, email || user.email, phone || user.phone, id]
        )
        res.json(updatedUser.rows[0]);
        socket.emit("userUpdated", updatedUser.rows[0]);

    }
}

module.exports = new UserController()
