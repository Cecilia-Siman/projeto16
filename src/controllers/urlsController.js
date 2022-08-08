import connection from "../db/postgres.js";
import { nanoid } from "nanoid";

export async function shortenUrl(req,res) {

        try {
            const userInfo = res.locals.userInfo;

            const newUrl= req.body.url;
            let shortUrl = newUrl;
            shortUrl = nanoid();
        
            await connection.query(
            'INSERT INTO urls ("userId", url, "shortUrl", "visitCount") VALUES ($1, $2, $3, $4)',
            [userInfo[0].id, newUrl, shortUrl,0]
            );
            res.send({
                "shortUrl": shortUrl
            }).status(201);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
}

export async function urlById(req,res) {
    const id = parseInt(req.params.id);
    try {    
        const { rows:urlInfo } = await connection.query(
          'SELECT * FROM urls WHERE id = $1',
          [id]
        );
        if (urlInfo.length === 0){
            res.sendStatus(404);
            return;
        }
        const objUrl = {
            "id": urlInfo[0].id,
            "shortUrl": urlInfo[0].shortUrl,
            "url": urlInfo[0].url
        }

        res.send(objUrl).status(200);

      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
}

export async function urlRedirect(req,res) {
    try {
        const shortUrl= req.params.shortUrl;    
        

        const { rows:urlInfo } = await connection.query(
          'SELECT * FROM urls WHERE "shortUrl" = $1',
          [shortUrl]
        );
        if (urlInfo.length === 0){
            res.sendStatus(404);
            return;
        }

        let visits = parseInt(urlInfo[0].visitCount);
        visits +=1;
        const query = await connection.query(
            'UPDATE urls SET "visitCount"=$1 WHERE "shortUrl" = $2',
            [visits,shortUrl]
        );
        

        res.redirect(urlInfo[0].url);
        return;
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
}

export async function deleteUrl(req,res) {

    try {

            const userInfo = res.locals.userInfo;
            const id = parseInt(req.params.id);
            const { rows:urlInfo } = await connection.query(
                'SELECT * FROM urls WHERE id = $1',
                [id]
            );
            if (urlInfo.length=== 0) { // caso a url não exista
                return res.sendStatus(404);
            }
            if (userInfo[0].id !== urlInfo[0].userId){ // caso a url não seja do usuário
                return res.sendStatus(401);
            }  

            await connection.query(
            'DELETE FROM urls WHERE id = $1;',
            [id]
            );
            res.sendStatus(201);

        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }

}