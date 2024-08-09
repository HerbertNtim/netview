import { fetchMovieFromTMDB } from "../services/tmdb.service.js";

export const getTrendingTV = async (req, res) => {
  try {
    const url =
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US";
    const data = await fetchMovieFromTMDB(url);
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];

    res.status(200).json({
      success: true,
      content: randomMovie,
    });
  } catch (error) {
    console.log("Error in the getTrendingMovie controller: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getTvTrailer = async (req, res) => {
  try {
    const { id } = req.params;
    const url = `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`;
    const data = await fetchMovieFromTMDB(url);
    res.status(200).json({
      success: true,
      trailers: data.results,
    });
  } catch (error) {
    console.log("Error in the getTrailerMovie controller: ", error);
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getTvDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const url = `https://api.themoviedb.org/3/tv/${id}?language=en-US`;
    const data = await fetchMovieFromTMDB(url);

    res.status(200).json({
      success: true,
      details: data,
    });
  } catch (error) {
    console.log("Error in the getTrailerDetails controller: ", error);
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getSimilarTVs = async (req, res) => {
  try {
    const { id } = req.params;
    const url = `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`;
    const data = await fetchMovieFromTMDB(url);
    res.status(200).json({
      success: true,
      similarMovies: data.results,
    });
  } catch (error) {
    console.log("Error in the getSimilarMovies controller: ", error);
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getTvsByCategory = async(req, res) => {
  try {
    const {category} = req.params;
    const url = `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`;
    const data = await fetchMovieFromTMDB(url);
    res.status(200).json({
      success: true,
      content: data.results,
    });
  } catch (error) {
    console.log('Error in getCategoryMovie controller', error.message)
    res.status(500).json({success: false, message: 'Internal server error'});
  }
}
