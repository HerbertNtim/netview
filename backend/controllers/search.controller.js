import User from "../models/user.model.js";
import { fetchMovieFromTMDB } from "../services/tmdb.service.js";

export const searchPerson = async (req, res) => {
  const { query } = req.params;
  try {
    const url = `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`;
    const person = await fetchMovieFromTMDB(url);

    if (person.results.length === 0) {
      res.status(404).send(null);
    }

    await User.findByIdAndUpdate(req.user?._id, {
      $push: {
        searchHistory: {
          id: person.results[0].id,
          image: person.results[0].profile_path,
          title: person.results[0].name,
          searchType: "person",
          createdAt: new Date(),
        },
      },
    });
    console.log(person.results[0].profile_path);

    res.status(200).json({success: true, content: person.results});
  } catch (error) {
    console.log("Error in searchPerson controller ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const searchMovie = async (req, res) => {
  try {
    const { query } = req.params;
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
    const movie = await fetchMovieFromTMDB(url);
    if (movie.results.length === 0) {
      res.status(404).send(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: movie.results[0].id,
          image: movie.results[0].poster_path,
          title: movie.results[0].title || movie.results[0].original_title,
          searchType: "movie",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({success: true, content: movie.results});
  } catch (error) {
    console.log("Error in searchMovie controller ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const searchTv = async (req, res) => {
  try {
    const { query } = req.params;
    const url = `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`;
    const tv = await fetchMovieFromTMDB(url);
    if (tv.results.length === 0) {
      res.status(404).send(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: tv.results[0].id,
          image: tv.results[0].poster_path,
          title: tv.results[0].name,
          searchType: "tv",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({success: true, content: tv.results});
  } catch (error) {
    console.log("Error in searchTv controller ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getSearchHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({success: true, content: user.searchHistory});
  } catch (error) {
    console.log("Error in getSearchHistory controller ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export const deleteItemFromSearchHistory = async (req, res) => {
  try {
    let {id} = req.params;
    id = parseInt(id);

    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: {
          id: id,
        },
      },
    });

    res.status(200).json({success: true, message: "Item deleted from search history"});
  } catch (error) {
    console.log("Error in deleteItemFromSearchHistory controller ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
