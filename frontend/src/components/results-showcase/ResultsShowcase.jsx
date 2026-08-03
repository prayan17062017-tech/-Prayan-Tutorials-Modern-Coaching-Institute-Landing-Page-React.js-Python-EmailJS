import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { resultImages } from './resultImages';
import ResultCard from './ResultCard';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ResultsShowcase = () => {
  return (
    <section className="pt-28 pb-16 border-b border-gray-100 dark:border-gray-800">
      {/* Dynamic component styles for pagination dots */}
      <style>{`
        .showcase-pagination-bullet {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 9999px;
          background-color: #cbd5e1;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .dark .showcase-pagination-bullet {
          background-color: #475569;
        }
        .showcase-pagination-bullet-active {
          width: 24px;
          background-color: #1e40af !important;
        }
        .dark .showcase-pagination-bullet-active {
          background-color: #3b82f6 !important;
        }
      `}</style>

      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        {/* Section Header */}
        <div className="text-center mb-10" data-aos="fade-up">
          <h2 className="text-primary dark:text-blue-400 font-bold tracking-widest uppercase mb-3 text-sm flex items-center justify-center gap-2">
            🏆 Our Achievers
          </h2>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white max-w-3xl mx-auto leading-tight">
            Celebrating the outstanding performances of our students in <span className="text-primary dark:text-blue-400 italic">HSC, MHT-CET, JEE & NEET</span> examinations.
          </h3>
        </div>

        {/* Swiper Carousel Container */}
        <div className="max-w-6xl mx-auto relative px-4 md:px-12" data-aos="fade-up" data-aos-delay="100">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            speed={800}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              prevEl: '.showcase-prev-btn',
              nextEl: '.showcase-next-btn',
            }}
            pagination={{
              el: '.showcase-pagination-dots',
              clickable: true,
              bulletClass: 'showcase-pagination-bullet',
              bulletActiveClass: 'showcase-pagination-bullet-active',
              renderBullet: (index, className) => {
                return `<span class="${className}"></span>`;
              }
            }}
            breakpoints={{
              // Tablet (640px and up) displays 2 slides
              640: {
                slidesPerView: 2,
              },
              // Desktop (1024px and up) displays 2 slides
              1024: {
                slidesPerView: 2,
              }
            }}
            className="results-swiper !pb-10"
          >
            {resultImages.map((image, i) => (
              <SwiperSlide key={`${image.name}-${i}`} className="!h-auto flex">
                <ResultCard image={image} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons (Visible on desktop/tablet, hidden on mobile for cleaner view) */}
          <button 
            className="showcase-prev-btn absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 z-10 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md bg-white/40 dark:bg-black/40 border border-white/30 dark:border-white/10 text-primary dark:text-blue-400 shadow-lg cursor-pointer hover:bg-primary hover:text-white dark:hover:bg-blue-500 dark:hover:text-white hover:scale-110 hover:shadow-primary/30 active:scale-95 transition-all duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            className="showcase-next-btn absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 z-10 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md bg-white/40 dark:bg-black/40 border border-white/30 dark:border-white/10 text-primary dark:text-blue-400 shadow-lg cursor-pointer hover:bg-primary hover:text-white dark:hover:bg-blue-500 dark:hover:text-white hover:scale-110 hover:shadow-primary/30 active:scale-95 transition-all duration-300"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Custom Pagination Dots Container */}
          <div className="showcase-pagination-dots flex justify-center items-center gap-2 mt-8"></div>
        </div>
      </div>
    </section>
  );
};

export default ResultsShowcase;

