import { Link } from 'react-router-dom';
import { FiPlay, FiTv } from 'react-icons/fi';

const TvSeriesCard = ({ media }) => {
  const seasonsCount = media.seasons ? Object.keys(media.seasons).length : 0;
  
  return (
    <Link 
      to={`/tv/${media.id}`}
      className="group relative overflow-hidden rounded-xl bg-gray-800 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <div className="relative pb-[150%]">
        {media.poster_url ? (
          <img 
            src={media.poster_url} 
            alt={media.title}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-70"
            onError={(e) => {
              e.target.onerror = null;
              e.target.parentNode.querySelector('.poster-fallback').classList.remove('hidden');
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
            <FiTv className="text-4xl text-gray-500" />
          </div>
        )}
        
        <div className="poster-fallback absolute inset-0 bg-gray-700 flex items-center justify-center hidden">
          <FiTv className="text-4xl text-gray-500" />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-green-500 rounded-full p-3">
            <FiPlay className="text-xl" />
          </div>
        </div>
      </div>
      
      <div className="p-3">
        <h3 className="font-semibold truncate">{media.title}</h3>
        <div className="flex justify-between items-center mt-1 text-sm text-gray-400">
          <span>{seasonsCount} Season{seasonsCount !== 1 ? 's' : ''}</span>
          <span className="px-2 py-1 bg-gray-700 rounded">TV Series</span>
        </div>
      </div>
    </Link>
  );
};

export default TvSeriesCard;
