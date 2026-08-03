import React from 'react';
import CoursePage from '../../components/courses/CoursePage';
import { Atom, FlaskConical, Microscope, Heart, Brain, Target, BarChart2, ClipboardList, BookOpen, Trophy, TrendingUp, CheckCircle } from 'lucide-react';

const whyChooseUs = [
  { icon: BookOpen,     title: 'NCERT-Based Preparation',      desc: 'NEET is 100% NCERT-driven. Our teaching is deeply rooted in NCERT textbooks — the only authentic source for NEET.' },
  { icon: Microscope,   title: 'Biology Mastery',              desc: 'Biology accounts for 360 out of 720 marks in NEET. Our Biology teaching goes line-by-line through NCERT for maximum scoring.' },
  { icon: Target,       title: 'Medical Entrance Strategy',    desc: 'Focused exam strategy — how to attempt NEET, manage time, avoid negative marking and maximise the Biology section.' },
  { icon: ClipboardList,title: 'Mock Tests & Previous Years',  desc: 'Full-length NEET mock tests and chapter-wise previous year question practice to identify patterns and recurring concepts.' },
  { icon: Brain,        title: 'Previous Year Analysis',       desc: 'Detailed analysis of NEET previous year papers to identify high-frequency topics and direct students\' revision focus.' },
  { icon: BarChart2,    title: 'Performance Tracking',         desc: 'After every mock test, detailed subject-wise and topic-wise analysis is provided to each student for targeted improvement.' },
  { icon: TrendingUp,   title: 'Continuous Revision',          desc: 'Systematic revision of all NCERT chapters across Physics, Chemistry and Biology throughout the programme.' },
  { icon: Trophy,       title: 'NEET Qualified Students',      desc: 'Our students have consistently qualified NEET with competitive scores, securing admissions to MBBS and allied programmes.' },
];

