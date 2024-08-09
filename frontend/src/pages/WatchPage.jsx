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

  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const res = await axios.get(
          `/netview/${contentType}/${id}/similar`
        );
        setSimilarContent(res.data.similarMovies);
      } catch (error) {
        console.error("Error fetching similar content:", error.response || error.message);
        if (error.message.includes("404")) {
          setTrailers([]);
        }
      }
    };

    getSimilarContent();
  }, [contentType, id]);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const res = await axios.get(
          `/netview/${contentType}/${id}/details`
        );
        setContent(res.data.details);
      } catch (error) {
        console.error("Error fetching details:", error.response || error.message);
        if (error.message.includes("404")) {
          setContent([]);
        }
      }
    };

    getDetails();
  }, [contentType, id]);

  return <div>WatchPage</div>;
};

export default WatchPage;
