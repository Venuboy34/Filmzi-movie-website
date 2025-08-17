import { useState, useRef, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

const SearchBar = ({ onSearch, autoFocus = false }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies and TV shows..."
          className="w-full py-3 pl-12 pr-5 bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <FiSearch className="absolute left-4 text-gray-400 text-xl" />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-16 text-gray-400 hover:text-white"
          >
            <FiX className="text-xl" />
          </button>
        )}
        <button
          type="submit"
          className="absolute right-2 bg-gradient-to-r from-green-500 to-cyan-500 text-white py-2 px-6 rounded-full font-medium hover:opacity-90 transition-opacity"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
