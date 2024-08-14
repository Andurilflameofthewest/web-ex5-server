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
            res.status(200).send(movie[0][0]);
        } catch (err) {
            res.status(500).send();
        }
        finally{
            connection.end();
        }
    },

    async getAllMovies(req,res){

        const connection = await dbConnection.createConnection();
        try{
            const movies = await connection.query('select * from tbl_13_movies');
            res.status(200).send(movies[0]);
        } catch (err) {
            res.status(500).send();
        }
        finally{
            connection.end();
        }
    },

    async addMovie(req,res){
        const connection = await dbConnection.createConnection();

		const movie_name = req.body.name;
		const movie_director = req.body.director;
        const movie_year = req.body.year;
        const movie_desc = req.body.description;

        if (!movie_name || !movie_director || !movie_year|| !movie_desc) {
            res.status(400).send('Invalid input');
			await connection.end();
			return;
        }

		try {
			await connection.execute('insert into tbl_13_movies (name, director, year, description) values(?,?,?,?)', 
                [movie_name, movie_director, movie_year,movie_desc]);
			res.status(200).send();
		} catch (err) {
			res.status(500).send(err);
		}
        finally{
            connection.end();
        }
    },

    async updateMovie(req,res){
        const connection = await dbConnection.createConnection();

        const id = req.body.id;
		const movie_name = req.body.name;
		const movie_director = req.body.director;
        const movie_year = req.body.year;
        const movie_desc = req.body.description;

        if (!id || !movie_name || !movie_director || !movie_year|| !movie_desc) {
            res.status(400).send('Invalid something');
			await connection.end();
			return;
        }

		try {
			const z = await connection.execute('UPDATE tbl_13_movies SET name = ? ,director = ? , year = ? , description = ?  WHERE id = ? ;',
                 [movie_name, movie_director, movie_year,movie_desc , id]);
            if (z[0].changedRows == 0) {
                res.status(500).send(err);
                return;
            }
			res.status(200).send();
		} catch (err) {
			res.status(500).send(err);
		}
        finally{
            connection.end();
        }
    },

    async deleteMovie(req,res){
        const connection = await dbConnection.createConnection();

		const id = req.params.movieID;
        if (!id) 
            {
                res.status(400).send('Invalid movie id');
                await connection.end();
                return;
            }

		try {
			await connection.execute('delete from tbl_13_movies where id = ?', [id]);
			res.status(200).send();
		} catch (err) {
			res.status(500).send();
		}
        finally{
            connection.end();
        }
    }
}