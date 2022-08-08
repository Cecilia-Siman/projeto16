import connection from "../db/postgres.js";
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

export async function tokenValidator(req,res,next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '')

    const secretkey = process.env.JWT_SECRET;

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const dados = jwt.verify(token, secretkey);
        
        const { rows:userInfo } = await connection.query(
        'SELECT * FROM users WHERE email = $1',
        [dados.email]
        );
    
        if (userInfo.length === 0) {
            console.log('deu certo!');
            return res.sendStatus(401);
        }

        res.locals.userInfo = userInfo;

        next();
    }   catch (error) {
        res.sendStatus(401);
        
    }
}