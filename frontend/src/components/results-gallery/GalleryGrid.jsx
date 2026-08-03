import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GalleryCard from './GalleryCard';

const GalleryGrid = ({ images, onCardClick }) => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <motion.div 
        layout 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {images.map((image, index) => (
            <GalleryCard 
              key={image.name} 
              image={image} 
              onClick={() => onCardClick(index)}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default GalleryGrid;
