import React from 'react';
import { motion } from 'framer-motion';
import { Users, Thermometer, Tv, ClipboardCheck, UserCheck, Compass, UsersRound, Trophy } from 'lucide-react';

const defaultFeatures = [
  { icon: Users,        title: 'Experienced Faculty',         desc: 'MSc, PhD, and BE qualified subject experts with years of teaching experience.' },
  { icon: UsersRound,   title: 'Small Batch Sizes',           desc: 'Limited students per batch ensuring personal attention for every learner.' },
  { icon: Thermometer,  title: 'AC Classrooms',               desc: 'Fully air-conditioned classrooms for a comfortable learning environment.' },
  { icon: ClipboardCheck,title:'Weekly Test Series',          desc: 'Structured weekly assessments to build exam confidence and track progress.' },
  { icon: UserCheck,    title: 'Personal Attention',          desc: 'One-on-one guidance to address individual academic challenges.' },
  { icon: Compass,      title: 'Career Guidance',             desc: 'Expert counselling to help students choose the right career path.' },
  { icon: Tv,           title: 'Parent-Teacher Interaction',  desc: 'Regular communication with parents about student performance.' },
  { icon: Trophy,       title: 'Result-Oriented Teaching',    desc: '100% HSC result track record with top competitive exam achievements.' },
];

const WhyChooseUs = ({ features }) => {
  const items = features || defaultFeatures;
  return (
  <section className="section-padding">
    <div className="container mx-auto">
      <div className="text-center mb-14" data-aos="fade-up">
        <h2 className="text-primary font-bold tracking-widest uppercase mb-4 text-sm">Our Advantage</h2>
        <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white">Why Choose <span className="text-primary italic">Prayan Tutorials</span></h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((f, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.08 }} whileHover={{ y: -6, boxShadow: '0 25px 50px -12px rgba(30,64,175,0.15)' }}
            className="bg-gray-50 dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 text-center shadow-xl group cursor-default transition-all duration-500">
            <div className="bg-primary/10 group-hover:bg-primary w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-500">
              <f.icon className="text-primary group-hover:text-white w-7 h-7 transition-all duration-500" />
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">{f.title}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default WhyChooseUs;
