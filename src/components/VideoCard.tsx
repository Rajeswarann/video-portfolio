import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, ExternalLink } from 'lucide-react';

interface Video {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
  videoUrl: string;
  description: string;
}

interface VideoCardProps {
  video: Video;
  onPlayVideo: (video: Video) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onPlayVideo }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Ignore autoplay errors
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-video overflow-hidden">
        {/* Thumbnail Image */}
        <img
          src={video.thumbnail}
          alt={video.title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${isHovered && isLoaded ? 'opacity-0' : 'opacity-100'
            }`}
        />

        {/* Preview Video */}
        {/* Preview Video - Only for local/MP4 videos */}
        {!video.videoUrl.includes('youtube.com') && !video.videoUrl.includes('youtu.be') && (
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovered && isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            muted
            loop
            onLoadedData={() => setIsLoaded(true)}
            preload="metadata"
          >
            <source src={video.videoUrl} type="video/mp4" />
          </video>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Play Button */}
        <motion.button
          onClick={() => onPlayVideo(video)}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="w-16 h-16 bg-cyan-500/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/25">
            <Play size={24} className="text-white ml-1" />
          </div>
        </motion.button>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs font-semibold rounded-full">
            {video.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
          {video.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {video.description}
        </p>

        <motion.button
          onClick={() => onPlayVideo(video)}
          className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
          whileHover={{ x: 5 }}
        >
          <ExternalLink size={16} className="mr-2" />
          Watch Full Video
        </motion.button>
      </div>
    </motion.div>
  );
};

export default VideoCard;