const Neet = () => (
  <CoursePage
    seo={{ title: 'NEET Coaching | Prayan Tutorials Dombivli' }}
    hero={{
      badge: 'NEET UG Preparation',
      title: 'NEET',
      tagline: 'Master NCERT. Crack NEET. Begin Your Medical Career.',
      gradient: 'bg-gradient-to-br from-red-50 via-white to-rose-100 dark:from-gray-900 dark:via-gray-950 dark:to-red-900/20',
    }}
    overview={{
      title: 'NEET — India\'s Gateway to Medical Education',
      description: 'NEET (National Eligibility cum Entrance Test) UG is the sole national entrance examination for admission to MBBS, BDS, BAMS, BHMS, BUMS and other medical degree programmes across India. Conducted by the National Testing Agency (NTA), NEET tests students on Physics, Chemistry and Biology (Botany + Zoology) with 720 total marks. At Prayan Tutorials, our NEET programme is built around NCERT mastery, Biology depth, systematic revision and full-length test series to ensure every student is exam-ready.',
      duration: '1 to 2 Years (Depending on when student joins)',
      highlights: [
        'Complete NEET syllabus — Physics, Chemistry, Biology (Botany + Zoology)',
        'NCERT line-by-line coverage — the only authentic NEET preparation approach',
        'Biology (360 marks) given maximum focus — Botany and Zoology both',
        'Previous year NEET question analysis and pattern-based practice',
        'Full-length NEET mock tests with 720-mark scoring and negative marking practice',
        'Speed and accuracy training to manage 180 questions in 3 hours 20 minutes',
        'Regular revision and short notes for quick recall before exam',
        'Career counselling for medical college options and MBBS admission strategy',
      ],
    }}
    subjects={[
      { icon: Atom, name: 'Physics', desc: 'Selected Physics chapters from XI and XII at NEET MCQ depth — conceptual clarity and formula application.',
        topics: ['Mechanics & Motion', 'Work, Energy & Power', 'Thermodynamics', 'Electrostatics', 'Current Electricity', 'Modern Physics & Radiation'] },
      { icon: FlaskConical, name: 'Chemistry', desc: 'Physical, Organic and Inorganic Chemistry covering NCERT syllabus with reaction mechanisms and equation mastery.',
        topics: ['Atomic Structure', 'Chemical Bonding', 'Organic Chemistry (NCERT)', 'Biomolecules & Polymers', 'Coordination Compounds', 'p-Block Elements'] },
      { icon: Microscope, name: 'Biology — Botany & Zoology', desc: 'The highest-scoring section. Complete NCERT Biology — word-by-word, diagram-by-diagram for maximum NEET marks.',
        topics: ['Cell Structure & Function', 'Plant Physiology', 'Human Physiology', 'Reproduction (Plants & Animals)', 'Genetics & Evolution', 'Biotechnology & Ecology'] },
    ]}
    whyChooseUs={whyChooseUs}
    careers={[
      { category: 'Medical Degrees (via NEET)', options: ['MBBS — Bachelor of Medicine & Surgery', 'BDS — Bachelor of Dental Surgery', 'BAMS — Ayurvedic Medicine', 'BHMS — Homeopathic Medicine', 'BUMS — Unani Medicine', 'BVSc — Veterinary Science'] },
      { category: 'After MBBS', options: ['MD / MS — Specialisation', 'AIIMS PG / NEET PG', 'Super Specialisation (DM / MCh)', 'Medical Research', 'Government Hospital Practitioner', 'Own Medical Practice / Clinic'] },
      { category: 'Pharmacy & Allied Health', options: ['B.Pharm / PharmD', 'BPT — Physiotherapy', 'B.Sc Nursing / GNM', 'BMLT — Medical Lab Technology', 'BASLP — Audiology & Speech', 'Optometry & Occupational Therapy'] },
      { category: 'Biotechnology & Research', options: ['Biotechnology (B.Tech / B.Sc)', 'Microbiology & Genetics', 'Biomedical Engineering', 'Bioinformatics', 'ICMR / CSIR Research', 'BARC Bioscience Division'] },
      { category: 'Nutrition & Public Health', options: ['B.Sc Nutrition & Dietetics', 'Public Health Practitioner', 'Food Scientist & Technologist', 'Clinical Research Associate', 'Drug Regulatory Affairs Specialist'] },
      { category: 'Government Medical Services', options: ['Civil Surgeon — Government Hospitals', 'Medical Officer — State / Central Services', 'UPSC — Combined Medical Services', 'Indian Army / Navy / Air Force Medical Corps', 'Railway Medical Officer'] },
    ]}
    faqs={[
      { q: 'Who can appear for NEET?', a: 'Students who have passed or are appearing in Class XII with Physics, Chemistry and Biology are eligible for NEET. The minimum age is 17 years. There is no upper age limit (as per recent NTA guidelines).' },
      { q: 'Is NCERT sufficient to crack NEET?', a: 'For Biology, NCERT is the single most important resource and deep NCERT mastery alone can score 300+ in Biology. For Physics and Chemistry, NCERT forms the base but additional MCQ practice and problem solving is required.' },
      { q: 'How many questions are in NEET and what is the marking scheme?', a: 'NEET has 180 questions — 45 from Physics, 45 from Chemistry, and 90 from Biology (45 Botany + 45 Zoology). Each correct answer gives +4 marks; each wrong answer deducts -1 mark. Total: 720 marks.' },
      { q: 'Can I prepare for NEET and board exams simultaneously?', a: 'Yes. NEET syllabus is closely aligned with Class XII Biology, Chemistry and Physics. Our programme ensures both board exam and NEET preparation proceed simultaneously without extra burden.' },
      { q: 'How many mock tests are conducted?', a: 'We conduct weekly chapter-wise tests, monthly full-syllabus mock tests and multiple full-length NEET pattern mock exams simulating the actual exam conditions.' },
      { q: 'How important is Biology for NEET?', a: 'Biology is the most critical subject in NEET — it carries 360 out of 720 marks (50% of the total). Students who master Biology through thorough NCERT study have a massive advantage.' },
      { q: 'What if I don\'t qualify NEET in the first attempt?', a: 'NEET can be attempted multiple times. Students who don\'t qualify on the first attempt can retake it the following year. We provide guidance for drop-year students as well.' },
    ]}
  />
);

export default Neet;
