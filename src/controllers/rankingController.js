import connection from "../db/postgres.js";

export async function ranking(req,res) {
    try {
        let { rows:ranking} = await connection.query(
        'SELECT users.id, name, count(urls.id) as "linksCount", sum("visitCount") as "visitCount" from users left join urls on users.id = urls."userId" group by urls."userId", users.id  order by "visitCount" asc limit 10;'
        );
        for (let i=0;i<ranking.length;i++){
            if (ranking[i].visitCount === null){
                ranking[i].visitCount = 0;
            }
            ranking[i].linksCount = parseInt(ranking[i].linksCount); 
            ranking[i].visitCount = parseInt(ranking[i].visitCount); 
        }

        res.send(ranking).status(201);

    }   catch (error) {
        //console.log(error);
        res.sendStatus(401);
        
    }
}