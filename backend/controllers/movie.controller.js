import { fetchMovieFromTMDB } from "../services/tmdb.service.js";

export const getTrendingMovie = async (req, res) => {
  try {
    const url =
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
    const data = await fetchMovieFromTMDB(url);
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];

    res.status(200).json({
      success: true,
      content: randomMovie,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getTrailerMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
    const data = await fetchMovieFromTMDB(url);
    res.status(200).json({
      success: true,
      trailers: data.results,
    });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getMovieDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    const data = await fetchMovieFromTMDB(url);

    res.status(200).json({
      success: true,
      details: data,
    });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getSimilarMovies = async (req, res) => {
  try {
    const { id } = req.params;
    const url = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`;
    const data = await fetchMovieFromTMDB(url);
    res.status(200).json({
      success: true,
      similarMovies: data.results,
    });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getCategoryMovie = async(req, res) => {
  try {
    const {category} = req.params;
    const url = `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`;
    const data = await fetchMovieFromTMDB(url);
    res.status(200).json({
      success: true,
      content: data.results,
    });
  } catch (error) {
    res.status(500).json({success: false, message: 'Internal server error'});
  }
}
