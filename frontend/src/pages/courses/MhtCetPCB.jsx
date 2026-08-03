import React from 'react';
import CoursePage from '../../components/courses/CoursePage';
import { Atom, FlaskConical, Microscope, Heart, Target, BarChart2, ClipboardList, TrendingUp, Brain, Trophy, Clock, BookOpen } from 'lucide-react';

const whyChooseUs = [
  { icon: Heart,        title: 'Medical & Pharmacy Focus',     desc: 'Entire programme geared towards Maharashtra pharmacy and health science college admissions via MHT-CET PCB.' },
  { icon: Microscope,   title: 'Biology Practice',             desc: 'Extensive MCQ practice in Botany and Zoology covering XI and XII syllabus in depth for CET accuracy.' },
  { icon: ClipboardList,title: 'CET Mock Exams',               desc: 'Full-length MHT-CET PCB pattern mock tests conducted regularly with detailed performance review.' },
  { icon: Clock,        title: 'Speed & Accuracy Training',    desc: 'Timed practice drills to improve accuracy and speed for Biology and Chemistry MCQs under exam conditions.' },
  { icon: Brain,        title: 'NCERT + State Board Coverage', desc: 'Both NCERT and Maharashtra State Board Biology content covered — essential for MHT-CET PCB scoring.' },
  { icon: Target,       title: 'XI Syllabus Integration',      desc: 'CET includes 20% from Class XI — our programme ensures XI Biology and Chemistry are not neglected.' },
  { icon: BarChart2,    title: 'Score Improvement Focus',      desc: 'Regular performance analysis with targeted revision of Biology chapters most frequently appearing in CET.' },
  { icon: Trophy,       title: 'Proven CET PCB Results',       desc: 'Our students achieve high percentile scores in MHT-CET PCB and secure admissions to top pharmacy and health science colleges.' },
];

