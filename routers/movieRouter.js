const { Router } = require("express");
const { moviesController } = require("../controllers/moviesController");

const movieRouter = new Router();

movieRouter.get('/movie/:movieID', moviesController.getMovie);
movieRouter.get('/movie', moviesController.getAllMovies);
movieRouter.post('/movie/new', moviesController.addMovie);
movieRouter.put('/movie/update', moviesController.updateMovie);
movieRouter.delete('/movie/:movieID', moviesController.deleteMovie);
module.exports = { movieRouter };