import { useState } from "react";
import Navbar from "../components/Navbar";
import { useContentStore } from "../store/content";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

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
      if(error.status === 404) {
        toast.error("No results found");
      } else {
        toast.error("An error occurred. Please try again later");
      }
    }
  };

  console.log("results:", results);

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
            placeholder={`Search for a ${activeTab}`}
            className="w-full p-2 rounded bg-gray-800 text-white "
          />
          <button className="text-white rounded bg-red-500 hover:bg-red-700 px-4 py-2">
            <Search className="size-6" />
          </button>
        </form>
      </div>
    </section>
  );
};

export default SearchPage;
