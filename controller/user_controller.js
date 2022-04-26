const db = require('../db')

class UserController{
    async createUser(req,res){
    const {first_name,last_name,email,phone} = req.body
   const newUser = await db.query(`INSERT INTO users (first_name,last_name,email,phone) values ($1, $2, $3, $4) 
   RETURNING *`, [first_name,last_name,email,phone]);

        res.json(newUser.rows[0]);
    }
    async getUser(req,res){
    const id = req.params.id;
    const user = await db.query('SELECT * FROM users where id = $1',[id]);
    res.json(user.rows[0]);
    }

    async updateUser(req,res){
        const {id,first_name,last_name,email,phone} = req.body;
        const user = await db.query(
            'UPDATE users set first_name=$1,last_name=$2,email=$3,phone=$4 where id = $5 RETURNING *',
            [first_name,last_name,email,phone,id]
        )
        res.json(user.rows[0]);
    }
}

module.exports = new UserController()