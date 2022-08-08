import connection from "../db/postgres.js";

//signUp é cadastro
export async function signup(req,res) {
    try {
        const newUser = req.body;
    
        const { rowCount } = await connection.query(
          'SELECT * FROM users WHERE email = $1',
          [newUser.email]
        );
    
        if (rowCount > 0) {
            return res.sendStatus(409);
          
        }
    
        await connection.query(
          'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
          [newUser.name, newUser.email, newUser.password]
        );
    
        res.sendStatus(201);
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
}