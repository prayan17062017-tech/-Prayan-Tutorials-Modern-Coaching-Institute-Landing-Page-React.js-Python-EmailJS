import React from 'react';
import CoursePage from '../../components/courses/CoursePage';
import { Atom, FlaskConical, Calculator, Brain, Target, BarChart2, ClipboardList, Zap, BookOpen, Trophy, TrendingUp, Users } from 'lucide-react';

const whyChooseUs = [
  { icon: Brain,        title: 'Advanced Problem Solving',     desc: 'Students are trained to tackle high-difficulty JEE-level problems through step-by-step analytical methods.' },
  { icon: ClipboardList,title: 'JEE-Level Test Series',        desc: 'Regular mock tests modelled on the actual JEE Main pattern — 90 questions, NTA scoring, time-bound practice.' },
  { icon: Atom,         title: 'Conceptual Physics',           desc: 'Physics is taught with deep concept clarity — from theory to application to exam-level problem solving.' },
  { icon: Calculator,   title: 'Higher Order Mathematics',     desc: 'Calculus, Coordinate Geometry, Algebra and Vectors covered at the depth required for JEE Main success.' },
  { icon: Zap,          title: 'Competitive Mentoring',        desc: 'Faculty with JEE expertise mentor students on exam strategy, time management and question selection.' },
  { icon: BarChart2,    title: 'Performance Analysis',         desc: 'Detailed mock test analysis with topic-wise score breakdown to identify and eliminate weak areas.' },
  { icon: TrendingUp,   title: 'Speed & Accuracy Training',    desc: 'Special practice sessions focused on improving answer speed while maintaining accuracy under exam pressure.' },
  { icon: Trophy,       title: 'Proven JEE Results',           desc: 'Our students consistently qualify JEE Main with strong percentile scores through disciplined preparation.' },
];

const JeeMain = () => (
  <CoursePage
    seo={{ title: 'JEE Main Coaching | Prayan Tutorials Dombivli' }}
    hero={{
      badge: 'JEE (Main) Preparation',
      title: 'JEE (Main)',
      tagline: 'Crack India\'s Top Engineering Entrance with Expert Guidance & Proven Strategy.',
      gradient: 'bg-gradient-to-br from-orange-50 via-white to-amber-100 dark:from-gray-900 dark:via-gray-950 dark:to-orange-900/20',
    }}
    overview={{
      title: 'JEE Main — Strategic Preparation for Engineering Excellence',
      description: 'JEE (Joint Entrance Examination) Main is India\'s premier engineering entrance exam, the gateway to NITs, IIITs, GFTIs and top private engineering colleges. At Prayan Tutorials, we deliver focused, systematic JEE Main preparation covering Physics, Chemistry and Mathematics at the required depth and problem-solving ability. Our structured programme is designed to help students qualify JEE Main with a strong percentile while maintaining board exam performance.',
      duration: '1 to 2 Years (Depending on when student joins)',
      highlights: [
        'Complete JEE Main syllabus coverage — Physics, Chemistry, Mathematics',
        'NTA exam pattern-based preparation — MCQ, Integer-type, and Numerical questions',
        'High-difficulty problem sets and previous year question bank practice',
        'Concept clarity combined with MCQ and numerical speed practice',
        'Full-length JEE Main mock tests with NTA-style scoring',
        'Topic-wise and full-syllabus test series',
        'Personal doubt sessions with subject experts',
        'Board exam preparation integrated without additional load',
      ],
    }}
    subjects={[
      { icon: Atom, name: 'Physics', desc: 'Mechanics, Electrodynamics, Modern Physics, Optics and Thermodynamics at JEE depth.',
        topics: ['Mechanics & Kinematics', 'Work, Energy & Power', 'Electrostatics & Capacitors', 'Current Electricity', 'Modern Physics', 'Optics & Waves'] },
      { icon: FlaskConical, name: 'Chemistry', desc: 'Physical, Organic and Inorganic Chemistry with reaction mechanisms at JEE Main level.',
        topics: ['Atomic Structure', 'Chemical Bonding', 'Organic Reactions', 'Electrochemistry', 'Coordination Chemistry', 'p-Block Elements'] },
      { icon: Calculator, name: 'Mathematics', desc: 'Calculus, Algebra, Coordinate Geometry, Vectors and 3D Geometry at JEE standard.',
        topics: ['Limits, Continuity & Differentiability', 'Integration', 'Coordinate Geometry', 'Matrices & Determinants', 'Vectors & 3D Geometry', 'Probability'] },
    ]}
    whyChooseUs={whyChooseUs}
    careers={[
      { category: 'Top Engineering Colleges', options: ['NITs (National Institutes of Technology)', 'IIITs (Indian Institutes of IT)', 'Government-Funded Technical Institutes', 'Top Private Engineering Colleges'] },
      { category: 'Engineering Branches', options: ['Computer Science & Engineering', 'Electronics & Communication Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Chemical Engineering', 'Electrical Engineering'] },
      { category: 'Emerging Tech Fields', options: ['Artificial Intelligence & Machine Learning', 'Data Science & Big Data Analytics', 'Robotics & Automation', 'Cybersecurity', 'Space Technology', 'Quantum Computing'] },
      { category: 'After Engineering', options: ['GATE — M.Tech & PSU Jobs', 'CAT — MBA from IIMs', 'Civil Services (UPSC)', 'Research (IISc, TIFR, BARC)', 'Startup & Entrepreneurship', 'Global Universities (MS Abroad)'] },
      { category: 'Government Jobs via Engineering', options: ['ISRO Scientist', 'DRDO Researcher', 'PSU Engineer (ONGC, BHEL, NTPC)', 'Railways Technical Posts', 'Defence Technical Officer'] },
    ]}
    faqs={[
      { q: 'Who can join the JEE Main programme?', a: 'Students appearing in or who have cleared Class XII PCM are eligible. Students joining in Class XI get a 2-year advantage as JEE covers both XI and XII syllabus.' },
      { q: 'Does JEE Main coaching also help with board exams?', a: 'Yes. JEE Main syllabus largely overlaps with XII Science board syllabus, especially in Physics, Chemistry and Mathematics. Our approach ensures both are covered simultaneously.' },
      { q: 'How many mock tests are conducted?', a: 'We conduct regular chapter-wise tests, monthly full-syllabus tests and full-length JEE Main pattern mock tests throughout the programme.' },
      { q: 'What is the difference between JEE Main and JEE Advanced?', a: 'JEE Main is conducted by NTA and serves as the qualifier for NITs, IIITs and as a gateway to JEE Advanced. JEE Advanced is required for IIT admissions and is significantly more difficult.' },
      { q: 'Can I crack JEE Main with just board exam preparation?', a: 'Board preparation alone is insufficient for JEE Main due to the difficulty level, question variety (MCQ, integer-type, numerical) and time pressure. Dedicated JEE coaching provides problem-solving skills boards do not cover.' },
      { q: 'Are doubt sessions available?', a: 'Yes. Regular personal doubt-solving sessions are available where students can clarify concepts with subject experts outside of regular class hours.' },
    ]}
  />
);

export default JeeMain;
