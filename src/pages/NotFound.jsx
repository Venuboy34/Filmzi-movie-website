import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-20 pb-12 px-4">
      <div className="text-center max-w-2xl">
        <div className="text-9xl font-bold text-green-500 mb-4">404</div>
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-xl text-gray-400 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center bg-gradient-to-r from-green-500 to-cyan-500 text-white py-3 px-8 rounded-full font-medium hover:opacity-90 transition-opacity"
        >
          <FiArrowLeft className="mr-2" /> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
