import { Link } from "react-router-dom";

export default function Header() {
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
          <Link to="/sign-in">
            <li className="text-lg rounded-2xl hover:scale-110 ">Sign In</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
