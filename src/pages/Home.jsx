import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import TvSeriesCard from '../components/TvSeriesCard';
import Loader from '../components/Loader';
import { getAllMedia, getStats } from '../services/api';

const Home = () => {
  const [latestMovies, setLatestMovies] = useState([]);
  const [latestTV, setLatestTV] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const allMedia = await getAllMedia();
        const statsData = await getStats();
        
        // Filter latest movies (2025 releases)
        const movies = allMedia
          .filter(item => item.type === 'movie' && 
            new Date(item.release_date).getFullYear() === 2025)
          .slice(0, 12);
        
        // Filter latest TV shows (2025 releases)
        const tvShows = allMedia
          .filter(item => item.type === 'tv' && 
            new Date(item.release_date).getFullYear() === 2025)
          .slice(0, 12);
        
        setLatestMovies(movies);
        setLatestTV(tvShows);
        setStats(statsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="pt-20 pb-8">
      {/* Hero Section */}
      <div className="container mx-auto px-4">
        <div className="relative rounded-2xl overflow-hidden h-96 flex items-center">
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gray-800">
            <div className="w-full h-full bg-gray-200 border-2 border-dashed rounded-xl" />
          </div>
          
          <div className="relative z-20 px-8 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Unlimited Streaming
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Discover thousands of movies and TV shows in stunning quality
            </p>
            <div className="flex space-x-4">
              <button className="bg-gradient-to-r from-green-500 to-cyan-500 text-white py-3 px-8 rounded-full font-medium hover:opacity-90 transition-opacity">
                Start Watching
              </button>
              <button className="bg-gray-800 text-white py-3 px-8 rounded-full font-medium hover:bg-gray-700 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Total Movies" value={stats.movies} />
          <StatCard title="TV Series" value={stats.tv_series} />
          <StatCard title="Episodes" value={stats.episodes} />
          <StatCard title="Active Users" value={stats.users} />
        </div>
      </div>

      {/* Latest Movies */}
      <div className="container mx-auto px-4 mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Latest Movies</h2>
          <a href="/search?type=movie" className="text-green-500 hover:underline">
            View All
          </a>
        </div>
        
        {latestMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {latestMovies.map(movie => (
              <MovieCard key={movie.id} media={movie} />
            ))}
          </div>
        ) : (
          <p className="text-center py-12 text-gray-400">No movies found</p>
        )}
      </div>

      {/* Latest TV Series */}
      <div className="container mx-auto px-4 mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Latest TV Series</h2>
          <a href="/search?type=tv" className="text-green-500 hover:underline">
            View All
          </a>
        </div>
        
        {latestTV.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {latestTV.map(show => (
              <TvSeriesCard key={show.id} media={show} />
            ))}
          </div>
        ) : (
          <p className="text-center py-12 text-gray-400">No TV series found</p>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-gray-800/50 p-6 rounded-xl text-center">
    <div className="text-3xl font-bold text-green-500 mb-2">{value}</div>
    <div className="text-gray-400">{title}</div>
  </div>
);

export default Home;
