import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import TvSeriesCard from '../components/TvSeriesCard';
import Loader from '../components/Loader';
import { searchMedia } from '../services/api';

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q') || '';
  const mediaType = queryParams.get('type');
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchQuery);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const data = await searchMedia(searchQuery, mediaType);
        setResults(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setLoading(false);
      }
    };
    
    if (searchQuery) {
      fetchResults();
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [searchQuery, mediaType]);

  const getTitle = () => {
    if (mediaType === 'movie') return "Movies";
    if (mediaType === 'tv') return "TV Series";
    return "All Media";
  };

  return (
    <div className="pt-20 pb-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {searchQuery ? `Search Results for "${searchQuery}"` : getTitle()}
          </h1>
          <p className="text-gray-400">
            {results.length} {mediaType === 'movie' ? 'movies' : mediaType === 'tv' ? 'TV shows' : 'results'} found
          </p>
        </div>
        
        {loading ? (
          <Loader />
        ) : results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {results.map(item => (
              item.type === 'movie' ? (
                <MovieCard key={item.id} media={item} />
              ) : (
                <TvSeriesCard key={item.id} media={item} />
              )
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">😢</div>
            <h2 className="text-2xl font-bold mb-2">No results found</h2>
            <p className="text-gray-400">
              {searchQuery 
                ? `We couldn't find any matches for "${searchQuery}"` 
                : 'Please try a different search term'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
