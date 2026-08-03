import React from 'react';
import CoursePage from '../../components/courses/CoursePage';
import { Atom, FlaskConical, Calculator, Microscope, Trophy, BookOpen, ClipboardList, Clock, Target, Pencil, BarChart2, Compass } from 'lucide-react';

const whyChooseUs = [
  { icon: Trophy,       title: 'Board Exam Excellence',       desc: '100% HSC result track record. We know exactly what Maharashtra State Board examiners expect.' },
  { icon: Pencil,       title: 'Answer Writing Practice',     desc: 'Dedicated sessions on structuring answers, using diagrams and scoring full marks in board exams.' },
  { icon: Clock,        title: 'Time Management Training',    desc: 'Timed mock tests and exam strategy sessions to help students complete papers confidently within time.' },
  { icon: BookOpen,     title: 'Intensive Revision Sessions', desc: 'Structured crash courses and topic-wise revision before board exams to reinforce every chapter.' },
  { icon: ClipboardList,title: 'Expected Questions Coverage', desc: 'Faculty prepare curated expected question banks based on board patterns and previous year analysis.' },
  { icon: Target,       title: 'Dual Exam Preparation',       desc: 'Simultaneous preparation for XII boards and JEE/MHT-CET/NEET without compromising either.' },
  { icon: BarChart2,    title: 'Performance Tracking',        desc: 'Detailed test analysis and personalised feedback to help students improve consistently every month.' },
  { icon: Compass,      title: 'Career Counselling',          desc: 'Expert guidance on stream selection, college choices, entrance exams and career planning post XII.' },
];

const XiiScience = () => (
  <CoursePage
    seo={{ title: 'XII Science Coaching | Prayan Tutorials Dombivli' }}
    hero={{
      badge: 'Class XII Science',
      title: 'XII Science',
      tagline: 'Ace Your Boards. Crack the Entrance. Define Your Future.',
    }}
    overview={{
      title: 'XII Science — Board Mastery & Competitive Excellence',
      description: 'Class XII Science is the most decisive year of a student\'s academic life. At Prayan Tutorials, we deliver a dual-focused preparation strategy — ensuring 100% board exam readiness while simultaneously preparing students for competitive entrance exams including JEE Main, MHT-CET and NEET. With expert faculty, structured test series and personalised guidance, our students consistently achieve outstanding results.',
      duration: '1 Academic Year (June – March)',
      highlights: [
        'Complete XII Science board syllabus (Maharashtra State Board)',
        'Integrated JEE Main, MHT-CET and NEET preparation',
        'Board exam question pattern practice and answer writing techniques',
        'Practical exam guidance and lab preparation',
        'Chapter-wise and full-length mock test series',
        'Revision crash courses before board exams',
        'Career counselling and stream selection guidance',
        'Proven 100% HSC result track record',
      ],
    }}
    subjects={[
      { icon: Atom, name: 'Physics', desc: 'Current Electricity, Magnetism, Semiconductors, Communication Systems and Modern Physics.',
        topics: ['Electrostatics & Capacitors', 'Current Electricity', 'Magnetic Effects', 'Electromagnetic Induction', 'Optics', 'Semiconductors'] },
      { icon: FlaskConical, name: 'Chemistry', desc: 'Solid State, Electrochemistry, Chemical Kinetics, Surface Chemistry and Organic Reactions.',
        topics: ['Solid State', 'Solutions', 'Electrochemistry', 'Chemical Kinetics', 'Coordination Compounds', 'Organic Chemistry'] },
      { icon: Calculator, name: 'Mathematics', desc: 'Matrices, Determinants, Calculus, Probability, Vectors and 3D Geometry.',
        topics: ['Relations & Functions', 'Algebra', 'Calculus', 'Vectors & 3D Geometry', 'Linear Programming', 'Probability'] },
      { icon: Microscope, name: 'Biology', desc: 'Reproduction, Genetics, Evolution, Human Health, Biotechnology and Ecology.',
        topics: ['Reproduction', 'Genetics & Evolution', 'Human Health & Disease', 'Biotechnology', 'Organisms & Populations', 'Ecosystem'] },
    ]}
    whyChooseUs={whyChooseUs}
    careers={[
      { category: 'Engineering', options: ['B.Tech / B.E. (All branches)', 'Computer Science & AI', 'Electronics & Communication', 'Mechanical & Civil Engineering', 'Chemical Engineering', 'Architecture (NATA)'] },
      { category: 'Medical & Allied Health', options: ['MBBS', 'BDS (Dentistry)', 'BAMS (Ayurveda)', 'BHMS (Homeopathy)', 'B.Pharm / M.Pharm', 'BPT (Physiotherapy)', 'Nursing', 'Veterinary Science'] },
      { category: 'Technology & Data', options: ['Data Science & Machine Learning', 'Artificial Intelligence', 'Cybersecurity', 'Information Technology', 'Computer Applications (BCA/MCA)'] },
      { category: 'Pure Science & Research', options: ['B.Sc / M.Sc Physics, Chemistry, Maths', 'Biotechnology & Biochemistry', 'Environmental Science', 'TIFR, BARC, ISRO Research'] },
      { category: 'Government & Defence', options: ['NDA (National Defence Academy)', 'UPSC Civil Services', 'State PSC Examinations', 'DRDO, ISRO, BARC Scientists', 'Merchant Navy', 'Pilot (Commercial Aviation)'] },
      { category: 'Other Professional Courses', options: ['MBA after B.Tech', 'Law (LLB) with science background', 'Teaching (B.Ed / M.Ed)', 'Finance & Analytics', 'Patent Law & Intellectual Property'] },
    ]}
    faqs={[
      { q: 'Does XII Science coaching also prepare for board exams?', a: 'Yes. Our primary focus includes complete board syllabus coverage, board-pattern practice papers and answer writing techniques specific to the Maharashtra State Board.' },
      { q: 'Can I prepare for both JEE and NEET simultaneously with board preparation?', a: 'Yes. Our integrated programme covers all three simultaneously. However, we recommend choosing a primary focus — JEE or NEET — based on your career goals.' },
      { q: 'What is the success rate of Prayan Tutorials students in HSC?', a: 'We have achieved a 100% HSC result consistently. Our students have scored excellent percentages in board examinations year after year.' },
      { q: 'Do you provide practical exam preparation?', a: 'Yes. We guide students specifically for practical exams, including lab techniques, viva preparation and journal writing.' },
      { q: 'Are revision classes provided before board exams?', a: 'Yes. We conduct intensive revision crash courses covering all subjects before the board examination schedule begins.' },
      { q: 'How do you help with time management during exams?', a: 'We conduct timed mock tests that simulate board exam conditions and train students to allocate time efficiently to each section and question type.' },
      { q: 'What career options are available after XII Science?', a: 'XII Science opens doors to engineering, medicine, pharmacy, biotechnology, data science, research, defence, architecture, aviation, government services and many more professional fields.' },
    ]}
  />
);

export default XiiScience;
