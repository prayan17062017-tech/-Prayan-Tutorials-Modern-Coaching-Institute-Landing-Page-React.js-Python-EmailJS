import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const CourseOverview = ({ title, description, duration, highlights }) => (
  <section className="section-padding">
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div data-aos="fade-right">
          <h2 className="text-primary font-bold tracking-widest uppercase mb-4 text-sm">Course Overview</h2>
          <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">{title}</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{description}</p>
          {duration && (
            <div className="inline-flex items-center bg-primary/10 border border-primary/20 px-5 py-3 rounded-2xl mb-6">
              <span className="text-primary font-bold">Duration:</span>
              <span className="ml-2 text-gray-700 dark:text-gray-300 font-semibold">{duration}</span>
            </div>
          )}
        </motion.div>
        <motion.div data-aos="fade-left" className="space-y-4">
          {highlights?.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="flex items-start space-x-3 bg-gray-50 dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
              <CheckCircle className="text-primary w-5 h-5 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default CourseOverview;
