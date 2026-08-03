import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, FileText, ClipboardList, HelpCircle, RefreshCw, Monitor, BarChart2, Pencil } from 'lucide-react';

const methods = [
  { icon: BookOpen,     title: 'Concept Learning',        desc: 'Deep conceptual clarity through interactive lectures and real-world examples.' },
  { icon: FileText,     title: 'Smart Notes',             desc: 'Concise, exam-focused notes prepared by experienced faculty.' },
  { icon: ClipboardList,title: 'Weekly Tests',            desc: 'Regular assessments to track progress and identify weak areas.' },
  { icon: Pencil,       title: 'Assignments',             desc: 'Structured problem sets to reinforce concepts after each topic.' },
  { icon: HelpCircle,   title: 'Doubt Sessions',          desc: 'Dedicated personal doubt-solving sessions for every student.' },
  { icon: RefreshCw,    title: 'Revision Sessions',       desc: 'Systematic revision of all topics before board and competitive exams.' },
  { icon: Monitor,      title: 'Digital Learning',        desc: 'Digital tools and resources to complement classroom teaching.' },
  { icon: BarChart2,    title: 'Performance Analysis',    desc: 'Detailed feedback and performance tracking for continuous improvement.' },
];

const TeachingMethodology = () => (
  <section className="section-padding">
    <div className="container mx-auto">
      <div className="text-center mb-14" data-aos="fade-up">
        <h2 className="text-primary font-bold tracking-widest uppercase mb-4 text-sm">How We Teach</h2>
        <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white">Our Teaching <span className="text-primary italic">Methodology</span></h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {methods.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.08 }} whileHover={{ y: -5 }}
            className="bg-gray-50 dark:bg-gray-900 p-6 rounded-[1.5rem] border border-gray-100 dark:border-gray-800 shadow-lg group">
            <div className="bg-primary/10 group-hover:bg-primary w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300">
              <m.icon className="text-primary group-hover:text-white w-6 h-6 transition-all duration-300" />
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">{m.title}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{m.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TeachingMethodology;
