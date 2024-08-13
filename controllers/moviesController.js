const { request } = require('http');
const { dbConnection } = require('../db_connection.js');

exports.moviesController = {
    async getMovie(req,res){
        const connection = await dbConnection.createConnection();
        const id = req.params.movieID;
        if (!id) 
        {
            res.status(400).send('Invalid movie id');
			await connection.end();
			return;
        }

        try{
            const movie = await connection.query('select * from tbl_13_movies where id = ?' , [id]);
            res.status(200).send(movie);
        } catch (err) {
            res.status(500).send();
        }
        finally{
            connection.end();
        }
    }
}