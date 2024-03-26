import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-slate-500 text-white py-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-center md:text-left">
          <p>&copy; 2024 My Website. Tüm hakları saklıdır.</p>
        </div>
        <div className="flex justify-start md:justify-end items-center ">
          <div className="flex space-x-6">
            <a href="#" className="text-white hover:text-gray-300">
              <FontAwesomeIcon icon={faFacebookF} size="lg" />
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
          </div>
          <div className="flex justify-center md:justify-end"></div>
        </div>
      </div>
    </footer>
  );
}