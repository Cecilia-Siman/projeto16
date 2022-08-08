import connection from "../db/postgres.js";
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

//signIn é login
export async function signin(req,res) {
    try {
        const user = req.body;
    
        const { rows:userInfo } = await connection.query(
          'SELECT * FROM users WHERE email = $1',
          [user.email]
        );
        if (userInfo.length === 0 || user.password !== userInfo[0].password) {
            return res.sendStatus(401);          
        }

        const dados = { email: userInfo[0].email };
        const chaveSecreta = process.env.JWT_SECRET;

        const token = jwt.sign(dados, chaveSecreta);
    
        res.send(token).status(201);
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
}