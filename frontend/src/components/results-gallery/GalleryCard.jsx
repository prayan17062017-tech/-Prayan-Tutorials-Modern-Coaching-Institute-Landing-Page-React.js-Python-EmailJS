import React from 'react';
import { motion } from 'framer-motion';

const GalleryCard = ({ image, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.03 }}
      onClick={onClick}
      className="overflow-hidden rounded-2xl shadow-md bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-800 cursor-pointer relative group w-full h-[320px] md:h-[360px]"
    >
      <img
        src={image.url}
        alt={image.name}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        {image.category && image.category !== 'General' && (
          <span className="bg-primary text-white text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded w-fit mb-1">
            {image.category}
          </span>
        )}
        <p className="text-white font-bold text-sm truncate capitalize">
          {image.name.replace(/_/g, ' ')}
        </p>
      </div>
    </motion.div>
  );
};

export default GalleryCard;
