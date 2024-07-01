import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full mt-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
        404 - Page Not Found :(
      </h1>
      <p className="text-lg sd:text-2xl mb-8">
        Sorry, the page you are looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="bg-primary text-textSecondary px-4 py-2 rounded hover:bg-opacity-80"
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
