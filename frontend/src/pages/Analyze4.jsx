import { useState, useEffect } from "react";
import axios from "axios";
import RingLoader from "react-spinners/RingLoader";
import { useParams } from "react-router-dom";

const Analyze4 = () => {
  const { url: routeUrl } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [finalUrl, setFinalUrl] = useState("");

  useEffect(() => {
    let modifiedUrl = decodeURIComponent(routeUrl);
    if (!/^https?:\/\//i.test(modifiedUrl)) {
      modifiedUrl = "http://" + modifiedUrl;
    }
    setFinalUrl(modifiedUrl);

    const fetchData = async () => {
      try {
        const url =
          "https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed";
        const params = {
          url: modifiedUrl,
          key: import.meta.VITE_PAGESPEED_API_KEY,
          category: ["PERFORMANCE", "ACCESSIBILITY", "BEST-PRACTICES", "SEO"],
          locale: "tr_TR",
        };
        const response = await axios.get(url, {
          params,
          paramsSerializer: {
            indexes: null,
          },
        });
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [routeUrl]);

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center mt-48">
        <h1 className="mb-8 font-serif font-500 text-xl">
          Sayfa Analiz Ediliyor...
        </h1>

        <RingLoader color="#000000" size={80} />
      </div>
    );

  if (error) return <div className="text-red-500">Hata: {error.message}</div>;

  const lighthouseResult = data?.lighthouseResult;

  const categories = lighthouseResult?.categories || {};
  const audits = lighthouseResult?.audits || {};

  console.log(categories);

  return (
    <>
      <div className="flex flex-col items-center mt-32 border border-gray-300 rounded-lg p-4 mx-32 ">
        <h1 className="text-2xl font-bold mb-14 mt-6">
          Sayfa Analiz Sonuçları
        </h1>
        <div className="flex flex-wrap space-x-4 mb-4">
          {Object.keys(categories).map((categoryKey) => {
            const category = categories[categoryKey];
            return (
              <div
                key={categoryKey}
                className="mb-4 transform transition-transform duration-700 hover:scale-125 "
              >
                <div className="flex items-center justify-center w-24 h-24 bg-orange-300 text-md text-black font-500 rounded-lg mb-2 mr-6">
                  {category.title}
                </div>
                <strong>Puan:</strong> {(category.score * 100).toFixed(2)}
                <br />
              </div>
            );
          })}
        </div>
      </div>

      {/*
      <div className="grid grid-cols-2 gap-4 mt-14">
        {Object.entries(data.loadingExperience.metrics).map(([key, metric]) => (
          <div key={key} className="bg-gray-100 p-4 rounded-lg">
            <h1 className="text-lg font-semibold mb-2">
              {key === "first-contentful-paint"
                ? "İlk İçerik Boyanma Süresi"
                : key}
            </h1>
            <strong className="mr-2">Kategorisi:</strong> {metric.category}
           
          </div>
        ))}
      </div>
      */}
      {lighthouseResult && (
        <div className="container mx-auto px-4 py-8 mt-14 ">
          <div className="bg-gray-100 p-4 rounded-lg border border-gray-400">
            <h2 className="text-lg font-semibold mb-2">
              Görüntüleme Sonuçları
            </h2>
            <div>
              <strong>Talep Edilen URL:</strong> {lighthouseResult.requestedUrl}
              <br />
              <strong>Final URL:</strong> {lighthouseResult.finalUrl}
              <br />
              <strong>Lighthouse Versiyonu:</strong>{" "}
              {lighthouseResult.lighthouseVersion}
              <br />
              <strong>Kullanıcı Aracısı:</strong> {lighthouseResult.userAgent}
              <br />
              <strong>Alma Zamanı:</strong> {lighthouseResult.fetchTime}
              <br />
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-100 p-4 rounded-lg border border-gray-400">
          <h2 className="text-lg font-semibold mb-2">
            Sunucu Arkaplan Gecikmeleri
          </h2>
          <strong>Başlık:</strong>{" "}
          {data.lighthouseResult.audits["network-server-latency"].title}
          <br />
          <strong>Açıklama:</strong>{" "}
          {data.lighthouseResult.audits["network-server-latency"].description}
          <br />
          <strong>Puan:</strong>{" "}
          {data.lighthouseResult.audits["network-server-latency"].score}
          <br />
          <strong>Gösterim Modu:</strong>{" "}
          {
            data.lighthouseResult.audits["network-server-latency"]
              .scoreDisplayMode
          }
          <br />
          <strong>Gösterim Değeri:</strong>{" "}
          {data.lighthouseResult.audits["network-server-latency"].displayValue}
          <br />
          <strong>Detaylar:</strong>
          <ul>
            {data.lighthouseResult.audits[
              "network-server-latency"
            ].details.items.map((item, index) => (
              <li key={index}>
                {item.origin}: {item.serverResponseTime} ms
                <div className="flex mt-1">
                  <div
                    className="h-6 bg-blue-500"
                    style={{ width: `${item.serverResponseTime}px` }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-100 p-4 rounded-lg border border-gray-400">
          <h2 className="text-lg font-semibold mb-2">İlk Giriş Gecikmesi</h2>
          <strong>Kategorisi:</strong>{" "}
          {data.loadingExperience.metrics.FIRST_INPUT_DELAY_MS.category}
          <br />
          <strong>Overall Kategori:</strong>{" "}
          {data.loadingExperience.overall_category}
          <br />
          <strong>Dağıtımlar:</strong>
          <ul>
            {data.loadingExperience.metrics.FIRST_INPUT_DELAY_MS.distributions.map(
              (distribution, index) => (
                <li key={index}>
                  Min: {distribution.min}, Max: {distribution.max}, Proportion:{" "}
                  {distribution.proportion}
                  <span
                    className="block h-2 bg-blue-500"
                    style={{ width: `${distribution.proportion * 100}%` }}
                  ></span>
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-100 p-4 rounded-lg border border-gray-400">
          <h2 className="text-lg font-semibold mb-2">Hız İndeksi</h2>
          <strong>Başlık:</strong>{" "}
          {data.lighthouseResult.audits["speed-index"].title}
          <br />
          <strong>Açıklama:</strong>{" "}
          {data.lighthouseResult.audits["speed-index"].description}
          <br />
          <strong>Puan:</strong>{" "}
          {data.lighthouseResult.audits["speed-index"].score}
          <br />
          <strong>Gösterim Modu:</strong>{" "}
          {data.lighthouseResult.audits["speed-index"].scoreDisplayMode}
          <br />
          <strong>Gösterim Değeri:</strong>{" "}
          {data.lighthouseResult.audits["speed-index"].displayValue}
          <br />
          <strong>Nümerik Değer:</strong>{" "}
          {data.lighthouseResult.audits["speed-index"].numericValue}{" "}
          {data.lighthouseResult.audits["speed-index"].numericUnit}
          <div
            className="h-2 bg-blue-500 mt-2"
            style={{
              width: `${
                data.lighthouseResult.audits["speed-index"].score * 100
              }%`,
            }}
          ></div>
        </div>
      </div>

      {Object.keys(categories).map((categoryKey) => {
        const category = categories[categoryKey];
        return (
          <div key={categoryKey} className="container mx-auto px-4 py-8">
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-400">
              <h2 className="text-lg font-semibold mb-2">
                {category.title} Kategorisi
              </h2>
              <strong>Id:</strong> {category.id}
              <br />
              <strong>Başlık:</strong> {category.title}
              <br />
              <strong>Açıklama:</strong> {category.description}
              <br />
              <strong>Puan:</strong> {(category.score * 100).toFixed(2)}
              <br />
              <strong>Elle Açıklama:</strong> {category.manualDescription}
              <br />
            </div>
          </div>
        );
      })}

      {Object.entries(audits).map(([key, audit]) => (
        <div key={key} className="container mx-auto px-4 py-8">
          <div className="bg-gray-100 p-4 rounded-lg border border-gray-400">
            <h2 className="text-lg font-semibold mb-2">{audit.title}</h2>
            <strong>Id:</strong> {audit.id}
            <br />
            <strong>Başlık:</strong> {audit.title}
            <br />
            <strong>Açıklama:</strong> {audit.description}
            <br />
            <strong>Puan:</strong> {audit.score}
            <br />
            <strong>Puan Gösterim Modu:</strong> {audit.scoreDisplayMode}
            <br />
            <strong>Görüntü Değeri:</strong> {audit.displayValue}
            <br />
            {audit.explanation && (
              <>
                <strong>Açıklama:</strong> {audit.explanation}
                <br />
              </>
            )}
            {audit.errorMessage && (
              <>
                <strong>Hata Mesajı:</strong> {audit.errorMessage}
                <br />
              </>
            )}
            {audit.warnings && (
              <>
                <strong>Uyarılar:</strong> {audit.warnings}
                <br />
              </>
            )}
            {audit.details && (
              <>
                <strong>Detaylar:</strong> {JSON.stringify(audit.details)}
                <br />
              </>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default Analyze4;
