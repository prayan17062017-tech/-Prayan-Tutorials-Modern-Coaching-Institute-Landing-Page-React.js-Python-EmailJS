import React from 'react';
import CoursePage from '../../components/courses/CoursePage';
import { Atom, FlaskConical, Calculator, Zap, Target, BarChart2, ClipboardList, TrendingUp, Brain, Trophy, Clock, BookOpen } from 'lucide-react';

const whyChooseUs = [
  { icon: Zap,          title: 'Engineering Focus',            desc: 'Every session is geared towards Maharashtra engineering college admission through MHT-CET PCM excellence.' },
  { icon: Clock,        title: 'Speed Improvement',            desc: 'Dedicated drills to improve question-answering speed — critical for MHT-CET\'s 180-question time-bound format.' },
  { icon: ClipboardList,title: 'MCQ Practice',                 desc: 'Thousands of MCQs from XI and XII syllabus practised with explanations to build pattern recognition.' },
  { icon: Target,       title: 'CET Pattern Tests',            desc: 'Full-length MHT-CET pattern mock tests conducted regularly to simulate the actual exam environment.' },
  { icon: Brain,        title: 'XI Syllabus Emphasis',         desc: 'MHT-CET includes 20% XI syllabus — our programme covers both XI and XII equally unlike others.' },
  { icon: BarChart2,    title: 'Score Analysis',               desc: 'Detailed performance reports after every test to identify weak chapters and improve target areas.' },
  { icon: TrendingUp,   title: 'Consistent Improvement',       desc: 'Progressive difficulty in tests ensures students build stamina and confidence for the actual exam.' },
  { icon: Trophy,       title: 'CET Result Track Record',      desc: 'Our students consistently secure high percentile scores in MHT-CET and gain admission to top Maharashtra colleges.' },
];

const MhtCetPCM = () => (
  <CoursePage
    seo={{ title: 'MHT-CET PCM Coaching | Prayan Tutorials Dombivli' }}
    hero={{
      badge: 'MHT-CET PCM Preparation',
      title: 'MHT-CET PCM',
      tagline: 'Score High in Maharashtra\'s Engineering Entrance with Targeted PCM Preparation.',
      gradient: 'bg-gradient-to-br from-yellow-50 via-white to-amber-100 dark:from-gray-900 dark:via-gray-950 dark:to-yellow-900/20',
    }}
    overview={{
      title: 'MHT-CET PCM — Maharashtra Engineering Entrance Excellence',
      description: 'MHT-CET (Maharashtra Common Entrance Test) PCM is the gateway to B.Tech / B.E. engineering degree programmes in Maharashtra\'s top government and private engineering colleges, including COEPs, VJTIs and other prestigious institutions. At Prayan Tutorials, our MHT-CET PCM programme provides targeted MCQ-based preparation covering Physics, Chemistry and Mathematics from both Class XI (20%) and Class XII (80%) syllabi — aligned with the latest MHT-CET exam pattern.',
      duration: '1 Academic Year (June – Exam)',
      highlights: [
        'Complete MHT-CET PCM syllabus — Physics, Chemistry, Mathematics',
        'MCQ-pattern practice — MHT-CET is 100% objective type',
        'XI syllabus (20%) and XII syllabus (80%) both covered comprehensively',
        'Speed and accuracy training for 180-question, 3-hour exam format',
        'Full-length MHT-CET mock tests with percentile scoring',
        'Chapter-wise MCQ banks from previous year papers',
        'Regular performance analysis and weak-area targeting',
        'Board exam preparation integrated within the programme',
      ],
    }}
    subjects={[
      { icon: Atom, name: 'Physics', desc: 'Electrodynamics, Optics, Modern Physics and Mechanics at MHT-CET MCQ depth.',
        topics: ['Circular & Rotational Motion', 'Electrostatics', 'Current Electricity', 'Magnetic Effects', 'Optics', 'Semiconductors'] },
      { icon: FlaskConical, name: 'Chemistry', desc: 'Physical, Organic and Inorganic Chemistry focused on MCQ accuracy and speed.',
        topics: ['Solutions & Colligative Properties', 'Electrochemistry', 'Chemical Kinetics', 'p-Block Elements', 'Organic Reactions', 'Biomolecules'] },
      { icon: Calculator, name: 'Mathematics', desc: 'Integration, Differential Equations, Vectors, Statistics and Probability for CET.',
        topics: ['Mathematical Logic', 'Matrices', 'Differentiation & Integration', 'Differential Equations', 'Vectors & 3D', 'Probability Distributions'] },
    ]}
    whyChooseUs={whyChooseUs}
    careers={[
      { category: 'Top Maharashtra Engineering Colleges', options: ['COEP Technological University Pune', 'VJTI Mumbai', 'ICT Mumbai', 'Government Engineering Colleges', 'Top Private Colleges (MIT, SIT, etc.)'] },
      { category: 'Engineering Branches (PCM)', options: ['Computer Science & Engineering', 'Electronics & Communication', 'Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering', 'Information Technology'] },
      { category: 'Emerging Specialisations', options: ['Artificial Intelligence', 'Data Science', 'Robotics & Automation', 'Internet of Things (IoT)', 'Cybersecurity', 'Aerospace Engineering'] },
      { category: 'After Engineering', options: ['GATE — M.Tech / PSU Jobs', 'MBA from IIMs (CAT)', 'Civil Services & Government Jobs', 'Software Development & IT Careers', 'Research — ISRO, BARC, DRDO', 'Entrepreneurship & Startups'] },
      { category: 'Government Sector Engineering', options: ['ISRO Engineer', 'Railways Technical Posts', 'DRDO Scientist', 'ONGC / BHEL / NTPC Engineer', 'State PWD / Water Resources', 'Defence Technical Officer'] },
    ]}
    faqs={[
      { q: 'Who can appear for MHT-CET PCM?', a: 'Students who have appeared or passed Class XII with Physics, Chemistry and Mathematics are eligible for MHT-CET PCM.' },
      { q: 'What percentage of the MHT-CET syllabus is from Class XI?', a: 'Approximately 20% of MHT-CET questions come from the Class XI syllabus, while 80% is from Class XII. Our programme covers both comprehensively.' },
      { q: 'How is MHT-CET different from JEE Main?', a: 'MHT-CET is conducted by the Maharashtra State Common Entrance Test Cell and is specific to Maharashtra college admissions. JEE Main is a national exam for NITs, IIITs and central institutes. Both cover PCM but JEE is significantly harder.' },
      { q: 'Does MHT-CET PCM coaching help with board exams too?', a: 'Yes. The XII Science syllabus largely overlaps with MHT-CET. Our integrated approach ensures board and CET preparation happen simultaneously.' },
      { q: 'How many mock tests are conducted?', a: 'We conduct chapter-wise tests, monthly full-syllabus tests and full-length MHT-CET pattern mock exams regularly throughout the programme.' },
      { q: 'Is speed important for MHT-CET?', a: 'Absolutely. MHT-CET has 180 questions in 3 hours (Physics, Chemistry — 50 each; Maths — 50), requiring an average of 1 minute per question. Speed training is a key part of our programme.' },
    ]}
  />
);

export default MhtCetPCM;
