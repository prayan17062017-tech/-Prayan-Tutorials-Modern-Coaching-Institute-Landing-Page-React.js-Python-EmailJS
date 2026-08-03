import React from 'react';
import { motion } from 'framer-motion';
import { featuresData } from '../data/features';

const Features = () => {
  return (
    <section id="features" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-primary font-bold tracking-widest uppercase mb-4 text-sm">Why Choose Us</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            Exclusive <span className="text-primary italic">Features</span> for Your Success
          </h3>
          <p className="text-gray-600 dark:text-gray-200 max-w-2xl mx-auto text-lg leading-relaxed">
            We provide a comprehensive learning ecosystem designed to bring out the best in every student through dedicated support and modern facilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {featuresData.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(30, 64, 175, 0.2)"
              }}
              className="bg-gray-50 dark:bg-gray-900 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center group cursor-default transition-all duration-500 shadow-xl"
            >
              <div className="bg-primary/10 p-5 rounded-2xl mb-6 group-hover:bg-primary group-hover:rotate-6 transition-all duration-500 shadow-inner">
                <feature.icon className="text-primary group-hover:text-white w-10 h-10 transition-all duration-500" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors">
                {feature.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
