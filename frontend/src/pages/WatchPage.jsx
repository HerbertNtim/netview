import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContentStore } from "../store/content";
import axios from "axios";

const WatchPage = () => {
  const [trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentTrailer, setCurrentTrailer] = useState(null);
  const [similarContent, setSimilarContent] = useState([]);
  const { id } = useParams();

  const { contentTypes } = useContentStore();

  useEffect(() => {
    const getTrailer = async () => {
      try {
        const response = await axios.get(
          `netview/${contentTypes}/${id}/trailers`
        );
        setTrailers(response.data.trailers);
      } catch (error) {
        if (error.message.includes("404")) {
          setTrailers([]);
        }
      }
    };

    getTrailer();
  }, [contentTypes, id]);

  console.log("trailers:", trailers);

  return <div>WatchPage</div>;
};

export default WatchPage;
