import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, GraduationCap, Clock, ChevronRight } from 'lucide-react';
import CountUp from './CountUp'; // Custom hook/component for counting

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Animated Particles (CSS based) */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Result Badge */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 px-4 py-2 rounded-full mb-6"
          >
            <Award className="text-accent w-5 h-5" />
            <span className="text-accent font-bold text-sm tracking-wide">HSC 2026 RESULT – 100% RESULT</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-[1.1] mb-6">
            Shape Your Future With <span className="text-primary italic">Prayan</span> Tutorials
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg leading-relaxed">
            Premier Coaching Institute for XI, XII Science, JEE (Mains) & NEET. We nurture excellence through personalized guidance.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <motion.a
              href="#enquiry"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-primary/20 flex items-center group"
            >
              Admission Open
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-4 rounded-2xl font-bold border border-gray-200 dark:border-gray-700 shadow-lg"
            >
              Contact Us
            </motion.a>
            <motion.a
              href="#results"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-secondary/10 text-secondary px-8 py-4 rounded-2xl font-bold border border-secondary/20"
            >
              View Results
            </motion.a>
          </div>

          {/* Stats/Counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-t border-gray-200 dark:border-gray-800">
            {[
              { label: 'Students', value: 500, suffix: '+' },
              { label: 'Faculties', value: 10, suffix: '+' },
              { label: 'HSC Result', value: 100, suffix: '%' },
              { label: 'Years Exp.', value: 5, suffix: '+' },
            ].map((stat, i) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-primary dark:text-blue-400">
                  <CountUp end={stat.value} duration={2} />{stat.suffix}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Achievement Cards / Visuals */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          {/* Main Visual Shape */}
          <div className="relative w-full aspect-square max-w-lg mx-auto bg-primary/5 rounded-[3rem] rotate-3 border-2 border-primary/10 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800" 
              alt="Students Studying" 
              className="w-full h-full object-cover opacity-80 mix-blend-overlay -rotate-3 scale-110"
            />
          </div>

          {/* Floating Achievement Cards */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-10 -left-10 glass dark:glass-dark p-6 rounded-3xl shadow-2xl flex items-center space-x-4 max-w-xs"
          >
            <div className="bg-green-100 p-3 rounded-2xl">
              <Award className="text-green-600 w-8 h-8" />
            </div>
            <div>
              <p className="font-bold text-gray-900 dark:text-white">100% HSC Result 2026</p>
              <p className="text-sm text-gray-500">Unmatched Excellence</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute top-1/2 -right-12 glass dark:glass-dark p-6 rounded-3xl shadow-2xl flex items-center space-x-4 max-w-xs"
          >
            <div className="bg-blue-100 p-3 rounded-2xl">
              <Users className="text-blue-600 w-8 h-8" />
            </div>
            <div>
              <p className="font-bold text-gray-900 dark:text-white">Expert Faculties</p>
              <p className="text-sm text-gray-500">M.Sc, PhD, B.E Experts</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ x: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute -bottom-6 left-1/4 glass dark:glass-dark p-6 rounded-3xl shadow-2xl flex items-center space-x-4 max-w-xs"
          >
            <div className="bg-orange-100 p-3 rounded-2xl">
              <Clock className="text-orange-600 w-8 h-8" />
            </div>
            <div>
              <p className="font-bold text-gray-900 dark:text-white">Personalized Attention</p>
              <p className="text-sm text-gray-500">Weekly Progress Tests</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
