import React from 'react';
import { motion } from 'framer-motion';

const ResultCard = ({ image }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-full h-full overflow-hidden rounded-[20px] shadow-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/50 flex items-center justify-center cursor-pointer relative group p-1"
    >
      <img
        src={image.url}
        alt={image.name}
        loading="lazy"
        className="w-full h-auto max-h-[380px] md:max-h-[480px] object-contain transition-transform duration-500 rounded-[16px]"
      />
      {/* Subtle overlay on hover */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[20px]" />
    </motion.div>
  );
};

export default ResultCard;

