import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiGlobe, FiTv } from 'react-icons/fi';
import SeasonAccordion from '../components/SeasonAccordion';
import Loader from '../components/Loader';
import { getMediaById } from '../services/api';

const TvDetails = () => {
  const { id } = useParams();
  const [tvShow, setTvShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    const fetchTvShow = async () => {
      try {
        setLoading(true);
        const data = await getMediaById(id);
        setTvShow(data);
        
        // Prepare seasons data
        if (data.seasons) {
          const seasonsArray = Object.entries(data.seasons)
            .map(([seasonNumber, seasonData]) => ({
              seasonNumber: parseInt(seasonNumber),
              ...seasonData
            }))
            .sort((a, b) => a.seasonNumber - b.seasonNumber);
          
          setSeasons(seasonsArray);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching TV show:', error);
        setLoading(false);
      }
    };
    
    fetchTvShow();
  }, [id]);

  if (loading) return <Loader />;
  if (!tvShow) return <div className="pt-20 text-center">TV show not found</div>;

  return (
    <div className="pt-20 pb-8">
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center text-green-500 hover:underline mb-6">
          <FiArrowLeft className="mr-2" /> Back to Home
        </Link>
        
        <div className="bg-gray-800/50 rounded-2xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 p-6">
              {tvShow.poster_url ? (
                <img 
                  src={tvShow.poster_url} 
                  alt={tvShow.title} 
                  className="w-full rounded-xl"
                />
              ) : (
                <div className="bg-gray-700 border-2 border-dashed border-gray-600 rounded-xl w-full h-full flex items-center justify-center">
                  <div className="text-gray-500 text-center p-8">
                    <div className="text-4xl mb-2">📺</div>
                    <p>No poster available</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="md:w-2/3 p-6">
              <h1 className="text-3xl font-bold mb-2">{tvShow.title}</h1>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <div className="flex items-center bg-gray-700 px-3 py-1 rounded-full text-sm">
                  <FiCalendar className="mr-1" /> 
                  {tvShow.release_date ? new Date(tvShow.release_date).getFullYear() : 'N/A'}
                </div>
                <div className="flex items-center bg-gray-700 px-3 py-1 rounded-full text-sm">
                  <FiGlobe className="mr-1" /> 
                  {tvShow.language || 'Unknown'}
                </div>
                <div className="flex items-center bg-green-900 px-3 py-1 rounded-full text-sm">
                  TV Series
                </div>
                <div className="flex items-center bg-gray-700 px-3 py-1 rounded-full text-sm">
                  <FiTv className="mr-1" /> 
                  {seasons.length} Season{seasons.length !== 1 ? 's' : ''}
                </div>
              </div>
              
              <p className="text-gray-300 mb-8">
                {tvShow.description || 'No description available.'}
              </p>
            </div>
          </div>
        </div>
        
        {/* Seasons */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Seasons & Episodes</h2>
          
          {seasons.length > 0 ? (
            seasons.map(season => (
              <SeasonAccordion 
                key={season.seasonNumber} 
                season={season} 
                seasonNumber={season.seasonNumber} 
              />
            ))
          ) : (
            <div className="bg-gray-800/50 rounded-2xl p-8 text-center">
              <div className="text-5xl mb-4">📺</div>
              <h3 className="text-xl font-bold mb-2">No seasons available</h3>
              <p className="text-gray-400">Season information for this series is not available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TvDetails;
