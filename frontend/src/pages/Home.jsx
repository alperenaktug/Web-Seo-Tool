import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import firstImage from "../images/conduct-a-web-usability-test-infographic.webp";
import secondImage from "../images/designer-creating-website-on-computer-600nw-2187607767.webp";
import thirdImage from "../images/How-To-Perform-a-Usability-Test-4-12.png";
import fourthImage from "../images/web-design-development-usibility.png";

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

  return (
    <div className=" max-w-7xl justify-centermx-auto">
      <div className="relative top-60 left-10 flex space-x-4 items-center">
        <input
          type="text"
          placeholder="Enter URL to Analyze..."
          className="px-20 py-2 border border-gray-300 rounded-md focus:outline focus:border-sky-500  w-1/3"
        />

        <button className="px-4 py-2 border border-gray-300 rounded-md">
          Analyze
        </button>
      </div>

      <div className="px-2 py-8 max-w-2xl mx-auto fixed right-6">
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
