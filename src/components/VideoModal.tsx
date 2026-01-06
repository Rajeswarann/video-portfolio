import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

interface Video {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
  videoUrl: string;
  description: string;
}

interface VideoModalProps {
  video: Video | null;
  isOpen: boolean;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ video, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!video) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className="relative bg-gray-900/95 backdrop-blur-lg border border-gray-700/50 rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{video.title}</h2>
                <span className="px-3 py-1 bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-semibold rounded-full">
                  {video.category}
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-gray-800/50 hover:bg-gray-700/50 rounded-full flex items-center justify-center transition-colors"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video bg-black">
              {video.videoUrl.includes('youtube.com') || video.videoUrl.includes('youtu.be') ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${video.videoUrl.includes('v=') ? video.videoUrl.split('v=')[1].split('&')[0] : video.videoUrl.split('/').pop()}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <video
                  className="w-full h-full"
                  controls
                  autoPlay
                  poster={video.thumbnail}
                >
                  <source src={video.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>

            {/* Description */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
              <p className="text-gray-300 leading-relaxed mb-6">{video.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-cyan-400">
                  <ExternalLink size={16} className="mr-2" />
                  <span className="text-sm">Full Video Experience</span>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-purple-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoModal;