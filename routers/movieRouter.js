const { Router } = require("express");
const { moviesController } = require("../controllers/moviesController");

const movieRouter = new Router();

movieRouter.get('/movie/:movieID', moviesController.getMovie);

module.exports = { movieRouter };