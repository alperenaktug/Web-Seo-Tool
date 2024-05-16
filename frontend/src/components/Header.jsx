import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="flex justify-between items-center p-4 shadow-lg">
      <div className="nav-logo">
        <p className="ml-40 text-gray-900 text-3xl font-500 font-serif cursor-pointer hover:scale-105">
          <Link to="/">WebTool</Link>
        </p>
      </div>
      <ul className="flex items-center list-none gap-12 text-gray-700 text-lg font-medium mr-16">
        <li className="ml-auto flex flex-col justify-center items-center cursor-pointer hover:scale-105 font-serif ">
          <Link to="/">Home</Link>
        </li>
        <li className="flex flex-col justify-center items-center cursor-pointer hover:scale-105 font-serif">
          <Link to="/about">About</Link>
        </li>
        <li className="flex flex-col justify-center items-center cursor-pointer hover:scale-105 font-serif">
          <Link to="/contact">Contact</Link>
        </li>
        <li className="flex flex-col justify-center items-center cursor-pointer hover:scale-105">
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.profilePicture}
                alt="profile"
                className="h-7 w-7 rounded-full object-cover"
              />
            ) : (
              <button className="w-40 h-15 outline-none border border-gray-400 rounded-full text-gray-700 text-lg font-medium bg-white cursor-pointer font-serif">
                SignIn
              </button>
            )}
          </Link>
        </li>
      </ul>
    </div>
  );
}
