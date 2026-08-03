import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { hscResults, mhtCetResults, subjectToppers } from '../data/results';
import { Award, Star, Trophy, ArrowRight, Image } from 'lucide-react';

const Results = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const isPaused = useRef(false);
  const tabs = [
    { title: "HSC Results 2025", icon: Award },
    { title: "MHT-CET Results 2025", icon: Trophy },
    { title: "Subject Wise Toppers", icon: Star }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused.current) {
        setActiveTab((prev) => (prev + 1) % tabs.length);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-4">
              <thead>
                <tr className="text-gray-500 dark:text-gray-400 uppercase text-xs tracking-widest font-bold">
                  <th className="px-6 py-2">Rank</th>
                  <th className="px-6 py-2">Student Name</th>
                  <th className="px-6 py-2 text-right">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {hscResults.map((r) => (
                  <motion.tr 
                    key={r.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 group hover:bg-primary/10 transition-colors shadow-lg rounded-2xl"
                  >
                    <td className="px-6 py-4 rounded-l-2xl font-black text-primary text-xl">#{r.rank}</td>
                    <td className="px-6 py-4 font-bold text-gray-800 dark:text-white">{r.name}</td>
                    <td className="px-6 py-4 rounded-r-2xl text-right font-black text-secondary text-lg">{r.value}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 1:
        return (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-3">
              <thead>
                <tr className="text-gray-500 dark:text-gray-400 uppercase text-xs tracking-widest font-bold">
                  <th className="px-6 py-2">No.</th>
                  <th className="px-6 py-2">Student Name</th>
                  <th className="px-6 py-2">Stream</th>
                  <th className="px-6 py-2 text-right">CET %ile</th>
                </tr>
              </thead>
              <tbody>
                {mhtCetResults.map((r, i) => (
                  <motion.tr 
                    key={r.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 group hover:bg-secondary/10 transition-colors shadow-lg rounded-2xl"
                  >
                    <td className="px-6 py-4 rounded-l-2xl text-gray-400 dark:text-gray-400 font-bold">{i + 1}</td>
                    <td className="px-6 py-4 font-bold text-gray-800 dark:text-white">{r.name}</td>
                    <td className="px-6 py-4"><span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">{r.extra}</span></td>
                    <td className="px-6 py-4 rounded-r-2xl text-right font-black text-primary text-lg">{r.value}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 2:
        return (
          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(subjectToppers).map(([subject, toppers]) => (
              <div key={subject} className="bg-gray-50 dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 border-l-4 dark:border-l-primary shadow-xl">
                <h4 className="text-xl font-bold text-primary mb-4 flex items-center">
                  <Star className="w-5 h-5 mr-2" /> {subject}
                </h4>
                <div className="space-y-4">
                  {toppers.map((t) => (
                    <div key={t.name} className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3 last:border-0">
                      <div>
                        <p className="font-bold text-gray-800 dark:text-white">{t.name}</p>
                        {t.extra && <p className="text-[10px] text-accent font-black uppercase">{t.extra}</p>}
                      </div>
                      <div className="text-right">
                        <p className="font-black text-secondary">{t.value}</p>
                        <p className="text-[10px] text-gray-400 dark:text-gray-400 font-bold">Rank #{t.rank}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="results" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-primary font-bold tracking-widest uppercase mb-4 text-sm">Success Stories</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            Our Shining Stars - <span className="text-primary italic">Student Results</span>
          </h3>
        </div>

        {/* Custom Tabs */}
        <div
          className="flex flex-wrap justify-center gap-4 mb-12"
          onMouseEnter={() => { isPaused.current = true; }}
          onMouseLeave={() => { isPaused.current = false; }}
        >
          {tabs.map((tab, i) => (
            <button
              key={tab.title}
              onClick={() => setActiveTab(i)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-bold transition-all ${
                activeTab === i 
                  ? 'bg-primary text-white shadow-xl shadow-primary/30' 
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.title}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div
          className="max-w-5xl mx-auto min-h-[1100px] md:min-h-[850px] lg:min-h-[820px]"
          onMouseEnter={() => { isPaused.current = true; }}
          onMouseLeave={() => { isPaused.current = false; }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Gallery CTA */}
        <div className="max-w-5xl mx-auto mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 text-center" data-aos="fade-up">
          <h4 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center justify-center gap-2">
            📸 View Complete Result Gallery
          </h4>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/results-gallery')}
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary to-secondary text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-primary/30 transition-all cursor-pointer"
          >
            <Image className="w-5 h-5" />
            <span>Explore Success Stories</span>
          </motion.button>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center" data-aos="fade-up">
          <p className="text-gray-500 dark:text-gray-300 mb-6 font-medium italic">Join the 100% result club this year!</p>
          <motion.a 
            href="#enquiry"
            whileHover={{ x: 5 }}
            className="inline-flex items-center text-primary font-black text-lg group"
          >
            BE OUR NEXT TOPPER <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Results;
