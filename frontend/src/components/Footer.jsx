const Footer = () => {
  return (
    <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-md text-gray-500 sm:text-center dark:text-gray-400 mr-8 ">
          © 2024{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Copyright
          </a>
          - All Right Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="hover:underline me-4 md:me-6 text-sm">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="hover:underline me-4 md:me-6 text-sm">
              About
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:underline me-4 md:me-6 text-sm">
              Contact
            </a>
          </li>
          <li>
            <a href="/sign-in" className="hover:underline text-sm">
              SignIn
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
