import React from 'react';
import { Star, CheckCircle } from 'lucide-react';

const RatingSummary = ({ rating, totalReviews }) => {
  return (
    <div className="flex flex-col items-center justify-center mb-12" data-aos="fade-up">
      <div className="flex items-center space-x-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-8 h-8 ${
              i < Math.floor(rating)
                ? 'text-accent fill-accent'
                : 'text-gray-300 dark:text-gray-700'
            }`}
          />
        ))}
      </div>
      <div className="text-5xl font-black text-gray-900 dark:text-white mb-2">
        {rating} <span className="text-2xl text-gray-400">/ 5</span>
      </div>
      <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-sm">
        Based on {totalReviews} Student Reviews
      </p>
      <div className="flex items-center mt-6 py-2 px-4 bg-white dark:bg-gray-900 rounded-full border border-gray-100 dark:border-gray-800 shadow-sm">
        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
        <span className="text-xs font-black text-gray-700 dark:text-gray-300 uppercase tracking-tighter">Verified Student Testimonials</span>
      </div>
    </div>
  );
};

export default RatingSummary;
