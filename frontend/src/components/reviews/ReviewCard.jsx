import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const ReviewCard = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 180;
  const isLongText = review.text.length > maxLength;

  const getBadgeStyles = (type) => {
    switch (type) {
      case 'STUDENT':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'FACULTY':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'ADMIN':
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.01 }}
      className="group relative h-full w-[320px] sm:w-[380px] flex-shrink-0 px-3"
    >
      <div className="h-full bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl p-8 rounded-[2rem] flex flex-col border border-white/40 dark:border-white/5 shadow-xl transition-all duration-500 group-hover:shadow-primary/10 group-hover:border-primary/30 group-hover:bg-white/60 dark:group-hover:bg-gray-900/60">
        
        {/* Top Section: Rating (Moved to Top as requested) */}
        <div className="mb-6 flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 dark:text-gray-800'
              }`}
            />
          ))}
        </div>

        {/* Middle Section: Review Text */}
        <div className="flex-grow flex flex-col">
          <p className="text-gray-700 dark:text-gray-300 italic leading-relaxed text-sm md:text-base font-medium">
            "{isExpanded || !isLongText ? review.text : `${review.text.substring(0, maxLength)}...`}"
          </p>
          {isLongText && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-xs font-bold text-primary hover:underline self-start"
            >
              {isExpanded ? 'Read Less' : 'Read More'}
            </button>
          )}
        </div>

        {/* Bottom Section: Reviewer Name & Review Type Badge */}
        <div className="mt-8 pt-6 border-t border-gray-100/50 dark:border-gray-800/50 flex items-center justify-between">
          <h4 className="font-bold text-gray-900 dark:text-white text-sm tracking-tight group-hover:text-primary transition-colors">
            {review.author}
          </h4>
          <span className={`px-3 py-1 rounded-full text-[9px] font-extrabold tracking-widest border ${getBadgeStyles(review.type)} uppercase`}>
            {review.badgeLabel}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewCard;
