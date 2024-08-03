import express from 'express'
import { getSimilarTVs, getTrendingTV, getTvDetails, getTvsByCategory, getTvTrailer } from '../controllers/tv.controller.js';

const tvRouter = express.Router();

tvRouter.get("/trending", getTrendingTV)
tvRouter.get("/:id/trailers", getTvTrailer)
tvRouter.get("/:id/details", getTvDetails)
tvRouter.get("/:id/similar", getSimilarTVs)
tvRouter.get("/:category", getTvsByCategory)

export default tvRouter;
