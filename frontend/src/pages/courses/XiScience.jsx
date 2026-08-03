import React from 'react';
import CoursePage from '../../components/courses/CoursePage';
import { Atom, FlaskConical, Calculator, Microscope, BookOpen, Brain, Target, CheckCircle, Users, ClipboardCheck, Compass, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const whyChooseUs = [
  { icon: Brain,          title: 'Strong Concept Building',     desc: 'Every topic is taught from fundamentals — ensuring students genuinely understand rather than memorise.' },
  { icon: Target,         title: 'Foundation for Competitive Exams', desc: 'XI syllabus is aligned with JEE Main, MHT-CET and NEET from day one — no separate foundation course needed.' },
  { icon: ClipboardCheck, title: 'Regular Assessments',         desc: 'Chapter-wise and monthly tests help students identify gaps early and improve consistently.' },
  { icon: Users,          title: 'Experienced Faculty',         desc: 'Subject experts with deep knowledge of XI Science curriculum and competitive exam patterns.' },
  { icon: Compass,        title: 'Personal Mentoring',          desc: 'Individual attention and one-on-one doubt resolution sessions ensure no student is left behind.' },
  { icon: Star,           title: 'Small Batch Advantage',       desc: 'Limited batch sizes mean more interaction, better monitoring, and a focused learning environment.' },
  { icon: BookOpen,       title: 'Structured Study Material',   desc: 'Concise notes, assignments and practice sheets prepared specifically for XI Science students.' },
  { icon: CheckCircle,    title: 'Parent Progress Updates',     desc: 'Regular parent-teacher meetings keep families informed about performance and improvement areas.' },
];

const SubjectSelectionGuide = () => (
  <section className="section-padding bg-blue-50/40 dark:bg-gray-900/40">
    <div className="container mx-auto">
      <div className="text-center mb-14" data-aos="fade-up">
        <h2 className="text-primary font-bold tracking-widest uppercase mb-4 text-sm">Important for New Students</h2>
        <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          Subject Selection <span className="text-primary italic">Guide</span>
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto leading-relaxed">
          Choosing the right subjects in XI Science is one of the most important decisions in a student's academic life.
          This guide helps students and parents make an informed, confident choice.
        </p>
      </div>

      {/* What are Bifocal Subjects */}
      <motion.div data-aos="fade-up"
        className="bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl p-8 md:p-10 mb-10">
        <h4 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
          <span className="bg-primary/10 text-primary p-2 rounded-xl"><BookOpen className="w-6 h-6" /></span>
          What are Bifocal Subjects?
        </h4>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
          In Maharashtra State Board XI Science, students can choose a <strong className="text-gray-900 dark:text-white">Bifocal subject</strong> as an optional fifth subject in addition to the core subjects (Physics, Chemistry, English). Bifocal subjects carry full board marks and can significantly boost a student's overall percentage. They also provide skill-based and career-oriented knowledge.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'Mathematics', desc: 'Core subject for PCM stream. Essential for Engineering, JEE, and MHT-CET PCM.' },
            { name: 'Biology', desc: 'Core subject for PCB stream. Essential for NEET, Medical, and life sciences.' },
            { name: 'Electronics', desc: 'Bifocal subject covering basic electronics, circuits and components.' },
            { name: 'Computer Science', desc: 'Bifocal subject covering programming (C++/Python), data structures and algorithms.' },
            { name: 'Information Technology', desc: 'Bifocal subject covering IT applications, networking and web fundamentals.' },
            { name: 'Other Bifocals', desc: 'Subjects like Technical Vocational (TV), Geography, etc. vary by school availability.' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              className="bg-gray-50 dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700">
              <h5 className="font-bold text-primary mb-2">{s.name}</h5>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Stream Combinations */}
      <motion.div data-aos="fade-up"
        className="bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl p-8 md:p-10 mb-10">
        <h4 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <span className="bg-primary/10 text-primary p-2 rounded-xl"><Atom className="w-6 h-6" /></span>
          Understanding Science Stream Combinations
        </h4>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: 'Science with Mathematics (PCM)',
              subjects: 'Physics + Chemistry + Mathematics',
              desc: 'Ideal for students aiming for Engineering, JEE Main, MHT-CET PCM, Architecture, Data Science, or Computer Science. Mathematics is compulsory for all engineering entrance exams.',
              color: 'border-l-blue-500',
            },
            {
              title: 'Science with Biology (PCB)',
              subjects: 'Physics + Chemistry + Biology',
              desc: 'Ideal for students targeting MBBS, NEET, BDS, BAMS, Pharmacy, Biotechnology, Nursing, or other medical/life-science fields. Biology is compulsory for all medical entrance exams.',
              color: 'border-l-green-500',
            },
            {
              title: 'Science with PCM + PCB (Both)',
              subjects: 'Physics + Chemistry + Mathematics + Biology',
              desc: 'Students who wish to keep both engineering and medical options open can take all four subjects. This is demanding but rewarding — suitable for highly motivated students. Allows eligibility for both JEE and NEET.',
              color: 'border-l-purple-500',
            },
            {
              title: 'Science with Bifocal Subject',
              subjects: 'Physics + Chemistry + Bifocal (e.g. Electronics / CS / IT)',
              desc: 'Students interested in electronics, computer science or IT fields can choose a bifocal subject. This can boost overall board percentage and provide additional skill development alongside core science.',
              color: 'border-l-amber-500',
            },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className={`bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border-l-4 ${s.color} border border-gray-100 dark:border-gray-700 shadow-sm`}>
              <h5 className="font-extrabold text-gray-900 dark:text-white mb-1">{s.title}</h5>
              <p className="text-xs font-bold text-primary mb-3 uppercase tracking-wide">{s.subjects}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Why Math / Bio / Bifocal */}
      <div className="grid md:grid-cols-3 gap-8 mb-10">
        {[
          {
            title: 'Why Choose Mathematics?',
            icon: Calculator,
            color: 'bg-blue-500',
            points: [
              'Opens doors to Engineering, Technology, Data Science, AI, Robotics, Finance, Architecture and Research.',
              'Required for JEE Main, JEE Advanced, MHT-CET PCM — top engineering entrance exams.',
              'Strengthens logical thinking, problem-solving and analytical ability.',
              'Higher scope in government jobs, banking, defence and civil services.',
              'Builds quantitative skills valuable across all career fields.',
              'Students aiming for Computer Science, IT, or Software Engineering must take Mathematics.',
            ],
          },
          {
            title: 'Why Choose Biology?',
            icon: Microscope,
            color: 'bg-green-500',
            points: [
              'Mandatory for MBBS, BDS, BAMS, BHMS, Veterinary, Pharmacy, Nursing and allied medical courses.',
              'Required for NEET — the national medical entrance exam.',
              'Opens paths in Biotechnology, Microbiology, Genetics, Environmental Science and Research.',
              'Growing demand in Bioinformatics, Biomedical Engineering and Pharmaceutical industry.',
              'Students passionate about life sciences, health or medicine must choose Biology.',
              'Can be combined with Mathematics to keep both medical and engineering options open.',
            ],
          },
          {
            title: 'Why Choose Bifocal Subjects?',
            icon: Brain,
            color: 'bg-amber-500',
            points: [
              'Electronics, Computer Science and IT carry full board marks — can boost overall percentage significantly.',
              'Provides hands-on skill development alongside theoretical science learning.',
              'Computer Science prepares students for programming roles, software development and IT careers.',
              'Electronics is valuable for students targeting Electronics Engineering or IoT fields.',
              'IT offers exposure to networking, web design and digital tools.',
              'Useful for students who want additional career skills beyond core PCM/PCB subjects.',
            ],
          },
        ].map((item, i) => (
          <motion.div key={i} data-aos="fade-up" data-aos-delay={i * 100}
            className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl flex flex-col">
            <div className={`${item.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-5`}>
              <item.icon className="text-white w-6 h-6" />
            </div>
            <h4 className="text-xl font-extrabold text-gray-900 dark:text-white mb-4">{item.title}</h4>
            <ul className="space-y-2 flex-1">
              {item.points.map((p, j) => (
                <li key={j} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />{p}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Key factors before selecting */}
      <motion.div data-aos="fade-up"
        className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/5 dark:to-secondary/5 rounded-[2rem] p-8 md:p-10 border border-primary/20">
        <h4 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6 text-center">
          Important Factors Before Selecting Your Stream
        </h4>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            'Consider your genuine interest — you will study these subjects for 2 years. Passion matters.',
            'Think about your target career. Engineering → PCM. Medical → PCB. Both open → PCM + PCB.',
            'Assess your Class X performance — stronger in Maths? Choose PCM. Stronger in Biology? Choose PCB.',
            'Taking both PCM and PCB is possible but requires strong time management and dedication.',
            'Consult with your teachers, parents, and our academic counsellors before finalising.',
            'Don\'t choose a stream based on peer pressure — your career depends on this choice.',
          ].map((tip, i) => (
            <div key={i} className="flex items-start gap-3 bg-white/60 dark:bg-gray-900/60 p-4 rounded-2xl">
              <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

const XiScience = () => (
  <CoursePage
    seo={{ title: 'XI Science Coaching | Prayan Tutorials Dombivli' }}
    hero={{
      badge: 'Class XI Science',
      title: 'XI Science',
      tagline: 'Build Strong Concepts. Lay the Foundation for Academic Excellence.',
    }}
    overview={{
      title: 'Class XI Science — Where Excellence Begins',
      description: 'Class XI Science is the critical turning point in a student\'s academic journey. At Prayan Tutorials, we ensure every student develops a deep conceptual understanding of Physics, Chemistry, Mathematics, and Biology — the four pillars of science education. Our structured programme bridges the gap between secondary school and higher secondary learning, preparing students simultaneously for board examinations and future competitive entrance exams like JEE and NEET.',
      duration: '1 Academic Year (June – March)',
      highlights: [
        'Complete XI Science syllabus coverage for PCM and PCB streams',
        'Concurrent preparation for JEE, NEET and MHT-CET foundations',
        'Weekly test series aligned to board and entrance exam patterns',
        'Personal doubt sessions with dedicated faculty',
        'Smart revision notes and topic-wise assignments',
        'Small batch sizes for individual attention',
        'Parent-teacher interaction and progress tracking',
        'Foundation concepts for XII Science and beyond',
      ],
    }}
    extraSections={<SubjectSelectionGuide />}
    subjects={[
      { icon: Atom, name: 'Physics', desc: 'Mechanics, Thermodynamics, Waves, Optics and Electrostatics with derivation mastery.',
        topics: ['Kinematics', 'Laws of Motion', 'Work, Energy & Power', 'Gravitation', 'Thermal Properties', 'Waves & Sound'] },
      { icon: FlaskConical, name: 'Chemistry', desc: 'Physical, Organic and Inorganic Chemistry with reaction mechanisms and periodic properties.',
        topics: ['Basic Concepts', 'Atomic Structure', 'Periodic Table', 'Chemical Bonding', 'Redox Reactions', 'Organic Chemistry Basics'] },
      { icon: Calculator, name: 'Mathematics', desc: 'Algebra, Trigonometry, Coordinate Geometry, Calculus foundations and Vectors.',
        topics: ['Sets & Functions', 'Trigonometry', 'Algebra', 'Coordinate Geometry', 'Calculus Intro', 'Statistics & Probability'] },
      { icon: Microscope, name: 'Biology', desc: 'Cell Biology, Plant Physiology, Animal Physiology and Genetics fundamentals.',
        topics: ['Cell Structure', 'Biomolecules', 'Plant Morphology', 'Animal Kingdom', 'Human Physiology', 'Genetics Introduction'] },
    ]}
    whyChooseUs={whyChooseUs}
    careers={[
      { category: 'After XI Science', options: ['Prepare for XII Science board exams', 'Begin JEE/NEET foundation preparation', 'Explore science olympiads and competitions'] },
      { category: 'Engineering Pathways', options: ['JEE Main & Advanced', 'MHT-CET PCM', 'B.Tech / B.E. in all engineering branches', 'Diploma Engineering'] },
      { category: 'Medical Pathways', options: ['NEET UG', 'MHT-CET PCB', 'MBBS, BDS, BAMS, BHMS', 'B.Pharm, Nursing, BPT'] },
      { category: 'Science & Research', options: ['B.Sc in Physics, Chemistry, Maths, Biology', 'Research institutes (TIFR, BARC, ISRO)', 'National Science Olympiad paths', 'Data Science & AI foundation'] },
      { category: 'Government Opportunities', options: ['Defence services (NDA after XII)', 'UPSC Science posts', 'State PSC examinations', 'Scientific and technical departments'] },
      { category: 'Alternative Careers', options: ['Architecture (NATA)', 'Pharmacy (GPAT)', 'Environmental Science', 'Biotechnology & Biochemistry'] },
    ]}
    faqs={[
      { q: 'Who can join the XI Science programme?', a: 'Any student who has passed Class X (SSC or equivalent) with a science background can enrol. Students from any board — State, CBSE, or ICSE — are welcome.' },
      { q: 'Do you cover both PCM and PCB streams?', a: 'Yes. We offer separate batches for PCM (Physics, Chemistry, Mathematics) and PCB (Physics, Chemistry, Biology) streams.' },
      { q: 'Will XI Science coaching prepare me for JEE and NEET too?', a: 'Absolutely. Our XI curriculum is designed to align with JEE Main and NEET syllabus from day one, giving students a strong competitive foundation.' },
      { q: 'What is the difference between PCM and PCB?', a: 'PCM (Physics, Chemistry, Mathematics) is for students targeting engineering, technology and related fields. PCB (Physics, Chemistry, Biology) is for students targeting medical, pharmacy and life sciences. Students can also take both (PCM + PCB) to keep all options open.' },
      { q: 'What are bifocal subjects and should I choose one?', a: 'Bifocal subjects like Electronics, Computer Science and IT are optional subjects that carry full board marks and provide skill development. They can significantly boost your board percentage and are beneficial for students interested in technology fields.' },
      { q: 'How are tests conducted?', a: 'Weekly tests are conducted every week covering recent topics, followed by monthly full-syllabus revision tests to ensure comprehensive preparation.' },
      { q: 'Are doubt sessions available for XI Science students?', a: 'Yes. Dedicated personal doubt-solving sessions are conducted regularly where students can get individual attention from subject experts.' },
      { q: 'What is the batch size?', a: 'We maintain small batches to ensure every student receives personal attention and quality instruction from faculty.' },
    ]}
  />
);

export default XiScience;
