import React from 'react';
import { motion } from 'framer-motion';
import { Play, ChevronDown } from 'lucide-react';

interface HeroProps {
  setActiveSection: (section: string) => void;
}

const Hero: React.FC<HeroProps> = ({ setActiveSection }) => {
  const [text, setText] = React.useState('');
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [loopNum, setLoopNum] = React.useState(0);
  const [typingSpeed, setTypingSpeed] = React.useState(150);

  const fullText = "RAJESWARAN .D.N";

  React.useEffect(() => {
    const handleType = () => {
      const i = loopNum % 1; // Only 1 phrase to loop effectively, or could be array
      // But user asked for specific text, let's just type it out and maybe pause or retype?
      // "running letter like automatically" usually implies typing effect.
      // Let's type "RAJESWARAN .D.N" then "Video Editor" or just the whole line.
      // Let's try: Type "RAJESWARAN .D.N", pause, then "Video Editor" appended?
      // Or just type the whole string "RAJESWARAN .D.N Video Editor" and loop?
      // Let's type the whole string.

      const currentText = fullText;

      setText(isDeleting
        ? currentText.substring(0, text.length - 1)
        : currentText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 150);

      if (!isDeleting && text === currentText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  const scrollToPortfolio = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection('portfolio');
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0">
          {/* Floating particles */}
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <div className="h-[80px] md:h-[100px] flex items-center justify-center">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                {text}
                <span className="text-white animate-pulse">|</span>
              </span>
            </div>
            <span className="block text-white mt-4">
              Video Editor
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
        >
          Bringing stories to life through{' '}
          <span className="text-cyan-400 font-semibold">motion graphics</span>,{' '}
          {/* <span className="text-purple-400 font-semibold">cinematic editing</span>, and{' '} */}
          <span className="text-cyan-400 font-semibold">creative storytelling</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            onClick={scrollToPortfolio}
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white font-semibold text-lg shadow-lg shadow-cyan-500/25 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center">
              <Play size={20} className="mr-2" />
              View My Work
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-700"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.a
            href="#contact"
            className="px-8 py-4 border-2 border-gray-600 text-gray-300 font-semibold text-lg rounded-full hover:border-cyan-400 hover:text-cyan-400 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Talk
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-gray-400 cursor-pointer"
          onClick={scrollToPortfolio}
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;