const MhtCetPCB = () => (
  <CoursePage
    seo={{ title: 'MHT-CET PCB Coaching | Prayan Tutorials Dombivli' }}
    hero={{
      badge: 'MHT-CET PCB Preparation',
      title: 'MHT-CET PCB',
      tagline: 'Secure Your Future in Medicine, Pharmacy & Life Sciences through MHT-CET PCB.',
      gradient: 'bg-gradient-to-br from-green-50 via-white to-emerald-100 dark:from-gray-900 dark:via-gray-950 dark:to-green-900/20',
    }}
    overview={{
      title: 'MHT-CET PCB — Maharashtra Medical & Pharmacy Entrance',
      description: 'MHT-CET PCB is the key qualifying exam for admission to Pharmacy (B.Pharm), Agriculture, Fisheries, and other biology-based professional courses in Maharashtra. It is also relevant for students targeting allied health sciences, biotechnology and life science programmes. At Prayan Tutorials, our MHT-CET PCB programme provides focused MCQ preparation in Physics, Chemistry and Biology, covering both XI (20%) and XII (80%) syllabi with emphasis on Biology — the highest-weightage subject in PCB.',
      duration: '1 Academic Year (June – Exam)',
      highlights: [
        'Complete MHT-CET PCB syllabus — Physics, Chemistry, Biology',
        'Heavy emphasis on Biology (Botany + Zoology) — highest weightage in PCB',
        'MCQ-pattern practice — MHT-CET is fully objective type',
        'XI syllabus (20%) and XII syllabus (80%) both covered',
        'Full-length MHT-CET PCB mock tests with percentile tracking',
        'NCERT and Maharashtra State Board Biology content both covered',
        'Integrated preparation for board exams and CET',
        'Career counselling for pharmacy, biotechnology and health science fields',
      ],
    }}
    subjects={[
      { icon: Atom, name: 'Physics', desc: 'Selected Physics chapters from XI and XII at MCQ level for MHT-CET PCB scoring.',
        topics: ['Circular Motion', 'Gravitation', 'Electrostatics', 'Current Electricity', 'Magnetic Effects', 'Semiconductor Devices'] },
      { icon: FlaskConical, name: 'Chemistry', desc: 'Physical and Organic Chemistry focused on MCQ accuracy for MHT-CET PCB.',
        topics: ['Solutions', 'Electrochemistry', 'Chemical Kinetics', 'Biomolecules', 'Organic Reactions', 'p-Block & d-Block Elements'] },
      { icon: Microscope, name: 'Biology (Botany + Zoology)', desc: 'Complete XI and XII Biology — the highest-scoring subject in MHT-CET PCB.',
        topics: ['Cell Biology & Biomolecules', 'Plant Physiology', 'Human Physiology', 'Genetics & Evolution', 'Biotechnology', 'Ecology & Environment'] },
    ]}
    whyChooseUs={whyChooseUs}
    careers={[
      { category: 'Pharmacy & Health Sciences', options: ['B.Pharm (Bachelor of Pharmacy)', 'D.Pharm (Diploma in Pharmacy)', 'PharmD (Doctor of Pharmacy)', 'Hospital Pharmacist', 'Clinical Research Associate', 'Drug Regulatory Affairs'] },
      { category: 'Medical Paths (via NEET)', options: ['MBBS (via NEET)', 'BDS — Dentistry', 'BAMS — Ayurveda', 'BHMS — Homeopathy', 'BUMS — Unani', 'Veterinary Science (BVSc)'] },
      { category: 'Life Sciences & Biotechnology', options: ['Biotechnology (B.Tech / B.Sc)', 'Microbiology', 'Biochemistry', 'Genetics & Molecular Biology', 'Bioinformatics', 'Biomedical Science'] },
      { category: 'Agriculture & Related Fields', options: ['B.Sc Agriculture', 'Horticulture', 'Food Technology & Nutrition', 'Dairy Science', 'Fisheries Science'] },
      { category: 'Nursing & Allied Health', options: ['B.Sc Nursing', 'BPT (Physiotherapy)', 'BMLT (Medical Lab Technology)', 'BASLP (Audiology & Speech)', 'Optometry', 'Occupational Therapy'] },
      { category: 'Research & Government', options: ['CSIR-NET Life Sciences', 'ICMR Research', 'BARC Bioscience', 'Government Public Health Departments', 'Teaching (B.Ed + M.Sc Biology)'] },
    ]}
    faqs={[
      { q: 'Who can appear for MHT-CET PCB?', a: 'Students who have appeared or passed Class XII with Physics, Chemistry and Biology are eligible for MHT-CET PCB.' },
      { q: 'Is MHT-CET PCB the same as NEET?', a: 'No. MHT-CET PCB is conducted by the Maharashtra State authority and is mainly for pharmacy, agriculture and allied health courses in Maharashtra. NEET is a separate national exam required for MBBS, BDS and medical degrees.' },
      { q: 'Should I prepare for both MHT-CET PCB and NEET?', a: 'Students targeting MBBS or BDS must appear for NEET. MHT-CET PCB is required for pharmacy and other biology-based courses in Maharashtra. Both have overlapping syllabus so simultaneous preparation is recommended.' },
      { q: 'What is the weightage of Biology in MHT-CET PCB?', a: 'Biology carries the highest weightage in MHT-CET PCB with 100 marks (50 Botany + 50 Zoology), compared to 50 marks each for Physics and Chemistry.' },
      { q: 'Does the programme cover the Class XI Biology syllabus?', a: 'Yes. MHT-CET PCB includes approximately 20% questions from Class XI. Our programme covers XI Biology (Botany and Zoology) in detail alongside the XII syllabus.' },
      { q: 'How many mock tests are conducted?', a: 'We conduct regular chapter-wise tests, monthly full-syllabus tests and full-length MHT-CET PCB mock exams throughout the programme.' },
    ]}
  />
);

export default MhtCetPCB;
