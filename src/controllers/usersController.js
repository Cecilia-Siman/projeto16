import connection from "../db/postgres.js";
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

export async function users(req,res) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '')

    const secretkey = process.env.JWT_SECRET;

    try {
        const dados = jwt.verify(token, secretkey);
        // dados agora terá { email: "emaildapessoa@email.com" }

        try {
            const { rows:userInfo } = await connection.query(
            'SELECT * FROM users WHERE email = $1',
            [dados.email]
            );
        
            if (userInfo.length === 0) {
                return res.sendStatus(401);
            }
        
            let {rows:sumVisits} = await connection.query(
                'SELECT sum("visitCount") FROM urls WHERE "userId"=$1 GROUP BY "userId"',
            [userInfo[0].id]
            );
            
            console.log("soma:",sumVisits);
            const {rows:urlsList} = await connection.query(
                'SELECT id,url,"shortUrl","visitCount" FROM urls WHERE "userId"=$1',
                [userInfo[0].id]
            )    
            //console.log(urlsList);

            if (sumVisits.length === 0){
                const objUser = {
                    id: userInfo [0].id,
                    name: userInfo [0].name,
                    visitCount: 0,
                    shortenedUrls: urlsList
                }
    
    
    
                return res.send(objUser).status(201);
            }
            
            const objUser = {
                id: userInfo [0].id,
                name: userInfo [0].name,
                visitCount: parseInt(sumVisits[0].sum),
                shortenedUrls: urlsList
            }



            res.send(objUser).status(201);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }   catch (error) {
        //console.log(error);
        res.sendStatus(401);
        
    }
}