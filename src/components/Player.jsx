import { useEffect, useRef } from 'react';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';

const Player = ({ sources, poster }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      playerRef.current = new Plyr(videoRef.current, {
        controls: [
          'play-large',
          'play',
          'progress',
          'current-time',
          'mute',
          'volume',
          'settings',
          'fullscreen'
        ],
        settings: ['quality', 'speed'],
        quality: {
          default: sources[0]?.quality || 720,
          options: sources.map(source => source.quality),
          forced: true
        },
        speed: {
          selected: 1,
          options: [0.5, 0.75, 1, 1.25, 1.5, 2]
        }
      });

      // Clean up on unmount
      return () => {
        if (playerRef.current) {
          playerRef.current.destroy();
        }
      };
    }
  }, [sources]);

  return (
    <div className="w-full">
      <video ref={videoRef} poster={poster} controls playsInline>
        {sources.map((source, index) => (
          <source 
            key={index} 
            src={source.url} 
            type="video/mp4" 
            size={source.quality}
          />
        ))}
      </video>
    </div>
  );
};

export default Player;
