import React from 'react';
import { motion } from 'framer-motion';

const SubjectsCovered = ({ subjects }) => (
  <section className="section-padding">
    <div className="container mx-auto">
      <div className="text-center mb-14" data-aos="fade-up">
        <h2 className="text-primary font-bold tracking-widest uppercase mb-4 text-sm">Curriculum</h2>
        <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white">Subjects <span className="text-primary italic">Covered</span></h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {subjects.map((sub, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.1 }} whileHover={{ y: -6, boxShadow: '0 25px 50px -12px rgba(30,64,175,0.15)' }}
            className="bg-gray-50 dark:bg-gray-900 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 text-center shadow-xl group cursor-default">
            <div className="bg-primary/10 group-hover:bg-primary w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-all duration-300">
              <sub.icon className="text-primary group-hover:text-white w-8 h-8 transition-all duration-300" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">{sub.name}</h4>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{sub.desc}</p>
            {sub.topics && (
              <ul className="mt-4 text-left space-y-1">
                {sub.topics.map((t, j) => (
                  <li key={j} className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0" />{t}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SubjectsCovered;
