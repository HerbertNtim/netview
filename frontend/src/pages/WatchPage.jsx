import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContentStore } from "../store/content";
import axios from "axios";

const WatchPage = () => {
  const [trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
  const [similarContent, setSimilarContent] = useState([]);
  const [content, setContent] = useState({});

  const { id } = useParams();
  const { contentType } = useContentStore();

  console.log("contentType:", contentType, "id:", id);


  useEffect(() => {
    const getTrailers = async () => {
      try {
        const res = await axios.get(
          `/netview/${contentType}/${id}/trailers`
        );
        console.log("API Response:", res);
        setTrailers(res.data.trailers);
      } catch (error) {
        console.error("Error fetching trailers:", error.response || error.message);
        if (error.message.includes("404")) {
          setTrailers([]);
        }
      }
    };

    getTrailers();
  }, [contentType, id]);

  console.log("trailers:", trailers);

  return <div>WatchPage</div>;
};

export default WatchPage;
