import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { 
  ChevronDown, 
  Plus, 
  Minus, 
  Atom, 
  FlaskConical, 
  Microscope, 
  Beaker, 
  Pi, 
  Zap 
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  timelineSteps, 
  methodologyCards, 
  workflowSteps, 
  trustCards, 
  counterData, 
  successPathStages, 
  faqs 
} from '../data/whyPrayan';

const DecimalCountUp = ({ end, duration = 2, decimals = 1 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(end);
    }
  }, [isInView, end, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(latest.toFixed(decimals));
    });
    return () => unsubscribe();
  }, [springValue, decimals]);

  return <span ref={ref}>{displayValue}</span>;
};

const WhyPrayan = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="overflow-x-hidden min-h-screen relative bg-gradient-to-b from-blue-50/30 via-white to-blue-50/20 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Background Icons */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10 dark:opacity-20 overflow-hidden">
        <Atom className="absolute top-[15%] left-[5%] w-32 h-32 animate-pulse text-primary rotate-12" />
        <Pi className="absolute top-[40%] right-[8%] w-24 h-24 animate-bounce text-blue-500 -rotate-12" />
        <FlaskConical className="absolute bottom-[20%] left-[10%] w-28 h-28 animate-pulse text-primary -rotate-45" />
        <Zap className="absolute top-[60%] left-[45%] w-16 h-16 animate-pulse text-amber-400" />
        <Microscope className="absolute bottom-[10%] right-[15%] w-36 h-36 animate-pulse text-blue-600 rotate-12" />
        <Beaker className="absolute top-[25%] right-[25%] w-20 h-20 animate-bounce text-primary rotate-45" />
      </div>

      <Navbar />
      <main className="pt-28 relative z-10">
        <HeroSection />
        <TimelineSection />
        <MethodologySection />
        <TrustSection />
        <CounterSection />
        <SuccessPathSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

