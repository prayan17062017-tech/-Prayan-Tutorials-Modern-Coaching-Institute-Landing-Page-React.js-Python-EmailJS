import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GalleryGrid from '../components/results-gallery/GalleryGrid';
import LightboxModal from '../components/results-gallery/LightboxModal';
import { resultImages } from '../components/results-showcase/resultImages';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
  BookOpen, 
  ClipboardCheck, 
  Trophy, 
  ChevronRight,
  Phone,
  FileCheck,
  Award,
  BookMarked,
  Target
} from 'lucide-react';

const ResultsGallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(-1);
  };

  const handlePrev = () => {
    setLightboxIndex((prev) => (prev === 0 ? resultImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setLightboxIndex((prev) => (prev === resultImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="overflow-x-hidden min-h-screen bg-gradient-to-b from-blue-50/30 via-white to-blue-50/20 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-8" data-aos="fade-up">
            <Link to="/" className="hover:text-primary dark:hover:text-blue-400 transition-colors font-semibold">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="font-bold text-gray-900 dark:text-white">Results Gallery</span>
          </nav>

          {/* Hero Section */}
          <div className="text-center mb-16 max-w-4xl mx-auto" data-aos="fade-up">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-primary/10 dark:bg-blue-900/30 border border-primary/20 dark:border-blue-800/30 px-4 py-1.5 rounded-full mb-6"
            >
              <Award className="text-primary dark:text-blue-400 w-5 h-5 animate-bounce" />
              <span className="text-primary dark:text-blue-400 font-bold text-xs uppercase tracking-wider">Prayan Tutorials Success Gallery</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-[1.15] mb-6">
              🏆 Our <span className="text-primary dark:text-blue-400 italic">Success Stories</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Celebrating the outstanding achievements of Prayan Tutorials students in HSC, MHT-CET, JEE, and NEET examinations.
            </p>
            <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed">
              At Prayan Tutorials, every result tells a story of dedication, perseverance, and academic excellence. Explore our gallery showcasing the remarkable achievements of students who have excelled through consistent effort, expert guidance, and personalized mentoring.
            </p>

            {/* Achievement Counters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 py-8 border-y border-gray-200 dark:border-gray-800 bg-white/40 dark:bg-gray-900/20 backdrop-blur-sm rounded-3xl">
              {[
                { icon: GraduationCap, label: 'Students Guided', value: '500+' },
                { icon: Trophy, label: 'HSC Result 2026', value: '100%' },
                { icon: BookMarked, label: 'Science Excellence', value: 'XI & XII' },
                { icon: Target, label: 'Preparation Focus', value: 'JEE & NEET' }
              ].map((counter, i) => (
                <div key={counter.label} className="flex flex-col items-center p-4">
                  <div className="bg-primary/10 dark:bg-blue-900/30 p-3 rounded-2xl mb-3">
                    <counter.icon className="w-6 h-6 text-primary dark:text-blue-400" />
                  </div>
                  <div className="text-2xl font-black text-gray-900 dark:text-white">{counter.value}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-semibold text-center mt-1">{counter.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <GalleryGrid images={resultImages} onCardClick={openLightbox} />

          {/* Lightbox Modal */}
          <AnimatePresence>
            {lightboxIndex !== -1 && (
              <LightboxModal
                isOpen={lightboxIndex !== -1}
                image={resultImages[lightboxIndex]}
                onClose={closeLightbox}
                onPrev={handlePrev}
                onNext={handleNext}
              />
            )}
          </AnimatePresence>

          {/* Extra Section: Why Our Students Excel */}
          <div className="mt-28 border-t border-gray-200 dark:border-gray-800 pt-20">
            <div className="text-center mb-16" data-aos="fade-up">
              <h2 className="text-primary dark:text-blue-400 font-bold tracking-widest uppercase mb-3 text-sm">Key Pillars</h2>
              <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
                Why Our Students <span className="text-primary dark:text-blue-400 italic">Excel</span>
              </h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {[
                {
                  icon: GraduationCap,
                  title: 'Expert Faculty',
                  desc: 'Learn from highly experienced mentors who simplify complex scientific concepts.'
                },
                {
                  icon: BookOpen,
                  title: 'Personal Attention',
                  desc: 'Small batch sizes and personalized mentoring to monitor every student\'s progress.'
                },
                {
                  icon: ClipboardCheck,
                  title: 'Regular Test Series',
                  desc: 'Weekly chapter-wise tests and full syllabus mock exams to build real confidence.'
                },
                {
                  icon: Trophy,
                  title: 'Result-Oriented Strategy',
                  desc: 'Structured study materials, tips, and strategies tailored for exam excellence.'
                }
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  whileHover={{ y: -8 }}
                  className="glass dark:glass-dark p-8 rounded-[2rem] border border-white/20 dark:border-white/5 shadow-xl flex flex-col items-center text-center cursor-pointer transition-all duration-300"
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                >
                  <div className="bg-primary/10 dark:bg-blue-900/30 p-4 rounded-3xl mb-6 text-primary dark:text-blue-400">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="mt-28 max-w-5xl mx-auto bg-gradient-to-r from-primary via-blue-700 to-primary dark:from-blue-900 dark:via-blue-800 dark:to-blue-900 p-10 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden" data-aos="fade-up">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div className="max-w-xl">
                <h3 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                  Ready To Become Our Next Success Story?
                </h3>
                <p className="text-white/80 mt-4 text-base font-medium leading-relaxed">
                  Join Prayan Tutorials and unlock your academic potential with expert guidance, personalized mentoring, and result-oriented preparation.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
                <Link
                  to="/#contact"
                  className="bg-white hover:bg-gray-100 text-primary px-8 py-4 rounded-2xl font-bold shadow-lg text-center flex items-center justify-center space-x-2 transition-transform hover:scale-105 active:scale-95 duration-200"
                >
                  <Phone className="w-5 h-5" />
                  <span>Contact Us</span>
                </Link>
                <Link
                  to="/#enquiry"
                  className="bg-blue-500 hover:bg-blue-600 border border-blue-400 text-white px-8 py-4 rounded-2xl font-bold shadow-lg text-center flex items-center justify-center space-x-2 transition-transform hover:scale-105 active:scale-95 duration-200"
                >
                  <FileCheck className="w-5 h-5" />
                  <span>Apply For Admission</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResultsGallery;
