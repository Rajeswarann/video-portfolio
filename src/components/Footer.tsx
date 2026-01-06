import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Video } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center mb-4 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Video className="text-cyan-400 mr-2" size={24} />
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              VideoEditor
            </span>
          </motion.div>

          {/* Copyright */}
          <motion.div
            className="flex items-center text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span>© 2024 Made with</span>
            <Heart size={16} className="text-red-400 mx-1 animate-pulse" />
            <span>by Rajeswaran.D.N</span>
          </motion.div>

          {/* Back to Top */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-4 md:mt-0 px-4 py-2 text-gray-400 hover:text-cyan-400 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Top ↑
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;