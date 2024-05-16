import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Analyze4 = () => {
  const { url: routeUrl } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // API isteğinizin URL'i
        const apiUrl =
          "https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed";
        const params = {
          url: decodeURIComponent(routeUrl),
          key: "AIzaSyDgW0eXAWCf4d2EmUValEluWEIXdEsCMbM",
        };

        const response = await axios.get(apiUrl, { params });
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [routeUrl]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>PageSpeed Insights</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Analyze4;
