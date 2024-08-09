import { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/content";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { Ban, ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";

const MovieSlider = ({ category }) => {
  const { contentType } = useContentStore();
  const [content, setContent] = useState([]);
  const [error, setError] = useState(null);
  const [showArrows, setShowArrows] = useState(false);

  const sliderRef = useRef(null);

  const formattedCategoryName =
    category.replaceAll("_", " ")[0].toUpperCase() +
    category.replaceAll("_", " ").slice(1);
  const formattedContentTypes = contentType === "movies" ? "Movies" : "TV Shows";

  useEffect(() => {
    const getContent = async () => {
      try {
        const res = await axios.get(`/netview/${contentType}/${category}`);
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
  }, [category, contentType])

  const scrollLeft = () => {
    if(sliderRef.current){
      sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
    }
  };
  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth"});
  };

  if (error) {
    return (
      <div className="relative md:px-20 px-5 text-white">
        <h2>
          {formattedCategoryName} {formattedContentTypes}
        </h2>
        <div className="mt-2 flex items-center gap-1 text-red-800">
          <Ban size={30} />
          <p>Error fetching content. Please Refresh.</p>
        </div>
      </div>
    );
  }

  if (!content.length) {
    return <div className="relative md:px-20 px-5 text-white">Loading...</div>;
  }

  return (
    <div className="relative md:px-20 px-5 text-white" 
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)} 
    >
      <h2 className="mb-2 text-2xl font-bold">
        {formattedCategoryName} {formattedContentTypes}
      </h2>

      <div className="flex space-x-4 overflow-x-scroll scrollbar-hide" ref={sliderRef}>
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
            <p className="text-center mt-2">{item.title || item.name}</p>
          </Link>
        ))}
      </div>

      {showArrows && (
        <>
          <button
						className='absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center
            size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10
            '
						onClick={scrollLeft}
					>
						<ChevronLeft size={24} />
					</button>

					<button
						className='absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center
            size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10
            '
						onClick={scrollRight}
					>
						<ChevronRight size={24} />
					</button>
        </>
      )}
    </div>
  );
};

export default MovieSlider;
