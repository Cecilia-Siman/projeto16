import connection from "../db/postgres.js";

import dotenv from 'dotenv';
dotenv.config();

export async function users(req, res) {
    const userInfo = res.locals.userInfo;

    try {

        let { rows: sumVisits } = await connection.query(
            'SELECT sum("visitCount") FROM urls WHERE "userId"=$1 GROUP BY "userId"',
            [userInfo[0].id]
        );

        const { rows: urlsList } = await connection.query(
            'SELECT id,url,"shortUrl","visitCount" FROM urls WHERE "userId"=$1',
            [userInfo[0].id]
        )

        if (sumVisits.length === 0) {
            const objUser = {
                id: userInfo[0].id,
                name: userInfo[0].name,
                visitCount: 0,
                shortenedUrls: urlsList
            }



            return res.send(objUser).status(201);
        }

        const objUser = {
            id: userInfo[0].id,
            name: userInfo[0].name,
            visitCount: parseInt(sumVisits[0].sum),
            shortenedUrls: urlsList
        }



        return res.send(objUser).status(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

}