const HeroSection = () => (
  <section className="relative min-h-[60vh] flex items-center justify-center pt-10 pb-20 px-6 overflow-hidden">
    <div className="container mx-auto text-center relative z-10" data-aos="fade-up">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
          Why Choose <span className="text-primary">Prayan Tutorials?</span>
        </h1>
        <p className="text-xl md:text-2xl text-primary font-semibold mb-8 tracking-wide">
          Your Journey Towards Academic Excellence Begins Here.
        </p>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-10">
            Prayan Tutorials is one of the best coaching institutes for XI, XII Science, JEE (Mains), MHT-CET, and NEET preparation. We combine expert faculty, innovative teaching methods, and personalized attention to help students achieve their dreams.
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

const TimelineSection = () => (
  <section className="section-padding bg-gray-50/50 dark:bg-gray-900/20 overflow-hidden">
    <div className="container mx-auto">
      <div className="text-center mb-16" data-aos="fade-up">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          Your Learning Journey at Prayan Tutorials
        </h2>
        <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
        {/* Connection Path for Desktop (Visual only) */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none hidden lg:block opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
            <path d="M100 100 H1100 V300 H100 V500 H1100 V700 H100" stroke="currentColor" strokeWidth="2" className="text-primary" />
          </svg>
        </div>

        {timelineSteps.map((step, index) => (
          <motion.div
            key={step.title}
            data-aos="fade-up"
            data-aos-delay={index * 50}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-[2rem] shadow-xl border border-primary/10 relative group"
          >
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg z-20">
              {index + 1}
            </div>
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
              <step.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const MethodologySection = () => (
  <section className="section-padding overflow-hidden">
    <div className="container mx-auto">
      <div className="text-center mb-16" data-aos="fade-up">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          Our Teaching Methodology
        </h2>
        <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {methodologyCards.map((card, index) => (
          <motion.div
            key={card.title}
            whileHover={{ y: -10 }}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 group hover:border-primary/50 transition-all"
          >
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
              <card.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{card.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{card.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-primary/5 dark:bg-primary/10 p-8 md:p-12 rounded-[3rem] text-center" data-aos="zoom-in">
        <h3 className="text-2xl font-bold mb-12 text-gray-900 dark:text-white">Our Visual Workflow</h3>
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
          {workflowSteps.map((step, index) => (
            <React.Fragment key={step}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 px-6 md:px-8 py-3 md:py-4 rounded-2xl shadow-lg font-bold text-primary border border-primary/20 text-sm md:text-base"
              >
                {step}
              </motion.div>
              {index < workflowSteps.length - 1 && (
                <div className="text-primary/30 rotate-90 md:rotate-0">
                  <ChevronDown className="md:-rotate-90 w-6 h-6 md:w-8 md:h-8" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const TrustSection = () => (
  <section className="section-padding bg-gray-50/50 dark:bg-gray-900/20">
    <div className="container mx-auto">
      <div className="text-center mb-16" data-aos="fade-up">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          Trusted By Parents. Loved By Students.
        </h2>
        <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
        {trustCards.map((card, index) => (
          <motion.div
            key={card.title}
            whileHover={{ y: -5 }}
            data-aos="fade-up"
            data-aos-delay={index * 50}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <card.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2 leading-tight">{card.title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{card.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const CounterSection = () => (
  <section className="section-padding bg-primary text-white overflow-hidden">
    <div className="container mx-auto" data-aos="zoom-in">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
        {counterData.map((item, index) => (
          <div key={item.label} className="text-center">
            <div className="text-4xl md:text-6xl font-extrabold mb-2">
              <DecimalCountUp end={item.value} decimals={item.decimal ? 1 : 0} />
              {item.suffix}
            </div>
            <p className="text-sm md:text-lg font-medium text-white/80 uppercase tracking-widest">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const SuccessPathSection = () => (
  <section className="section-padding overflow-hidden">
    <div className="container mx-auto">
      <div className="text-center mb-16" data-aos="fade-up">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          Every Student's Success Story Begins Here
        </h2>
        <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
      </div>

      <div className="relative" data-aos="fade-up">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 -translate-y-1/2 hidden lg:block"></div>
        
        <div className="grid lg:grid-cols-4 gap-8 gap-y-16 relative z-10">
          {successPathStages.map((stage, index) => (
            <motion.div
              key={stage.title}
              whileHover={{ scale: 1.05 }}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              className="text-center group"
            >
              <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-full shadow-2xl flex items-center justify-center mx-auto mb-6 border-4 border-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 relative">
                <stage.icon className="w-10 h-10 text-primary group-hover:text-white transition-colors" />
                {/* Number indicator */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{stage.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[200px] mx-auto">{stage.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const FAQSection = () => {
  const [openIndex, setOpenIndex] = React.useState(0);

  return (
    <section className="section-padding bg-gray-50/50 dark:bg-gray-900/20">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 50}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <span className="text-lg font-bold text-gray-900 dark:text-white">{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="w-6 h-6 text-primary shrink-0" />
                ) : (
                  <Plus className="w-6 h-6 text-primary shrink-0" />
                )}
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                } overflow-hidden`}
              >
                <div className="px-8 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-50 dark:border-gray-700 pt-6">
                  {faq.answer}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => (
  <section className="section-padding relative overflow-hidden">
    <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 -z-10"></div>
    <div className="container mx-auto text-center" data-aos="zoom-in">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-12 md:p-20 rounded-[4rem] shadow-2xl border border-primary/10 relative">
        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-8">
          Ready To Begin Your <span className="text-primary">Academic Journey?</span>
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <a
            href="/#enquiry"
            className="w-full md:w-auto bg-primary text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all"
          >
            Join Now
          </a>
          <a
            href="/#contact"
            className="w-full md:w-auto bg-white dark:bg-gray-900 text-primary border-2 border-primary px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:bg-primary hover:text-white hover:scale-105 transition-all"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default WhyPrayan;
