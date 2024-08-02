import express from 'express'
import { getCategoryMovie, getMovieDetails, getSimilarMovies, getTrailerMovie, getTrendingMovie } from '../controllers/movie.controller.js';

const movieRouter = express.Router();

movieRouter.get("/trending", getTrendingMovie)
movieRouter.get("/:id/trailers", getTrailerMovie)
movieRouter.get("/:id/details", getMovieDetails)
movieRouter.get("/:id/similar", getSimilarMovies)
movieRouter.get("/:category", getCategoryMovie)

export default movieRouter;
