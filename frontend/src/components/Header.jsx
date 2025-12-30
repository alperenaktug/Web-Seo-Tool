import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false); // Mobil menü kontrolü

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Bölümü */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-gray-900 text-2xl md:text-3xl font-bold font-serif hover:scale-105 transition-transform inline-block"
            >
              WebTool
            </Link>
          </div>

          {/* Masaüstü Menü (Large ekranlarda görünür) */}
          <div className="hidden md:block">
            <ul className="flex items-center space-x-8 lg:space-x-12 text-gray-700 text-lg font-medium font-serif">
              <li className="hover:text-blue-600 transition-colors">
                <Link to="/">Home</Link>
              </li>
              <li className="hover:text-blue-600 transition-colors">
                <Link to="/about">About</Link>
              </li>
              <li className="hover:text-blue-600 transition-colors">
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/profile">
                  {currentUser ? (
                    <img
                      src={currentUser.profilePicture}
                      alt="profile"
                      className="h-9 w-9 rounded-full border border-gray-200 object-cover hover:ring-2 hover:ring-blue-500 transition-all"
                    />
                  ) : (
                    <button className="px-6 py-2 border border-gray-400 rounded-full text-gray-700 hover:bg-gray-100 transition-colors">
                      SignIn
                    </button>
                  )}
                </Link>
              </li>
            </ul>
          </div>

          {/* Mobil Menü Butonu (Sadece mobilde görünür) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobil Menü İçeriği (Açılır/Kapanır Panel) */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden bg-white border-t border-gray-100`}
      >
        <ul className="px-4 pt-2 pb-6 space-y-4 text-gray-700 text-center font-serif">
          <li className="border-b border-gray-50 py-2">
            <Link to="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li className="border-b border-gray-50 py-2">
            <Link to="/about" onClick={() => setIsOpen(false)}>
              About
            </Link>
          </li>
          <li className="border-b border-gray-50 py-2">
            <Link to="/contact" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </li>
          <li className="pt-2">
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex justify-center"
            >
              {currentUser ? (
                <img
                  src={currentUser.profilePicture}
                  alt="profile"
                  className="h-10 w-10 rounded-full border"
                />
              ) : (
                <button className="w-full py-3 border border-gray-400 rounded-full">
                  SignIn
                </button>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
