import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Video, Palette, Headphones, Award, Clock, Sparkles } from 'lucide-react';

const About: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const getAssetPath = (path: string) => `${import.meta.env.BASE_URL}${path}`;

  const skills = [
    { name: 'Motion Graphics', percentage: 95, icon: Palette, color: 'from-cyan-400 to-blue-500' },
    { name: 'Video Editing', percentage: 98, icon: Video, color: 'from-purple-400 to-pink-500' },
    { name: 'Podcast Editing', percentage: 90, icon: Headphones, color: 'from-green-400 to-teal-500' },
    { name: 'AI Video Generation', percentage: 90, icon: Sparkles, color: 'from-orange-400 to-red-500' },
  ];

  const stats = [
    { number: '900+', label: 'Projects Completed', icon: Award },
    { number: '2+', label: 'Years Experience', icon: Clock },
    { number: '50+', label: 'Happy Clients', icon: Video },
  ];

  return (
    <section id="about" className="py-20 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800/50 to-gray-900"></div>

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
              About Me
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Passionate video editor with a keen eye for detail and storytelling
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="relative">
              <div className="w-80 h-80 mx-auto lg:mx-0 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-500/20 backdrop-blur-sm border border-cyan-400/20 flex items-center justify-center p-2">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-gray-900/50">
                  <img
                    src={getAssetPath("assets/my-profile/me.jpg")}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-white mb-6">
              Crafting Visual Stories
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              I’m a passionate video editor with 1 year and 9 months of hands-on experience crafting
              engaging visual stories. My work spans motion graphics, cinematic editing, podcast production, and social media content creation.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              I believe every project tells a unique story, and my role is to bring that story to life through innovative
              editing techniques, stunning visual effects, and seamless storytelling.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-cyan-400/20">
                      <Icon size={24} className="text-cyan-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">{stat.number}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="space-y-8"
        >
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            Technical Skills
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-cyan-400/50 transition-colors"
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${skill.color} rounded-lg flex items-center justify-center mr-4`}>
                      <Icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white">{skill.name}</h4>
                      <p className="text-gray-400">{skill.percentage}% Proficiency</p>
                    </div>
                  </div>

                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      className={`h-2 bg-gradient-to-r ${skill.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.percentage}%` } : {}}
                      transition={{ duration: 1.5, delay: 1 + index * 0.2 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;