import React from 'react';
import CoursePage from '../../components/courses/CoursePage';
import { Atom, FlaskConical, Calculator, Microscope, CalendarDays, TrendingUp, Heart, Shield, Brain, Star, CheckCircle, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const whyChooseUs = [
  { icon: Brain,        title: 'Strongest Conceptual Foundation', desc: 'Two full academic years to build concepts from scratch — XI and XII are both covered with depth and clarity.' },
  { icon: TrendingUp,   title: 'Better Board Preparation',        desc: 'With more time and regular revision across both years, students are significantly better prepared for HSC board exams.' },
  { icon: Shield,       title: 'Better CET & JEE Preparation',    desc: 'Syllabus for JEE Main and MHT-CET covers XI + XII. Students gain an advantage by preparing for both years systematically.' },
  { icon: Heart,        title: 'Less Academic Pressure',          desc: 'The workload is distributed across two years, reducing last-minute cramming stress and burnout in XII.' },
  { icon: CalendarDays, title: 'Regular Assessments',             desc: 'Continuous testing across XI and XII ensures steady progress, early identification of weak areas and timely improvement.' },
  { icon: Star,         title: 'Continuous Improvement',          desc: 'Year-on-year performance tracking and mentoring allows students to grow consistently from XI through XII.' },
  { icon: Users,        title: 'Experienced Faculty',             desc: 'The same dedicated faculty guide students across both years, providing continuity and deep understanding of each student\'s progress.' },
  { icon: CheckCircle,  title: 'NEET & Medical Readiness',        desc: 'NEET syllabus spans both XI and XII Biology. Two-year preparation gives medical aspirants a significant edge.' },
];

const TwoYearAdvantage = () => (
  <section className="section-padding bg-indigo-50/40 dark:bg-gray-900/40">
    <div className="container mx-auto">
      <div className="text-center mb-14" data-aos="fade-up">
        <h2 className="text-primary font-bold tracking-widest uppercase mb-4 text-sm">Programme Structure</h2>
        <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          How the 2-Year Programme <span className="text-primary italic">Works</span>
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto leading-relaxed">
          This is not an integrated board course. It is two separate, complete academic years —
          XI Science followed by XII Science — delivered consecutively by the same faculty team.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {[
          {
            year: 'Year 1',
            title: 'XI Science (1 Academic Year)',
            color: 'border-l-blue-500 bg-blue-50/60 dark:bg-blue-900/10',
            badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
            points: [
              'Complete Class XI Science syllabus (Maharashtra State Board)',
              'Physics, Chemistry, Mathematics and/or Biology',
              'Concept-building from fundamentals — designed for complete beginners to higher secondary science',
              'Weekly chapter-wise tests and monthly revision tests',
              'JEE / NEET / MHT-CET foundation concepts introduced from XI itself',
              'Personal doubt sessions and smart study material',
              'Parent-teacher interaction for progress monitoring',
            ],
          },
          {
            year: 'Year 2',
            title: 'XII Science (1 Academic Year)',
            color: 'border-l-purple-500 bg-purple-50/60 dark:bg-purple-900/10',
            badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
            points: [
              'Complete Class XII Science syllabus (Maharashtra State Board)',
              'Board exam-focused teaching with answer writing and practical preparation',
              'Integrated JEE Main, MHT-CET and NEET preparation',
              'Full-length mock tests and board pattern practice papers',
              'Revision crash courses before board examinations',
              'Competitive exam test series aligned to latest patterns',
              'Career counselling and college admission guidance',
            ],
          },
        ].map((yr, i) => (
          <motion.div key={i} data-aos="fade-up" data-aos-delay={i * 100}
            className={`rounded-[2rem] border-l-4 border border-gray-100 dark:border-gray-800 shadow-xl p-8 ${yr.color}`}>
            <div className="flex items-center gap-3 mb-5">
              <span className={`px-4 py-1.5 rounded-full text-sm font-extrabold ${yr.badge}`}>{yr.year}</span>
              <h4 className="text-xl font-extrabold text-gray-900 dark:text-white">{yr.title}</h4>
            </div>
            <ul className="space-y-3">
              {yr.points.map((p, j) => (
                <li key={j} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />{p}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Advantages callout */}
      <motion.div data-aos="fade-up"
        className="bg-gradient-to-r from-primary to-secondary rounded-[2rem] p-8 md:p-10 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 pointer-events-none" />
        <div className="relative z-10">
          <h4 className="text-2xl font-extrabold mb-6 text-center">Advantages of Joining from Class XI</h4>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Strong Foundation', desc: 'Concepts are built from scratch over two years, not rushed in one.' },
              { title: 'Better Board Results', desc: 'More preparation time means stronger performance in XII HSC boards.' },
              { title: 'Competitive Edge', desc: 'JEE, NEET and CET syllabus covers both years — earlier start = bigger advantage.' },
              { title: 'Reduced Stress', desc: 'Workload distributed across 2 years reduces XII-year pressure significantly.' },
            ].map((a, i) => (
              <div key={i} className="bg-white/10 rounded-2xl p-5">
                <h5 className="font-bold mb-2">{a.title}</h5>
                <p className="text-sm text-white/80 leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const XiXiiScience = () => (
  <CoursePage
    seo={{ title: 'XI + XII Science 2 Years Programme | Prayan Tutorials Dombivli' }}
    hero={{
      badge: 'XI + XII Science — 2 Year Programme',
      title: 'XI + XII Science (2 Years)',
      tagline: 'Start Early. Build Deep. Achieve More — Across Two Complete Academic Years.',
      gradient: 'bg-gradient-to-br from-indigo-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-indigo-900/30',
    }}
    overview={{
      title: 'Two Years. One Mission. Complete Academic Excellence.',
      description: 'The XI + XII Science (2 Years) programme at Prayan Tutorials is designed for students who wish to begin their journey from Class XI and continue through Class XII under consistent expert guidance. This is not an integrated or fast-track course — it is two separate, full academic years (XI Science followed by XII Science), each taught completely and comprehensively. Students benefit from a strong conceptual foundation built over XI, which directly strengthens their XII board preparation and competitive exam performance.',
      duration: 'XI Science: 1 Year + XII Science: 1 Year (Total: 2 Academic Years)',
      highlights: [
        'Students join from Class XI and continue till completion of Class XII',
        'Coaching builds concepts from the beginning — no prior coaching needed',
        'Consistent preparation for boards and competitive exams across both years',
        'JEE, NEET and MHT-CET foundations built from XI itself',
        'Less academic pressure due to workload distribution across 2 years',
        'Regular assessments throughout XI and XII for continuous improvement',
        'Same faculty team mentors students across both academic years',
        'Personal doubt sessions, study material and parent-teacher interaction',
      ],
    }}
    extraSections={<TwoYearAdvantage />}
    subjects={[
      { icon: Atom, name: 'Physics (XI + XII)', desc: 'From Mechanics and Kinematics in XI to Electrostatics, Magnetism and Semiconductors in XII.',
        topics: ['Kinematics (XI)', 'Thermodynamics (XI)', 'Electrostatics (XII)', 'Current Electricity (XII)', 'Optics (XII)', 'Semiconductors (XII)'] },
      { icon: FlaskConical, name: 'Chemistry (XI + XII)', desc: 'From Atomic Structure and Bonding in XI to Electrochemistry, Organic Reactions and Coordination Compounds in XII.',
        topics: ['Atomic Structure (XI)', 'Chemical Bonding (XI)', 'Electrochemistry (XII)', 'Chemical Kinetics (XII)', 'Organic Chemistry (Both)', 'Coordination Compounds (XII)'] },
      { icon: Calculator, name: 'Mathematics (XI + XII)', desc: 'From Algebra and Trigonometry in XI to Calculus, Vectors, 3D Geometry and Probability in XII.',
        topics: ['Trigonometry (XI)', 'Coordinate Geometry (XI)', 'Calculus (XII)', 'Vectors & 3D (XII)', 'Linear Programming (XII)', 'Probability (Both)'] },
      { icon: Microscope, name: 'Biology (XI + XII)', desc: 'From Cell Biology and Plant Physiology in XI to Genetics, Evolution, Biotechnology and Ecology in XII.',
        topics: ['Cell Biology (XI)', 'Plant Physiology (XI)', 'Human Physiology (XI)', 'Genetics (XII)', 'Biotechnology (XII)', 'Ecology (XII)'] },
    ]}
    whyChooseUs={whyChooseUs}
    careers={[
      { category: 'Engineering', options: ['B.Tech / B.E. (All branches)', 'Computer Science & AI', 'Electronics & Communication', 'Mechanical, Civil & Chemical Engineering', 'Architecture (NATA)', 'Data Science & Robotics'] },
      { category: 'Medical & Allied Health', options: ['MBBS', 'BDS (Dentistry)', 'BAMS (Ayurveda)', 'BHMS (Homeopathy)', 'B.Pharm / M.Pharm', 'NEET UG — National Medical Entrance', 'Nursing & Physiotherapy'] },
      { category: 'Technology & Innovation', options: ['Artificial Intelligence & ML', 'Cybersecurity', 'Software Engineering', 'Data Science', 'Information Technology', 'Space Technology (ISRO)'] },
      { category: 'Pure Science & Research', options: ['B.Sc / M.Sc in Physics, Chemistry, Maths, Biology', 'TIFR, BARC, ISRO Research roles', 'Environmental & Biomedical Sciences', 'Biotechnology & Genetics Research'] },
      { category: 'Government & Defence', options: ['NDA (National Defence Academy)', 'UPSC Civil Services', 'State PSC Examinations', 'Defence Research (DRDO)', 'Merchant Navy', 'Pilot Training'] },
      { category: 'Management & Other Fields', options: ['MBA after Engineering / Science', 'Finance & Quantitative Analytics', 'Patent Law & Intellectual Property', 'Teaching (B.Ed / M.Ed)', 'Government Science Departments'] },
    ]}
    faqs={[
      { q: 'Is the XI + XII (2 Years) programme an integrated or combined course?', a: 'No. This is not an integrated or fast-track course. It consists of two separate, complete academic years — XI Science (1 year) followed by XII Science (1 year) — both taught thoroughly and independently.' },
      { q: 'Who should join this 2-year programme?', a: 'Any student who has passed Class X (SSC or equivalent) and wishes to begin their science coaching from Class XI itself. This is ideal for students who want maximum preparation time and a strong foundation before XII.' },
      { q: 'What is the advantage of joining from Class XI instead of XII?', a: 'JEE, NEET and MHT-CET syllabus covers both XI and XII. By joining from XI, students get double the preparation time for competitive exams, develop stronger concepts and experience far less pressure in their XII year.' },
      { q: 'Do I need to separately enrol for XII after completing XI coaching?', a: 'No. Students who join the 2-year programme continue directly from XI to XII coaching under the same faculty team. Transition is seamless.' },
      { q: 'What subjects are covered in this programme?', a: 'Physics, Chemistry, Mathematics and Biology — covering the complete XI and XII Science syllabus as per Maharashtra State Board. Students take PCM, PCB or both streams depending on their goals.' },
      { q: 'Can I prepare for both boards and competitive exams in 2 years?', a: 'Yes. The programme is specifically designed for dual preparation — board exams and JEE/NEET/MHT-CET — across both academic years.' },
      { q: 'Are doubt sessions and tests available throughout both years?', a: 'Yes. Weekly chapter-wise tests, monthly full-syllabus tests, personal doubt sessions and parent-teacher interactions continue across both XI and XII academic years.' },
      { q: 'Is there less pressure in this 2-year programme compared to XII-only coaching?', a: 'Absolutely. Distributing the syllabus across two years significantly reduces the workload in XII, allowing students to revise, practice and perform better without last-minute stress.' },
    ]}
  />
);

export default XiXiiScience;
