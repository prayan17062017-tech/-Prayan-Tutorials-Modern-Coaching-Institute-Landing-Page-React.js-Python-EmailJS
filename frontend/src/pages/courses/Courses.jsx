import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Clock, Users, BookOpen, FlaskConical, Atom, Calculator, Microscope, GraduationCap, Zap, CalendarDays } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BackgroundPattern from '../../components/BackgroundPattern';
import Chatbot from '../../components/chatbot/Chatbot';
import BackToTop from '../../components/BackToTop';
import Breadcrumb from '../../components/courses/Breadcrumb';

const COURSES = [
  {
    slug: 'xi-xii-science', icon: CalendarDays, color: 'bg-indigo-600',
    name: 'XI + XII Science (2 Years)', tag: 'Integrated Programme',
    desc: 'Join from Class XI and continue through XII — build strong concepts over two full academic years for boards, JEE and NEET with less pressure and stronger results.',
    duration: '2 Academic Years', eligibility: 'SSC / Class X Pass', subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
  },
  {
    slug: 'xi-science', icon: BookOpen, color: 'bg-blue-500',
    name: 'XI Science', tag: 'Foundation',
    desc: 'Build a rock-solid scientific foundation in Physics, Chemistry, Mathematics and Biology for Class XI.',
    duration: '1 Year', eligibility: 'SSC / Class X Pass', subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
  },
  {
    slug: 'xii-science', icon: GraduationCap, color: 'bg-purple-500',
    name: 'XII Science', tag: 'Board + Competitive',
    desc: 'Comprehensive XII Science coaching integrating board exam preparation with competitive entrance exam readiness.',
    duration: '1 Year', eligibility: 'XI Science Pass', subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
  },
  {
    slug: 'jee-main', icon: Calculator, color: 'bg-orange-500',
    name: 'JEE (Main)', tag: 'Engineering Entrance',
    desc: 'Targeted JEE Main preparation with intensive problem solving, mock tests and expert faculty guidance.',
    duration: '1–2 Years', eligibility: 'XII PCM / Appearing', subjects: ['Physics', 'Chemistry', 'Mathematics'],
  },
  {
    slug: 'mht-cet-pcm', icon: Zap, color: 'bg-yellow-500',
    name: 'MHT-CET PCM', tag: 'Maharashtra CET',
    desc: 'Strategic MHT-CET PCM coaching for engineering aspirants aligned with the latest exam pattern.',
    duration: '1 Year', eligibility: 'XII PCM / Appearing', subjects: ['Physics', 'Chemistry', 'Mathematics'],
  },
  {
    slug: 'mht-cet-pcb', icon: FlaskConical, color: 'bg-green-500',
    name: 'MHT-CET PCB', tag: 'Maharashtra CET',
    desc: 'Focused MHT-CET PCB preparation for medical and allied health science aspirants in Maharashtra.',
    duration: '1 Year', eligibility: 'XII PCB / Appearing', subjects: ['Physics', 'Chemistry', 'Biology'],
  },
  {
    slug: 'neet', icon: Microscope, color: 'bg-red-500',
    name: 'NEET', tag: 'Medical Entrance',
    desc: 'Comprehensive NEET coaching covering Physics, Chemistry and Biology with NCERT-based strategy.',
    duration: '1–2 Years', eligibility: 'XII PCB / Appearing', subjects: ['Physics', 'Chemistry', 'Biology'],
  },
];

const CoursesPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
      <Navbar />
      <main className="relative z-0 pt-24">
        {/* Hero */}
        <section className="section-padding pb-10">
          <div className="container mx-auto">
            <Breadcrumb items={[{ label: 'Courses' }]} />
            <div className="text-center max-w-3xl mx-auto" data-aos="fade-up">
              <h2 className="text-primary font-bold tracking-widest uppercase mb-4 text-sm">What We Offer</h2>
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
                Courses <span className="text-primary italic">Offered</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Explore our comprehensive science coaching programs designed to help students excel in board examinations and competitive entrance exams.
              </p>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="section-padding pt-0">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {COURSES.map((c, i) => (
                <motion.div key={c.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8, boxShadow: '0 30px 60px -12px rgba(30,64,175,0.2)' }}
                  className="bg-gray-50 dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden group transition-all duration-500 flex flex-col">
                  {/* Top bar */}
                  <div className={`${c.color} h-1.5 w-full`} />
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-6">
                      <div className={`${c.color} w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg`}>
                        <c.icon className="text-white w-7 h-7" />
                      </div>
                      <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-full border border-primary/20">{c.tag}</span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">{c.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm mb-6 flex-1">{c.desc}</p>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-100 dark:border-gray-700">
                        <p className="text-xs text-gray-400 mb-1 font-semibold uppercase tracking-wide">Duration</p>
                        <p className="text-sm font-bold text-gray-900 dark:text-white flex items-center"><Clock className="w-3.5 h-3.5 mr-1.5 text-primary" />{c.duration}</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-100 dark:border-gray-700">
                        <p className="text-xs text-gray-400 mb-1 font-semibold uppercase tracking-wide">Eligibility</p>
                        <p className="text-sm font-bold text-gray-900 dark:text-white flex items-center"><Users className="w-3.5 h-3.5 mr-1.5 text-primary" />{c.eligibility}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {c.subjects.map(s => (
                        <span key={s} className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full border border-primary/10">{s}</span>
                      ))}
                    </div>
                    <Link to={`/courses/${c.slug}`}>
                      <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                        className="w-full bg-primary text-white py-3.5 rounded-2xl font-bold flex items-center justify-center group/btn shadow-lg shadow-primary/20">
                        Learn More <ChevronRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BackgroundPattern />
      <Chatbot />
      <BackToTop />
    </>
  );
};

export default CoursesPage;
