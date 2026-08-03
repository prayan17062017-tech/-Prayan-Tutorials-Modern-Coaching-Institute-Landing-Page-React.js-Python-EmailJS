import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, ThumbsUp, CheckCircle } from 'lucide-react';

const About = () => {
  const cards = [
    {
      icon: Target,
      title: "Mission",
      desc: "To create strong conceptual understanding, analytical thinking, and exam confidence.",
      color: "bg-blue-500"
    },
    {
      icon: Eye,
      title: "Vision",
      desc: "Holistic student development and dedicated academic excellence for future leaders.",
      color: "bg-purple-500"
    },
    {
      icon: ThumbsUp,
      title: "Why Choose Us",
      desc: "Expert guidance, personalized attention, and a track record of 100% success.",
      color: "bg-green-500"
    }
  ];

  return (
    <section id="about" className="section-padding overflow-hidden">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image with Decorative Elements */}
          <div className="relative" data-aos="fade-right">
            <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white dark:border-gray-800">
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800" 
                alt="Classroom" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Background Shape */}
            <div className="absolute -top-10 -left-10 w-full h-full bg-primary/10 rounded-[2rem] -rotate-6 -z-0"></div>
            {/* Stats Badge */}
            <div className="absolute -bottom-10 -right-10 glass dark:glass-dark p-8 rounded-3xl shadow-2xl z-20 hidden md:block border-l-4 border-primary">
              <p className="text-4xl font-extrabold text-primary">10+</p>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-widest">Years of Legacy</p>
            </div>
          </div>

          {/* Right: Content */}
          <div data-aos="fade-left">
            <h2 className="text-primary font-bold tracking-widest uppercase mb-4 text-sm">Empowering Excellence</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-8 leading-tight">
              A Premier Science Coaching <span className="text-primary">Institute</span>
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
              Prayan Tutorials is a premier science coaching institute dedicated to academic excellence and holistic student development. We provide expert guidance for XI & XII Science students along with preparation for JEE (Mains) and NEET examinations.
            </p>

            {/* Feature Cards Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {cards.map((card, i) => (
                <motion.div
                  key={card.title}
                  whileHover={{ y: -5 }}
                  className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all"
                >
                  <div className={`${card.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                    <card.icon className="text-white w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">{card.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* List */}
            <div className="mt-10 space-y-4">
              {['Strong Conceptual Foundation', 'Analytical Thinking Development', 'Comprehensive Exam Preparation'].map((item) => (
                <div key={item} className="flex items-center space-x-3">
                  <div className="bg-primary/10 p-1 rounded-full">
                    <CheckCircle className="text-primary w-5 h-5" />
                  </div>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
