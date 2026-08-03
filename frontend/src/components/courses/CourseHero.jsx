import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const CourseHero = ({ title, tagline, badge, gradient }) => (
  <section className={`relative pt-32 pb-20 overflow-hidden ${gradient || 'bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-blue-900/30'}`}>
    <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-700" />
    </div>
    <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
        {badge && (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-6">
            <BookOpen className="text-primary w-4 h-4" />
            <span className="text-primary font-bold text-sm tracking-wide">{badge}</span>
          </motion.div>
        )}
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
          {title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">{tagline}</p>
        <div className="flex flex-wrap gap-4">
          <motion.a href="#enquiry" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="bg-primary text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-primary/20 flex items-center group">
            Apply Now <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </motion.a>
          <Link to="/courses">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-4 rounded-2xl font-bold border border-gray-200 dark:border-gray-700 shadow-lg">
              All Courses
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CourseHero;
