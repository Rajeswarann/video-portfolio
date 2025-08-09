import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import VideoCard from './VideoCard';
import VideoModal from './VideoModal';

interface Video {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
  videoUrl: string;
  description: string;
}

const Portfolio: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeFilter, setActiveFilter] = useState('All Videos');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock video data - replace with your actual videos
  const videos: Video[] = [
    {
      id: 1,
      title: "Motion Graphics Reel 2024",
      category: "Motion Graphics",
      thumbnail: "https://images.pexels.com/photos/5212320/pexels-photo-5212320.jpeg?auto=compress&cs=tinysrgb&w=800",
      videoUrl: "https://sample-videos.com/zip/10/mp4/480/mp4-480-sample1.mp4",
      description: "A showcase of advanced motion graphics and animation techniques used in various commercial projects."
    },
    {
      id: 2,
      title: "Instagram Reels Compilation",
      category: "Reels",
      thumbnail: "https://images.pexels.com/photos/6954166/pexels-photo-6954166.jpeg?auto=compress&cs=tinysrgb&w=800",
      videoUrl: "https://sample-videos.com/zip/10/mp4/480/mp4-480-sample2.mp4",
      description: "Creative and engaging Instagram reels with trending effects and transitions."
    },
    {
      id: 3,
      title: "Tech Talk Podcast Episode",
      category: "Podcast",
      thumbnail: "https://images.pexels.com/photos/7511780/pexels-photo-7511780.jpeg?auto=compress&cs=tinysrgb&w=800",
      videoUrl: "https://sample-videos.com/zip/10/mp4/480/mp4-480-sample3.mp4",
      description: "Professional podcast editing with clear audio, smooth transitions, and engaging visual elements."
    },
    {
      id: 4,
      title: "Cinematic Travel Documentary",
      category: "Motion Graphics",
      thumbnail: "https://images.pexels.com/photos/1666673/pexels-photo-1666673.jpeg?auto=compress&cs=tinysrgb&w=800",
      videoUrl: "https://sample-videos.com/zip/10/mp4/480/mp4-480-sample1.mp4",
      description: "A cinematic journey through breathtaking landscapes with custom motion graphics and color grading."
    },
    {
      id: 5,
      title: "Product Launch Reel",
      category: "Reels",
      thumbnail: "https://images.pexels.com/photos/6954166/pexels-photo-6954166.jpeg?auto=compress&cs=tinysrgb&w=800",
      videoUrl: "https://sample-videos.com/zip/10/mp4/480/mp4-480-sample2.mp4",
      description: "High-energy product launch reel with dynamic transitions and eye-catching visual effects."
    },
    {
      id: 6,
      title: "Business Interview Series",
      category: "Podcast",
      thumbnail: "https://images.pexels.com/photos/7511780/pexels-photo-7511780.jpeg?auto=compress&cs=tinysrgb&w=800",
      videoUrl: "https://sample-videos.com/zip/10/mp4/480/mp4-480-sample3.mp4",
      description: "Professional interview editing with multi-camera setup and enhanced audio quality."
    }
  ];

  const categories = ['All Videos', 'Motion Graphics', 'Reels', 'Podcast'];

  const filteredVideos = useMemo(() => {
    if (activeFilter === 'All Videos') {
      return videos;
    }
    return videos.filter(video => video.category === activeFilter);
  }, [activeFilter, videos]);

  const handlePlayVideo = (video: Video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/10 via-transparent to-purple-900/10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              My Portfolio
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore my creative work across different mediums and styles
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`relative px-6 py-3 rounded-full font-semibold transition-colors ${
                activeFilter === category
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeFilter === category && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full"
                  layoutId="activeFilter"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Video Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          {filteredVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              layout
            >
              <VideoCard video={video} onPlayVideo={handlePlayVideo} />
            </motion.div>
          ))}
        </motion.div>

        {filteredVideos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-400 text-xl">No videos found for this category.</p>
          </motion.div>
        )}
      </div>

      {/* Video Modal */}
      <VideoModal
        video={selectedVideo}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default Portfolio;