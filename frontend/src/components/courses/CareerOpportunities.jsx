import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CareerOpportunities = ({ careers }) => (
  <section className="section-padding">
    <div className="container mx-auto">
      <div className="text-center mb-14" data-aos="fade-up">
        <h2 className="text-primary font-bold tracking-widest uppercase mb-4 text-sm">Future Scope</h2>
        <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white">Career <span className="text-primary italic">Opportunities</span></h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {careers.map((c, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.1 }} whileHover={{ y: -5 }}
            className="bg-gray-50 dark:bg-gray-900 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl border-l-4 border-l-primary">
            <h4 className="text-lg font-bold text-primary mb-4 flex items-center">
              <ArrowRight className="w-5 h-5 mr-2" />{c.category}
            </h4>
            <ul className="space-y-2">
              {c.options.map((opt, j) => (
                <li key={j} className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full mr-3 flex-shrink-0" />{opt}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CareerOpportunities;
