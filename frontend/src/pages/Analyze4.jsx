import { useState, useEffect } from "react";
import axios from "axios";
import PacmanLoader from "react-spinners/PacmanLoader";
import { useParams } from "react-router-dom";

const Analyze4 = () => {
  const { url: routeUrl } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url =
          "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
        const params = {
          url: decodeURIComponent(routeUrl),
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
      <div className="flex flex-col justify-center items-center mt-48">
        <h1 className="mb-8 font-serif font-500 text-xl">
          Sayfa Analiz Ediliyor...
        </h1>
        <PacmanLoader color="#000000" size={30} />
      </div>
    );

  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  const selectedData1 =
    data?.loadingExperience?.metrics?.CUMULATIVE_LAYOUT_SHIFT_SCORE;

  const selectedData2 =
    data?.originLoadingExperience?.metrics?.CUMULATIVE_LAYOUT_SHIFT_SCORE;
  const selectedData3 = data?.lighthouseResult;
  const selectedData4 = data?.lighthouseResult?.categories;
  const selectedData11 = data?.lighthouseResult?.categories.seo;
  const selectedData22 = data?.lighthouseResult?.categories.best_practices;
  const selectedData33 = data?.lighthouseResult?.categories.accessibility;

  const selectedData5 = data?.lighthouseResult?.audits;

  return (
    <>
      <div className="flex flex-col items-center mt-8">
        <h1 className="text-2xl font-bold mb-14 mt-6">Page Speed Results</h1>
        <div className="flex space-x-4 mb-">
          {Object.keys(selectedData4).map((categoryKey) => {
            const category = selectedData4[categoryKey];
            return (
              <div key={categoryKey} className="mb-4">
                <div className="flex items-center justify-center w-24 h-24 bg-gray-300 text-stone-700 font-600 rounded-full mb-2">
                  {category.title}
                </div>
                <strong>Score:</strong> {(category.score * 100).toFixed(2)}
                <br />
              </div>
            );
          })}

          <div className="flex items-center justify-center w-24 h-24 bg-green-500 text-white rounded-full">
            Yazı 2
          </div>
          <div className="flex items-center justify-center w-24 h-24 bg-red-500 text-white rounded-full">
            Yazı 3
          </div>
          <div className="flex items-center justify-center w-24 h-24 bg-yellow-500 text-white rounded-full">
            Yazı 4
          </div>
        </div>
      </div>

      {selectedData1 && (
        <div className="container mx-auto px-4 py-8">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Sayfa Yükleme Hızı</h2>
            <div>
              <strong>Percentile:</strong> {selectedData1.percentile}
              <br />
              <strong>Category:</strong> {selectedData1.category}
              <br />
              <strong>Overall Category:</strong>{" "}
              {data?.loadingExperience?.overall_category}
              <br />
              <strong>Initial URL:</strong>{" "}
              {data?.loadingExperience?.initial_url}
              <br />
              <strong>Distributions:</strong>
              <br />
              {selectedData1.distributions.map((distribution, index) => (
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
            </div>
          </div>
        </div>
      )}
      {selectedData2 && (
        <div className="container mx-auto px-4 py-8">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">
              Başlangıç Yükleme Deneyimi
            </h2>
            <div>
              <strong>Percentile:</strong> {selectedData2.percentile}
              <br />
              <strong>Category:</strong> {selectedData2.category}
              <br />
              <strong>Distributions:</strong>
              <br />
              {selectedData2.distributions.map((distribution, index) => (
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
            </div>
          </div>
        </div>
      )}

      {selectedData3 && (
        <div className="container mx-auto px-4 py-8">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">
              Görüntüleme Sonuçları
            </h2>
            <div>
              <strong>RequestedUrl:</strong> {selectedData3.requestedUrl}
              <br />
              <strong>FinalUrl:</strong> {selectedData3.finalUrl}
              <br />
              <strong>LighthouseVersion:</strong>{" "}
              {selectedData3.lighthouseVersion}
              <br />
              <strong>UserAgent:</strong> {selectedData3.userAgent}
              <br />
              <strong>FetchTime:</strong> {selectedData3.fetchTime}
              <br />
            </div>
          </div>
        </div>
      )}
      {selectedData4 && (
        <div className="container mx-auto px-4 py-8">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">
              Performance Sonuçları
            </h2>
            {Object.keys(selectedData4).map((categoryKey) => {
              const category = selectedData4[categoryKey];
              return (
                <div key={categoryKey} className="mb-4">
                  <strong>Id:</strong> {category.id}
                  <br />
                  <strong>Title:</strong> {category.title}
                  <br />
                  <strong>Description:</strong> {category.description}
                  <br />
                  <strong>Score:</strong> {category.score * 100}
                  <br />
                  <strong>Manual Description:</strong>{" "}
                  {category.manualDescription}
                  <br />
                </div>
              );
            })}
          </div>
        </div>
      )}
      {selectedData33 && (
        <div className="container mx-auto px-4 py-8">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">
              Accessibility Kategorisi
            </h2>
            {Object.keys(selectedData33).map((categoryKey) => {
              const category = selectedData33[categoryKey];
              return (
                <div key={categoryKey} className="mb-4">
                  <strong>Id:</strong> {category.id}
                  <br />
                  <strong>Title:</strong> {category.title}
                  <br />
                  <strong>Description:</strong> {category.description}
                  <br />
                  <strong>Score:</strong> {category.score * 100}
                  <br />
                  <strong>Manual Description:</strong>{" "}
                  {category.manualDescription}
                  <br />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {selectedData22 && (
        <div className="container mx-auto px-4 py-8">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">
              En İyi Uygulamalar Kategorisi
            </h2>
            {Object.keys(selectedData22).map((categoryKey) => {
              const category = selectedData22[categoryKey];
              return (
                <div key={categoryKey} className="mb-4">
                  <strong>Id:</strong> {category.id}
                  <br />
                  <strong>Title:</strong> {category.title}
                  <br />
                  <strong>Description:</strong> {category.description}
                  <br />
                  <strong>Score:</strong> {category.score * 100}
                  <br />
                  <strong>Manual Description:</strong>{" "}
                  {category.manualDescription}
                  <br />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {selectedData11 && (
        <div className="container mx-auto px-4 py-8">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">SEO Kategorisi</h2>
            {Object.keys(selectedData11).map((categoryKey) => {
              const category = selectedData11[categoryKey];
              return (
                <div key={categoryKey} className="mb-4">
                  <strong>Id:</strong> {category.id}
                  <br />
                  <strong>Title:</strong> {category.title}
                  <br />
                  <strong>Description:</strong> {category.description}
                  <br />
                  <strong>Score:</strong> {category.score * 100}
                  <br />
                  <strong>Manual Description:</strong>{" "}
                  {category.manualDescription}
                  <br />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {selectedData5 && (
        <div className="container mx-auto px-4 py-8">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Denetim Sonuçları</h2>
            {Object.entries(selectedData5).map(([key, audit]) => (
              <div key={key} className="mb-4">
                <strong>Id:</strong> {audit.id}
                <br />
                <strong>Title:</strong> {audit.title}
                <br />
                <strong>Description:</strong> {audit.description}
                <br />
                <strong>Score:</strong> {audit.score}
                <br />
                <strong>ScoreDisplayMode:</strong> {audit.scoreDisplayMode}
                <br />
                <strong>DisplayValue:</strong> {audit.displayValue}
                <br />
                {audit.explanation && (
                  <>
                    <strong>Explanation:</strong> {audit.explanation}
                    <br />
                  </>
                )}
                {audit.errorMessage && (
                  <>
                    <strong>ErrorMessage:</strong> {audit.errorMessage}
                    <br />
                  </>
                )}
                {audit.warnings && (
                  <>
                    <strong>Warnings:</strong> {audit.warnings}
                    <br />
                  </>
                )}
                {audit.details && (
                  <>
                    <strong>Details:</strong> {JSON.stringify(audit.details)}
                    <br />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Analyze4;
