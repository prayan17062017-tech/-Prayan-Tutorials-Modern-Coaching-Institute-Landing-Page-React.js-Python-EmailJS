import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Users } from 'lucide-react';
import { facultyData } from '../data/faculty';

const Faculty = () => {
  const scrollToEnquiry = () => {
    const el = document.getElementById('enquiry');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="faculty" className="section-padding">
      <div className="container mx-auto px-4 md:px-0">
        <div className="text-center mb-20" data-aos="fade-up">
          <h2 className="text-primary font-bold tracking-widest uppercase mb-4 text-sm">Our Mentors</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            Our Esteemed <span className="text-primary italic">Faculties</span>
          </h3>
          <div className="w-24 h-1.5 bg-primary mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {facultyData.map((f, i) => (
            <div
              key={f.name}
              className="flip-card"
              data-aos="zoom-in"
              data-aos-delay={i * 50}
            >
              <div className="flip-card-inner">
                {/* Front Side */}
                <div className="flip-card-front bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center p-8 shadow-xl">
                  {f.image || f.photo ? (
                    <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center mb-6 text-white text-4xl font-extrabold shadow-2xl border-4 border-white dark:border-gray-700 overflow-hidden">
                      <img
                        src={f.image || f.photo}
                        alt={f.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center mb-6 text-white text-4xl font-extrabold shadow-2xl border-4 border-white dark:border-gray-700">
                      {f.initial}
                    </div>
                  )}
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{f.name}</h4>
                  <p className="text-gray-500 dark:text-gray-400 font-medium text-sm mt-2 text-center">{f.degree}</p>

                  <div className="mt-8 flex items-center text-primary font-bold text-sm uppercase tracking-widest opacity-50">
                    Hover to Reveal
                  </div>
                </div>

                {/* Back Side */}
                <div className="flip-card-back bg-gradient-to-br from-primary to-blue-900 text-white p-5 flex flex-col items-center justify-center shadow-2xl overflow-hidden relative">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/5 rounded-full"></div>

                  {(f.image || f.photo) && (
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center mb-3 text-white text-3xl font-extrabold shadow-2xl border-4 border-white dark:border-gray-700 shrink-0">
                      {f.initial}
                    </div>
                  )}

                  <h4 className="text-lg font-bold mb-2 border-b border-white/20 pb-1.5 w-full text-center shrink-0">About {f.name.split(' ')[0]}</h4>
                  <p
                    className="leading-snug text-blue-50/95 italic text-center px-1"
                    style={{ fontSize: 'clamp(0.7rem, 0.9vw, 0.85rem)' }}
                  >
                    "{f.description}"
                  </p>
                  <div className="mt-4 pt-4 border-t border-white/20 w-full flex justify-center shrink-0">
                    <span className="bg-white/20 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      Professional Educator
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* CTA Card — same flip-card structure as faculty cards */}
          <div
            className="flip-card faculty-cta"
            data-aos="zoom-in"
            data-aos-delay={facultyData.length * 50}
          >
            <div className="flip-card-inner">
              {/* CTA Front */}
              <div className="flip-card-front bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center p-8 shadow-xl">
                <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center mb-6 shadow-2xl border-4 border-white dark:border-gray-700">
                  <GraduationCap className="w-14 h-14 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">Meet Our Expert Team</h4>
                <p className="text-gray-500 dark:text-gray-400 font-medium text-sm mt-2 text-center leading-relaxed">
                  Dedicated mentors committed to your academic success.
                </p>
                <div className="mt-8 flex items-center text-primary font-bold text-sm uppercase tracking-widest opacity-50">
                  Hover to Reveal
                </div>
              </div>

              {/* CTA Back */}
              <div className="flip-card-back bg-gradient-to-br from-primary to-blue-900 text-white p-5 flex flex-col items-center justify-center shadow-2xl overflow-hidden relative">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/5 rounded-full"></div>

                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-3 shrink-0 border-2 border-white/30">
                  <Users className="w-8 h-8 text-white" />
                </div>

                <h4 className="text-lg font-bold mb-3 border-b border-white/20 pb-1.5 w-full text-center shrink-0">
                  Want To Meet Our Faculties?
                </h4>
                <p
                  className="leading-snug text-blue-50/95 italic text-center px-1 mb-4"
                  style={{ fontSize: 'clamp(0.7rem, 0.9vw, 0.85rem)' }}
                >
                  "Join Prayan Tutorials and interact personally with our experienced faculty members who are committed to helping every student achieve academic excellence through personalized guidance, regular mentoring, and result-oriented teaching."
                </p>
                <div className="pt-3 border-t border-white/20 w-full flex justify-center shrink-0">
                  <motion.button
                    onClick={scrollToEnquiry}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-primary px-6 py-2 rounded-full font-bold text-sm shadow-lg hover:shadow-white/20 transition-all"
                  >
                    Join Now
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Faculty;
