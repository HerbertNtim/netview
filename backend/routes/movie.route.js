import express from 'express'
import { getTrailerMovie, getTrendingMovie } from '../controllers/movie.controller.js';

const movieRouter = express.Router();

movieRouter.get("/trending", getTrendingMovie)
movieRouter.get("/:id/trailers", getTrailerMovie)

export default movieRouter;
