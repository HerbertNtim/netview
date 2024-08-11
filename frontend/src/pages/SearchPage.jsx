import { useState } from "react";
import Navbar from "../components/Navbar";
import { useContentStore } from "../store/content";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("movie");
  const [results, setResults] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  const { setContentType } = useContentStore();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    tab === "movie" ? setContentType("movie") : tab === "tv";
    setSearchItem("");
    setResults([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/netview/search/${activeTab}/${searchItem}`);
      setResults(res.data.content);
    } catch (error) {
      if (error.status === 404) {
        toast.error("No results found");
      } else {
        toast.error("An error occurred. Please try again later");
      }
    }
  };

  return (
    <section className="bg-black text-white min-h-screen">
      <Navbar />

      <div className="container mx-auto py-8">
        <div className="flex justify-center gap-4">
          <button
            className={`rounded-lg px-4 py-2 ${
              activeTab === "movie" ? "bg-red-600" : "bg-gray-500"
            } hover:bg-red-700`}
            onClick={() => handleTabChange("movie")}
          >
            Movie
          </button>
          <button
            className={`rounded-lg px-4 py-2 ${
              activeTab === "tv" ? "bg-red-600" : "bg-gray-500"
            } hover:bg-red-700`}
            onClick={() => handleTabChange("tv")}
          >
            TV Shows
          </button>
          <button
            className={`rounded-lg px-4 py-2 ${
              activeTab === "person" ? "bg-red-600" : "bg-gray-500"
            } hover:bg-red-700`}
            onClick={() => handleTabChange("person")}
          >
            Person
          </button>
        </div>

        <form
          className="flex gap-2 items-start mb-8 max-w-2xl mx-auto my-4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            placeholder={`Search for a ${activeTab === 'tv' ? 'TV Show' : activeTab}`}
            className="w-full p-2 rounded bg-gray-800 text-white "
          />
          <button className="text-white rounded bg-red-500 hover:bg-red-700 px-4 py-2">
            <Search className="size-6" />
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((result) => {
            if (!result.poster_path && !result.profile_path) return null;

            return (
              <div key={result.id} className="bg-gray-950 p-4 rounded">
                {activeTab === "person" ? (
                  <div className="flex flex-col items-center relative group">
                    <img
                      src={ORIGINAL_IMG_BASE_URL + result.profile_path}
                      alt={result.name}
                      className="max-h-96 rounded mx-auto hover:transition-transform hover:duration-500 hover:ease-in-out group-hover:scale-125"
                    />
                    <h2 className="mt-2 text-xl font-bold">{result.name}</h2>
                  </div>
                ) : (
                  <Link
                    to={"/watch/" + result.id}
                    onClick={() => {
                      setContentType(activeTab);
                    }}
                    className="relative group"
                  >
                    <img
                      src={ORIGINAL_IMG_BASE_URL + result.poster_path}
                      alt={result.title || result.name}
                      className="w-full h-auto rounded hover:transition-transform hover:duration-500 hover:ease-in-out group-hover:scale-125"
                    />
                    <h2 className="mt-2 text-xl font-bold">
                      {result.title || result.name}
                    </h2>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SearchPage;
