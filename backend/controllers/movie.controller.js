import { fetchMovieFromTMDB } from "../services/tmdb.service.js";

export const getTrendingMovie = async (req, res) => {
  try {
    const url =
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
    const data = await fetchMovieFromTMDB(url);
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];

    res.json({
      success: true,
      content: randomMovie,
    });
  } catch (error) {
    console.log("Error in the getTrendingMovie controller: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getTrailerMovie = async (req, res) => {
  try {
    const id = req.params;
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
    const data = await fetchMovieFromTMDB(url);
    res.json({
      success: true,
      trailer: data.results,
    });
  } catch (error) {
    console.log("Error in the getTrailerMovie controller: ", error);
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
