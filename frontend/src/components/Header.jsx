import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="bg-sky-700">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-5">
        <Link to="/">
          <h1 className="font-bold font-mono  text-white text-xl rounded-2xl hover:scale-110 ">
            WebTool
          </h1>
        </Link>
        <ul className="flex gap-4 font-mono text-white  ">
          <Link to="/">
            <li className="text-lg  rounded-2xl hover:scale-110 ">Home</li>
          </Link>
          <Link to="/about ">
            <li className="text-lg rounded-2xl hover:scale-110 ">About</li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.profilePicture}
                alt="profile"
                className="h-7 w-7 rounded-full object-cover"
              />
            ) : (
              <li>Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
}
