import { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiPlay, FiDownload } from 'react-icons/fi';

const SeasonAccordion = ({ season, seasonNumber }) => {
  const [isOpen, setIsOpen] = useState(seasonNumber === 1);

  return (
    <div className="border border-gray-700 rounded-xl overflow-hidden mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 bg-gray-800 flex justify-between items-center"
      >
        <h3 className="text-lg font-semibold">Season {seasonNumber}</h3>
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </button>
      
      {isOpen && (
        <div className="bg-gray-800/50 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {season.episodes && season.episodes.map(episode => (
              <div key={episode.episode_number} className="bg-gray-700/50 p-4 rounded-lg">
                <h4 className="font-medium">
                  Episode {episode.episode_number}: {episode.title || `Episode ${episode.episode_number}`}
                </h4>
                
                <div className="mt-3 flex space-x-2">
                  {episode.video_720p && (
                    <a 
                      href={episode.video_720p} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors"
                    >
                      <FiPlay className="mr-2" /> Watch 720p
                    </a>
                  )}
                  
                  {episode.video_720p && (
                    <a 
                      href={episode.video_720p} 
                      download
                      className="flex-1 flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded transition-colors"
                    >
                      <FiDownload className="mr-2" /> Download
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SeasonAccordion;
