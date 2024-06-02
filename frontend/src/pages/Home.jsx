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
  };
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleAnalyze = () => {
    navigate(`/analyze4/${encodeURIComponent(inputValue)}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAnalyze();
    }
  };

  return (
    <div className=" max-w-7xl justify-between mx-auto">
      <div className="relative top-60 left-2 flex space-x-4 items-center mr-48">
        <input
          type="text"
          placeholder="Enter URL to Analyze..."
          className="px-28 py-2 border border-gray-300 rounded-md focus:outline focus:border-grey-500  w-1/2  text-center"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown} // Yeni eklenen satır
        />

        <button
          className="px-6 py-2 border border-gray-300 rounded-md font-serif hover:border-gray-500"
          onClick={handleAnalyze}
        >
          Analyze
        </button>
      </div>

      <div className="px-2 py-8 max-w-2xl mx-auto fixed right-8 mr-8 ml-12">
        <div style={{ marginRight: "auto", marginLeft: 0 }}>
          <Slider {...settings}>
            <div>
              <img
                src={animationSvg}
                alt={animationSvg}
                width={512}
                height={512}
              />
            </div>
            <div>
              <img
                src={animationSvg2}
                alt={animationSvg2}
                width={512}
                height={512}
              />
            </div>
            <div>
              <img
                src={animationSvg3}
                alt={animationSvg3}
                width={512}
                height={512}
              />
            </div>
            <div>
              <img
                src={animationSvg4}
                alt={animationSvg4}
                width={512}
                height={512}
              />
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
}
