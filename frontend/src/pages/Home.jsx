import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import firstImage from "../images/conduct-a-web-usability-test-infographic.webp";
import secondImage from "../images/designer-creating-website-on-computer-600nw-2187607767.webp";
import thirdImage from "../images/How-To-Perform-a-Usability-Test-4-12.png";
import fourthImage from "../images/web-design-development-usibility.png";
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

  return (
    <div className=" max-w-7xl justify-between mx-auto">
      <div className="relative top-60 left-2 flex space-x-4 items-center mr-48">
        <input
          type="text"
          placeholder="Enter URL to Analyze..."
          className="px-28 py-2 border border-gray-300 rounded-md focus:outline focus:border-grey-500  w-1/2 "
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <button
          className="px-6 py-2 border border-gray-300 rounded-md font-serif hover:border-gray-500   "
          onClick={() => handleAnalyze()}
        >
          Analyze
        </button>
      </div>

      <div className="px-2 py-8 max-w-2xl mx-auto fixed right-8 mr-8 ml-12">
        <div style={{ marginRight: "auto", marginLeft: 0 }}>
          <Slider {...settings}>
            <div>
              <img src={firstImage} alt="First Slide" />
            </div>
            <div>
              <img src={secondImage} alt="Second Slide" />
            </div>
            <div>
              <img src={thirdImage} alt="Third Slide" />
            </div>
            <div>
              <img src={fourthImage} alt="Fourth Slide" />
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
}
