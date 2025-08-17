import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiDownload, FiCalendar, FiGlobe } from 'react-icons/fi';
import Player from '../components/Player';
import Loader from '../components/Loader';
import { getMediaById } from '../services/api';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [playerSources, setPlayerSources] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const data = await getMediaById(id);
        setMovie(data);
        
        // Prepare player sources
        if (data.video_links) {
          const sources = [];
          if (data.video_links['720p']) {
            sources.push({ url: data.video_links['720p'], quality: 720 });
          }
          if (data.video_links['1080p']) {
            sources.push({ url: data.video_links['1080p'], quality: 1080 });
          }
          setPlayerSources(sources);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie:', error);
        setLoading(false);
      }
    };
    
    fetchMovie();
  }, [id]);

  if (loading) return <Loader />;
  if (!movie) return <div className="pt-20 text-center">Movie not found</div>;

  return (
    <div className="pt-20 pb-8">
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center text-green-500 hover:underline mb-6">
          <FiArrowLeft className="mr-2" /> Back to Home
        </Link>
        
        <div className="bg-gray-800/50 rounded-2xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 p-6">
              {movie.poster_url ? (
                <img 
                  src={movie.poster_url} 
                  alt={movie.title} 
                  className="w-full rounded-xl"
                />
              ) : (
                <div className="bg-gray-700 border-2 border-dashed border-gray-600 rounded-xl w-full h-full flex items-center justify-center">
                  <div className="text-gray-500 text-center p-8">
                    <div className="text-4xl mb-2">🎬</div>
                    <p>No poster available</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="md:w-2/3 p-6">
              <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <div className="flex items-center bg-gray-700 px-3 py-1 rounded-full text-sm">
                  <FiCalendar className="mr-1" /> 
                  {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                </div>
                <div className="flex items-center bg-gray-700 px-3 py-1 rounded-full text-sm">
                  <FiGlobe className="mr-1" /> 
                  {movie.language || 'Unknown'}
                </div>
                <div className="flex items-center bg-green-900 px-3 py-1 rounded-full text-sm">
                  Movie
                </div>
              </div>
              
              <p className="text-gray-300 mb-8">
                {movie.description || 'No description available.'}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                {playerSources.length > 0 && (
                  <button className="bg-gradient-to-r from-green-500 to-cyan-500 text-white py-3 px-8 rounded-full font-medium hover:opacity-90 transition-opacity">
                    Watch Now
                  </button>
                )}
                
                {movie.video_links && Object.entries(movie.video_links).map(([quality, url]) => (
                  url && (
                    <a 
                      key={quality}
                      href={url} 
                      download
                      className="flex items-center bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-full font-medium transition-colors"
                    >
                      <FiDownload className="mr-2" /> Download {quality}
                    </a>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Player Section */}
        {playerSources.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Watch Movie</h2>
            <div className="bg-gray-800/50 rounded-2xl p-4">
              <Player sources={playerSources} poster={movie.poster_url} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
