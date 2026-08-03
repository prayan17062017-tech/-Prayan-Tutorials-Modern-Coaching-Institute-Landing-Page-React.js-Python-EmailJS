import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Star, Quote } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const testimonials = [
  {
    name: "Tanmay Potdar",
    course: "XII Science (PCM)",
    rating: 5,
    review: "Prayan Tutorials has been instrumental in my HSC preparation. The personalized attention and constant doubt-solving sessions helped me score 93.50%. The faculty is truly expert in their subjects.",
    image: "https://i.pravatar.cc/150?u=tanmay"
  },
  {
    name: "Manas Chaudhari",
    course: "XII Science (PCM)",
    rating: 5,
    review: "The test series at Prayan is unmatched. It builds real exam confidence. Scoring 90% in HSC and 98.35 percentile in CET was possible only because of the structured learning here.",
    image: "https://i.pravatar.cc/150?u=manas"
  },
  {
    name: "Khushi Qureshi",
    course: "XII Science (PCB)",
    rating: 5,
    review: "As a NEET aspirant, I found the Biology faculty here exceptional. The way concepts are simplified is amazing. Highly recommended for any science student!",
    image: "https://i.pravatar.cc/150?u=khushi"
  },
  {
    name: "Aishwarya Wani",
    course: "XII Science (PCM)",
    rating: 5,
    review: "The environment at Prayan is very positive. AC classrooms and small batch sizes make a huge difference in concentration. Thank you Ravina Sir and team!",
    image: "https://i.pravatar.cc/150?u=aishwarya"
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="section-padding bg-white dark:bg-gray-950 overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-primary font-bold tracking-widest uppercase mb-4 text-sm">Testimonials</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            What Our <span className="text-primary italic">Students</span> Say
          </h3>
        </div>

        <div className="max-w-6xl mx-auto" data-aos="fade-up">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            breakpoints={{
              640: { slidesPerView: 1 },
              1024: { slidesPerView: 1.5 },
            }}
            className="testimonial-swiper !pb-16"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={t.name}>
                <div className="glass dark:glass-dark p-10 md:p-14 rounded-[3rem] border border-white/20 shadow-2xl relative mx-4 h-full flex flex-col items-center text-center">
                  <div className="absolute top-10 left-10 text-primary/10">
                    <Quote className="w-20 h-20 rotate-180" />
                  </div>
                  
                  <div className="relative mb-8">
                    <div className="w-24 h-24 rounded-full border-4 border-primary p-1">
                      <img src={t.image} alt={t.name} className="w-full h-full rounded-full object-cover" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-accent p-1.5 rounded-full shadow-lg">
                      <Star className="text-white w-4 h-4 fill-white" />
                    </div>
                  </div>

                  <div className="flex justify-center mb-6 space-x-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="text-accent w-5 h-5 fill-accent" />
                    ))}
                  </div>

                  <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 italic mb-8 leading-relaxed font-medium">
                    "{t.review}"
                  </p>

                  <div>
                    <h4 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{t.name}</h4>
                    <p className="text-primary font-bold uppercase tracking-[0.2em] text-xs mt-1">{t.course}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
