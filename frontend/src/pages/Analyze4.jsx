import { useState, useEffect } from "react";
import axios from "axios";
import RingLoader from "react-spinners/RingLoader";
import { useParams } from "react-router-dom";

// Yardımcı Bileşen: Metrik Kartı
const MetricCard = ({ title, value, description, score }) => {
  const getStatusColor = (s) =>
    s >= 0.9 ? "text-green-600" : s >= 0.5 ? "text-orange-500" : "text-red-500";
  const getBgColor = (s) =>
    s >= 0.9 ? "bg-green-50" : s >= 0.5 ? "bg-orange-50" : "bg-red-50";

  return (
    <div
      className={`p-6 rounded-xl border border-gray-100 shadow-sm ${getBgColor(
        score
      )} transition-all`}
    >
      <h4 className="text-gray-500 text-xs uppercase font-bold tracking-widest">
        {title}
      </h4>
      <div className={`text-2xl font-black my-2 ${getStatusColor(score)}`}>
        {value || "---"}
      </div>
      <p className="text-gray-600 text-xs leading-relaxed">{description}</p>
    </div>
  );
};

const Analyze4 = () => {
  const { url: routeUrl } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const API_KEYS = [import.meta.env.VITE_PAGESPEED_API_KEY];

  useEffect(() => {
    let modifiedUrl = decodeURIComponent(routeUrl);
    if (!/^https?:\/\//i.test(modifiedUrl)) {
      modifiedUrl = "https://" + modifiedUrl;
    }

    const fetchData = async (retryCount = 0) => {
      setLoading(true);
      setError(null);

      try {
        const cacheKey = `ps_full_${encodeURIComponent(modifiedUrl)}`;
        const cached = sessionStorage.getItem(cacheKey);

        if (cached) {
          setData(JSON.parse(cached));
          setLoading(false);
          return;
        }

        const API_URL =
          "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
        const activeKey = API_KEYS[Math.floor(Math.random() * API_KEYS.length)];

        const response = await axios.get(API_URL, {
          params: {
            url: modifiedUrl,
            key: activeKey,
            category: ["PERFORMANCE", "ACCESSIBILITY", "BEST_PRACTICES", "SEO"],
            strategy: "mobile",
            locale: "tr",
          },
        });

        if (response.data) {
          sessionStorage.setItem(cacheKey, JSON.stringify(response.data));
          setData(response.data);
        }
      } catch (err) {
        if (
          (err.response?.status === 429 || err.response?.status >= 500) &&
          retryCount < 2
        ) {
          setTimeout(() => fetchData(retryCount + 1), 3000);
          return;
        }
        setError(
          err.response?.data?.error?.message ||
            "Analiz sırasında bir hata oluştu."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [routeUrl]);

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center mt-48">
        <h1 className="mb-8 font-serif text-xl">
          Sayfa Derinlemesine Analiz Ediliyor...
        </h1>
        <RingLoader color="#36d7b7" size={80} />
        <p className="mt-4 text-gray-500 text-sm italic">
          Lighthouse motoru çalıştırılıyor, bu biraz zaman alabilir.
        </p>
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-32 p-6 max-w-2xl mx-auto bg-red-50 rounded-lg border border-red-200">
        <h2 className="text-red-700 text-xl font-bold mb-2">Hata Oluştu</h2>
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Tekrar Dene
        </button>
      </div>
    );

  const { lighthouseResult } = data || {};
  const categories = lighthouseResult?.categories || {};
  const audits = lighthouseResult?.audits || {};

  return (
    <div className="max-w-6xl mx-auto p-6 mb-20">
      {/* 1. Bölüm: Genel Skorlar */}
      <div className="border border-gray-200 rounded-2xl p-8 bg-white shadow-sm mt-20">
        <h1 className="text-3xl font-bold mb-10 text-center text-gray-800">
          Analiz Sonuçları
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Object.values(categories).map((cat) => (
            <div
              key={cat.id}
              className="flex flex-col items-center p-6 rounded-xl bg-gray-50 border border-gray-100"
            >
              <div
                className={`text-4xl font-black mb-2 ${
                  cat.score >= 0.9
                    ? "text-green-600"
                    : cat.score >= 0.5
                    ? "text-orange-500"
                    : "text-red-500"
                }`}
              >
                {Math.round(cat.score * 100)}
              </div>
              <div className="text-xs font-bold text-gray-500 uppercase text-center">
                {cat.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Bölüm: Core Web Vitals (Hız Metrikleri) */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">
          Performans Metrikleri
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="LCP (En Büyük İçerik)"
            value={audits["largest-contentful-paint"]?.displayValue}
            score={audits["largest-contentful-paint"]?.score}
            description="Sayfanın ana içeriğinin ne kadar sürede yüklendiğini gösterir. (İdeal: < 2.5s)"
          />
          <MetricCard
            title="TBT (Engelleme Süresi)"
            value={audits["total-blocking-time"]?.displayValue}
            score={audits["total-blocking-time"]?.score}
            description="Kullanıcı tıklamalarına yanıt verilene kadar geçen toplam süre."
          />
          <MetricCard
            title="CLS (Düzen Kayması)"
            value={audits["cumulative-layout-shift"]?.displayValue}
            score={audits["cumulative-layout-shift"]?.score}
            description="Sayfa yüklenirken öğelerin ne kadar yer değiştirdiğini ölçer."
          />
        </div>
      </div>

      {/* 3. Bölüm: İyileştirme Önerileri (Opportunities) */}
      <div className="mt-12 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-gray-900 text-white px-8 py-5">
          <h3 className="text-xl font-bold">Nasıl Hızlandırılır?</h3>
          <p className="text-gray-400 text-sm mt-1">
            Bu düzenlemeler sayfa performansını doğrudan artıracaktır.
          </p>
        </div>
        <div className="divide-y divide-gray-100">
          {Object.values(audits)
            .filter(
              (a) =>
                a.details?.type === "opportunity" &&
                a.score !== null &&
                a.score < 0.9
            )
            .sort(
              (a, b) =>
                (b.details?.overallSavingsMs || 0) -
                (a.details?.overallSavingsMs || 0)
            )
            .map((opt) => (
              <div
                key={opt.id}
                className="p-6 hover:bg-gray-50 transition flex flex-col md:flex-row justify-between items-start md:items-center"
              >
                <div className="flex-1 pr-4">
                  <h4 className="font-bold text-gray-800 text-md">
                    {opt.title}
                  </h4>
                  <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                    {opt.description.split("[")[0]}
                  </p>
                </div>
                <div className="mt-4 md:mt-0 px-4 py-2 bg-red-50 text-red-600 font-bold rounded-lg whitespace-nowrap border border-red-100">
                  Tasarruf: {opt.displayValue}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* 4. Bölüm: Teknik Detaylar */}
      <div className="mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-200 text-gray-600 text-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p>
            <strong>Analiz Edilen URL:</strong> {lighthouseResult?.finalUrl}
          </p>
          <p>
            <strong>Cihaz Tipi:</strong>{" "}
            {lighthouseResult?.configSettings?.formFactor === "mobile"
              ? "Mobil"
              : "Masaüstü"}
          </p>
          <p>
            <strong>Lighthouse Versiyonu:</strong>{" "}
            {lighthouseResult?.lighthouseVersion}
          </p>
          <p>
            <strong>Test Zamanı:</strong>{" "}
            {new Date(lighthouseResult?.fetchTime).toLocaleString("tr-TR")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Analyze4;
