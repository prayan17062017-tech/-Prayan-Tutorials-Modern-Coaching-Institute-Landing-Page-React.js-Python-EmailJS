import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame, animate, useTransform } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { reviews } from '../../data/reviews';
import ReviewCard from './ReviewCard';

const GoogleReviews = () => {
  const [isPaused, setIsPaused] = useState(false);
  const baseX = useMotionValue(0);
  const manualOffset = useMotionValue(0);
  
  // Combine auto-scroll and manual navigation
  const x = useTransform([baseX, manualOffset], ([b, m]) => b + m);
  
  // Duplicate reviews multiple times to ensure continuous flow
  const marqueeReviews = [...reviews, ...reviews, ...reviews];
  
  // Calculate total width of one set of reviews
  const getCardWidth = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 640 ? 320 : 380;
    }
    return 380;
  };

  useAnimationFrame((t, delta) => {
    if (!isPaused) {
      let currentX = baseX.get();
      const cardWidth = getCardWidth();
      const baseWidth = cardWidth * reviews.length;
      
      // Moving speed: ~80px per second
      currentX -= (delta * 0.08); 
      
      // Loop logic: reset when one full set passes
      if (currentX <= -baseWidth) {
        currentX = 0;
      }
      baseX.set(currentX);
    }
  });

  const handleNext = () => {
    animate(manualOffset, manualOffset.get() - getCardWidth(), { 
      type: "spring", 
      stiffness: 100, 
      damping: 20 
    });
  };

  const handlePrev = () => {
    animate(manualOffset, manualOffset.get() + getCardWidth(), { 
      type: "spring", 
      stiffness: 100, 
      damping: 20 
    });
  };

  return (
    <section id="reviews" className="section-padding relative overflow-hidden py-24">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -mr-80 -mt-80"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] -ml-80 -mb-80"></div>

      <div className="container mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-6">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-primary font-bold tracking-widest uppercase text-[10px]">Testimonials</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
            What Our Students, Faculty & <br className="hidden md:block" /> 
            <span className="text-primary italic">Administration</span> Say
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg font-medium px-4">
            Trusted by students, appreciated by parents, and supported by experienced educators.
          </p>
          <div className="w-24 h-1.5 bg-primary mx-auto mt-8 rounded-full shadow-sm shadow-primary/20"></div>
        </div>

        {/* Infinite Marquee Section with Navigation */}
        <div className="relative group/marquee">
          {/* Navigation Buttons */}
          <button 
            onClick={handlePrev}
            className="absolute left-8 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-white/20 shadow-2xl flex items-center justify-center text-primary opacity-0 group-hover/marquee:opacity-100 transition-all duration-300 hover:bg-primary hover:text-white hover:scale-110 active:scale-95"
            aria-label="Previous Review"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-8 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-white/20 shadow-2xl flex items-center justify-center text-primary opacity-0 group-hover/marquee:opacity-100 transition-all duration-300 hover:bg-primary hover:text-white hover:scale-110 active:scale-95"
            aria-label="Next Review"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div 
            className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden py-10 cursor-grab active:cursor-grabbing"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <motion.div 
              style={{ x, width: 'max-content' }}
              className="flex gap-0"
            >
              {marqueeReviews.map((review, index) => (
                <ReviewCard key={`${review.id}-${index}`} review={review} />
              ))}
            </motion.div>

            {/* Gradient Masks */}
            <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-white/80 dark:from-gray-950/80 to-transparent z-20 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-white/80 dark:from-gray-950/80 to-transparent z-20 pointer-events-none"></div>
          </div>
        </div>

        {/* Bottom Navigation Indicators (Visual Only) */}
        <div className="mt-12 flex justify-center gap-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === 1 ? 'w-12 bg-primary' : 'w-4 bg-primary/20'}`}></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;
