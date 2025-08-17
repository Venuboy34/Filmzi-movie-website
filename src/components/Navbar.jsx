import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiFilm, FiTv, FiHome } from 'react-icons/fi';
import SearchBar from './SearchBar';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (query) => {
    navigate(`/search?q=${query}`);
    setShowSearch(false);
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/90 backdrop-blur-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-green-500 w-10 h-10 rounded-full flex items-center justify-center">
            <FiFilm className="text-white text-xl" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
            FILMZI
          </span>
        </Link>

        <div className="hidden md:flex space-x-8">
          <NavLink to="/" icon={<FiHome />} text="Home" />
          <NavLink to="/search?type=movie" icon={<FiFilm />} text="Movies" />
          <NavLink to="/search?type=tv" icon={<FiTv />} text="TV Series" />
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            <FiSearch className="text-xl" />
          </button>
        </div>
      </div>

      {showSearch && (
        <div className="container mx-auto px-4 mt-4">
          <SearchBar onSearch={handleSearch} autoFocus />
        </div>
      )}
    </header>
  );
};

const NavLink = ({ to, icon, text }) => (
  <Link 
    to={to} 
    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
  >
    {icon}
    <span>{text}</span>
  </Link>
);

export default Navbar;
