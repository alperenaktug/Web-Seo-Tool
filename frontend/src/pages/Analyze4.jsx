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

  // Birden fazla API key için alternatifler
  const API_KEYS = [
    import.meta.env.VITE_PAGESPEED_API_KEY,
    // Diğer yedek API key'leriniz
  ];

  useEffect(() => {
    let modifiedUrl = decodeURIComponent(routeUrl);
    if (!/^https?:\/\//i.test(modifiedUrl)) {
      modifiedUrl = "http://" + modifiedUrl;
    }
    setFinalUrl(modifiedUrl);

    const fetchData = async (retryCount = 0) => {
      try {
        // Önce cache kontrolü yap
        const cacheKey = `pagespeed_${encodeURIComponent(modifiedUrl)}`;
        const cachedData = sessionStorage.getItem(cacheKey);

        if (cachedData) {
          setData(JSON.parse(cachedData));
          setLoading(false);
          return;
        }

        const url =
          "https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed";

        // Rastgele bir API key seç
        const activeKey = API_KEYS[Math.floor(Math.random() * API_KEYS.length)];

        const params = {
          url: modifiedUrl,
          key: activeKey,
          category: ["PERFORMANCE", "ACCESSIBILITY", "BEST-PRACTICES", "SEO"],
          locale: "tr_TR",
        };

        // İstekler arasında minimum 1.5 saniye bekle
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const response = await axios.get(url, {
          params,
          paramsSerializer: { indexes: null },
        });

        // Veriyi cache'e al (1 saat geçerli)
        sessionStorage.setItem(cacheKey, JSON.stringify(response.data));
        setData(response.data);
      } catch (error) {
        if (error.response?.status === 429) {
          if (retryCount < 3) {
            // Exponential backoff ile yeniden dene (2s, 4s, 8s)
            const delay = Math.pow(2, retryCount) * 1000;
            await new Promise((resolve) => setTimeout(resolve, delay));
            return fetchData(retryCount + 1);
          }
          setError(
            new Error(
              "Çok fazla istek gönderdiniz. Lütfen bir süre sonra tekrar deneyin."
            )
          );
        } else {
          setError(error);
        }
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

  if (error)
    return (
      <div className="text-red-500 text-center mt-32 p-4 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Hata Oluştu</h2>
        <p>{error.message}</p>
        {error.message.includes("Çok fazla istek") && (
          <p className="mt-4">Lütfen 1-2 dakika bekleyip sayfayı yenileyin.</p>
        )}
      </div>
    );

  const lighthouseResult = data?.lighthouseResult;
  const categories = lighthouseResult?.categories || {};
  const audits = lighthouseResult?.audits || {};

  return (
    <>
      <div className="flex flex-col items-center mt-32 border border-gray-300 rounded-lg p-4 mx-32">
        <h1 className="text-2xl font-bold mb-14 mt-6">
          Sayfa Analiz Sonuçları
        </h1>
        <div className="flex flex-wrap space-x-4 mb-4">
          {Object.keys(categories).map((categoryKey) => {
            const category = categories[categoryKey];
            return (
              <div
                key={categoryKey}
                className="mb-4 transform transition-transform duration-700 hover:scale-125"
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

      {/* Diğer bileşenler aynı şekilde kalabilir */}
      {lighthouseResult && (
        <div className="container mx-auto px-4 py-8 mt-14">
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

      {/* Diğer bileşenler... */}
    </>
  );
};

export default Analyze4;
