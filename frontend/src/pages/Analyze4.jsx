import { useState, useEffect } from "react";
import axios from "axios";
import PacmanLoader from "react-spinners/PacmanLoader";

const Analyze4 = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url =
          "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
        const params = {
          url: "https://developers.google.com",
          key: "AIzaSyCltn6fh13lQKW6K7Ohr72Or4tE87Ld-kM",
        };

        const response = await axios.get(url, { params });
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center  mt-48 ">
        <h1 className="mb-8 font-serif font-600 text-xl">
          Sayfa Analiz Ediliyor...
        </h1>
        <PacmanLoader color="#000000" size={30} />
      </div>
    );
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  // Verilerden belirli 5 tanesini seçelim
  const selectedData =
    data.loadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">PageSpeed Insights</h1>
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Seçilen 5 Veri:</h2>
        <p>
          <strong>Percentile:</strong> {selectedData.percentile}
          <br />
          <strong>Category:</strong> {selectedData.category}
          <br />
          <strong>Distributions:</strong>
          <br />
          {selectedData.distributions.map((distribution, index) => (
            <div key={index} className="flex items-center mb-1">
              <div className="w-12 h-4 bg-green-500 mr-2"></div>
              <span>
                <strong>Min:</strong> {distribution.min},
              </span>
              &nbsp;
              <span>
                <strong>Max:</strong> {distribution.max},
              </span>
              &nbsp;
              <span>
                <strong>Proportion:</strong> {distribution.proportion}
              </span>
            </div>
          ))}
        </p>
      </div>
    </div>
  );
};

export default Analyze4;
