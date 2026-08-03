import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const LightboxModal = ({ isOpen, image, onClose, onPrev, onNext }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    // Disable background scroll
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !image) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors cursor-pointer"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev button */}
      <button
        onClick={onPrev}
        className="absolute left-6 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors cursor-pointer"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      {/* Next button */}
      <button
        onClick={onNext}
        className="absolute right-6 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors cursor-pointer"
        aria-label="Next image"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Image Container with animations */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="max-w-[90vw] max-h-[85vh] relative flex flex-col items-center"
      >
        <img
          src={image.url}
          alt={image.name}
          className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
        />
        {image.category && image.category !== 'General' && (
          <span className="mt-4 bg-primary text-white text-xs uppercase font-bold tracking-wider px-3 py-1.5 rounded-full">
            {image.category}
          </span>
        )}
        <p className="mt-2 text-white font-medium text-sm capitalize opacity-85">
          {image.name.replace(/_/g, ' ')}
        </p>
      </motion.div>
    </div>
  );
};

export default LightboxModal;
