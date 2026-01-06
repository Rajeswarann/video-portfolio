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

  // Video data with local assets and YouTube links
  // helper to construct path
  const getAssetPath = (path: string) => `${import.meta.env.BASE_URL}${path}`;

  const videos: Video[] = [
    // Motion Graphics
    {
      id: 1,
      title: "International Yoga Day",
      category: "Motion Graphics",
      thumbnail: getAssetPath("assets/yoga.png"),
      videoUrl: getAssetPath("assets/motion-graphyics/MG-1.mp4"),
      description: "A creative motion graphics reel designed to celebrate International Yoga Day."
    },
    {
      id: 2,
      title: "Health Awareness Motion Graphics",
      category: "Motion Graphics",
      thumbnail: getAssetPath("assets/wecare.png"),
      videoUrl: getAssetPath("assets/motion-graphyics/MG-2.mp4"),
      description: "A motion graphics project designed to spread health care awareness under the theme 'We Care'."
    },
    {
      id: 3,
      title: "Promotional Motion Graphics",
      category: "Motion Graphics",
      thumbnail: getAssetPath("assets/promo.png"),
      videoUrl: getAssetPath("assets/motion-graphyics/MG-3.mp4"),
      description: "A dynamic promotional motion graphics reel crafted for branding and campaigns."
    },
    // Reels
    {
      id: 4,
      title: "Instagram Reels Compilation",
      category: "Reels",
      thumbnail: getAssetPath("assets/boys.png"),
      videoUrl: getAssetPath("assets/reels-video/reel-1.mp4"),
      description: "Creative and engaging Instagram reels with trending effects and transitions."
    },
    {
      id: 5,
      title: "Product Launch Reel",
      category: "Reels",
      thumbnail: getAssetPath("assets/change.png"),
      videoUrl: getAssetPath("assets/reels-video/reel-2.mp4"),
      description: "High-energy product launch reel with dynamic transitions and eye-catching visual effects."
    },
    {
      id: 6,
      title: "Health Care Awareness Reel",
      category: "Reels",
      thumbnail: getAssetPath("assets/resize.png"),
      videoUrl: getAssetPath("assets/reels-video/reel-3.mp4"),
      description: "A quick and engaging health care reel sharing tips for better lifestyle, wellness, and awareness."
    },
    // Podcasts
    {
      id: 7,
      title: "Make People Obsessed With Your Brand",
      category: "Podcast",
      thumbnail: "https://img.youtube.com/vi/0vJHOTvY9Gw/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=0vJHOTvY9Gw",
      description: "How Cookd Built A 5M+ Loyal Fan Base - Aathitiyan | The Tech Talk Podcast"
    },
    {
      id: 8,
      title: "Business Interview Series",
      category: "Podcast",
      thumbnail: "https://img.youtube.com/vi/zPmCQiYdHeI/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=zPmCQiYdHeI&t=1s",
      description: "Middle Class Is The Biggest Scam | Deepak Kumar | G.O.A.T Mastermind"
    },
    {
      id: 9,
      title: "Divorce Is Not A Failure",
      category: "Podcast",
      thumbnail: "https://img.youtube.com/vi/OB5exR7yXHI/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=OB5exR7yXHI",
      description: "Divorce is not a failure - Prachi Mayekar | Inspiring Talk"
    },
    // AI Videos
    {
      id: 10,
      title: "The Future of Editing",
      category: "AI",
      thumbnail: getAssetPath("assets/strike.png"),
      videoUrl: getAssetPath("assets/AI-videos/ai-1.mp4"),
      description: "Exploring the possibilities of AI in video creation and storytelling."
    },
    {
      id: 11,
      title: "AI Visual Effects",
      category: "AI",
      thumbnail: getAssetPath("assets/onam.png"),
      videoUrl: getAssetPath("assets/AI-videos/ai-2.mp4"),
      description: "Enhancing video production with advanced AI-driven visual effects."
    },
    {
      id: 12,
      title: "AI Generated Content",
      category: "AI",
      thumbnail: getAssetPath("assets/sweets.png"),
      videoUrl: getAssetPath("assets/AI-videos/ai-3.mp4"),
      description: "A glimpse into the future of automated video editing workflows."
    }
  ];

  const categories = ['All Videos', 'Motion Graphics', 'Reels', 'Podcast', 'AI'];

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
              className={`relative px-6 py-3 rounded-full font-semibold transition-colors ${activeFilter === category
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