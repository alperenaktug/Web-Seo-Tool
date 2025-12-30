import animationSvg from "../assets/animation.svg";
import animationSvg2 from "../assets/animation2.svg";
import animationSvg3 from "../assets/animation3.svg";
import animationSvg4 from "../assets/animation4.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false, // Mobil cihazlarda oklar genelde sorun çıkarır, dots yeterlidir
  };

  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleAnalyze = () => {
    if (inputValue.trim()) {
      navigate(`/analyze4/${encodeURIComponent(inputValue.trim())}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAnalyze();
    }
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-12 pt-20 lg:pt-0">
      {/* Sol Taraf: Input ve Başlık Alanı */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 font-serif leading-tight">
          Web Sitenizin Performansını <br className="hidden md:block" />
          <span className="text-blue-600">Hemen Analiz Edin</span>
        </h1>

        <p className="text-gray-500 max-w-md">
          URL adresini girerek saniyelik hız testlerini, SEO skorlarını ve
          iyileştirme önerilerini görüntüleyin.
        </p>

        <div className="flex flex-col sm:flex-row w-full max-w-md gap-3">
          <input
            type="text"
            placeholder="Örn: google.com"
            className="flex-1 px-6 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700 shadow-sm"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button
            className="px-8 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all shadow-md active:scale-95"
            onClick={handleAnalyze}
          >
            Analyze
          </button>
        </div>
      </div>

      {/* Sağ Taraf: Slider / Animasyon Alanı */}
      <div className="w-full lg:w-1/2 max-w-[300px] sm:max-w-[400px] md:max-w-[512px]">
        <Slider {...settings} className="cursor-grab">
          {[animationSvg, animationSvg2, animationSvg3, animationSvg4].map(
            (svg, index) => (
              <div key={index} className="outline-none">
                <img
                  src={svg}
                  alt={`Animation ${index + 1}`}
                  className="w-full h-auto object-contain"
                  width={512}
                  height={512}
                />
              </div>
            )
          )}
        </Slider>
      </div>
    </div>
  );
}
