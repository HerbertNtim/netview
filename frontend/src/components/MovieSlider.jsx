import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { Ban } from "lucide-react";
import axios from "axios";

const MovieSlider = ({ category }) => {
  const { contentType } = useContentStore();
  const [content, setContent] = useState([]);
  const [error, setError] = useState(null);

  const formattedCategoryName =
    category.replaceAll("_", " ")[0].toUpperCase() +
    category.replaceAll("_", " ").slice(1);
  const formattedContentTypes = contentType === "movies" ? "Movies" : "TV Shows";

  useEffect(() => {
    const getContent = async () => {
      try {
        console.log(`Fetching content for type: ${contentType} and category: ${category}`);
        const res = await axios.get(`/netview/${contentType}/${category}`);
        console.log(`Fetching content for type: ${contentType} and category: ${category}`);
        console.log('Response from API:', res.data)
        if (res.data && Array.isArray(res.data.content)) {
          setContent(res.data.content);
        } else {
          setContent([]); // If no content is found, set content to an empty array
        }
      } catch (err) {
        console.error(`Error fetching content for type: ${contentType} and category: ${category}`, err);
        setError(err.message);
      }
    };

    getContent();
  }, [category, contentType]);

  if (error) {
    return (
      <div className="relative md:px-20 px-5 text-white">
        <h2>
          {formattedCategoryName} {formattedContentTypes}
        </h2>
        <div className="mt-2 flex items-center gap-1 text-red-800">
          <Ban size={30} />
          <p>Error fetching content. Please try again later.</p>
        </div>
      </div>
    );
  }

  if (!content.length) {
    return <div className="relative md:px-20 px-5 text-white">Loading...</div>;
  }

  return (
    <div className="relative md:px-20 px-5 text-white">
      <h2>
        {formattedCategoryName} {formattedContentTypes}
      </h2>

      <div className="flex space-x-4">
        {content.map((item) => (
          <Link
            to={`/watch/${item.id}`}
            className="min-w-[250px] relative group"
            key={item.id}
          >
            <div className="rounded-lg overflow-hidden">
              <img
                src={SMALL_IMG_BASE_URL + item.backdrop_path}
                alt="movie img"
                className="transition-transform duration-500 ease-in-out group-hover:scale-125"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieSlider;
