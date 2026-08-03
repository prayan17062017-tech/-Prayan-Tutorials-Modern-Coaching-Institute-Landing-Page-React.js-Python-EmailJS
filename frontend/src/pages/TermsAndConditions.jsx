import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FileText, BookOpen, GraduationCap, BarChart2, Copyright, Monitor, ExternalLink, MapPin, Phone, Mail,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const sections = [
  {
    icon: FileText,
    title: '1. Acceptance of Terms',
    content: (
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
        By accessing or using the Prayan Tutorials website, you agree to be bound by these Terms &amp; Conditions. If you do not agree with any part of these terms, please discontinue use of the website immediately.
      </p>
    ),
  },
  {
    icon: BookOpen,
    title: '2. Educational Information',
    content: (
      <>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          All course information published on this website is provided for general guidance purposes only. Prayan Tutorials reserves the right to update or modify the following without prior notice:
        </p>
        <ul className="space-y-2">
          {['Courses offered', 'Class timings and schedules', 'Faculty members', 'Fee structure', 'Admission process and eligibility'].map((item) => (
            <li key={item} className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
              <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    icon: GraduationCap,
    title: '3. Admissions',
    content: (
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
        Admission to any course at Prayan Tutorials is subject to the institute's internal policies, seat availability, and eligibility criteria. Submission of an enquiry form does not guarantee admission. The institute reserves the right to accept or decline any application at its discretion.
      </p>
    ),
  },
  {
    icon: BarChart2,
    title: '4. Results Disclaimer',
    content: (
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
        The student results and achievements displayed on this website are genuine and represent the hard work of our students. However, Prayan Tutorials does not guarantee similar academic performance for future students. Results may vary based on individual effort, aptitude, and other factors.
      </p>
    ),
  },
  {
    icon: Copyright,
    title: '5. Intellectual Property',
    content: (
      <>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          All content on this website is the exclusive property of Prayan Tutorials, including but not limited to:
        </p>
        <ul className="space-y-2 mb-4">
          {['Logo and branding', 'Images and graphics', 'Course material and descriptions', 'Text and written content'].map((item) => (
            <li key={item} className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
              <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          Copying, reproducing, distributing, or using any content from this website without prior written permission from Prayan Tutorials is strictly prohibited.
        </p>
      </>
    ),
  },
  {
    icon: Monitor,
    title: '6. Website Usage',
    content: (
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
        Users must not misuse this website in any way. This includes, but is not limited to, attempting unauthorised access, introducing malicious code, or using the website for any unlawful purpose. Prayan Tutorials reserves the right to restrict access to any user who violates these terms.
      </p>
    ),
  },
  {
    icon: ExternalLink,
    title: '7. External Links',
    content: (
      <>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          This website may contain links to third-party websites such as:
        </p>
        <ul className="space-y-2 mb-4">
          {['Instagram', 'Google Maps', 'WhatsApp'].map((item) => (
            <li key={item} className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
              <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          Prayan Tutorials is not responsible for the content, accuracy, or privacy practices of any third-party websites. Visiting external links is at your own discretion and risk.
        </p>
      </>
    ),
  },
];

const TermsAndConditions = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="overflow-x-hidden min-h-screen bg-gradient-to-b from-blue-50/30 via-white to-blue-50/20 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Navbar />
      <main className="pt-28 pb-20">
        {/* Hero */}
        <section className="px-6 md:px-12 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
              Terms &amp; <span className="text-primary">Conditions</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Please read these terms carefully before using the Prayan Tutorials website.
            </p>
          </motion.div>
        </section>

        {/* Divider */}
        <div className="max-w-4xl mx-auto px-6 mb-16">
          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>

        {/* Sections */}
        <section className="px-6 md:px-12">
          <div className="max-w-4xl mx-auto space-y-6">
            {sections.map((sec, i) => (
              <motion.div
                key={sec.title}
                data-aos="fade-up"
                data-aos-delay={i * 60}
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                    <sec.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{sec.title}</h2>
                </div>
                {sec.content}
              </motion.div>
            ))}

            {/* Contact Card */}
            <motion.div
              data-aos="fade-up"
              data-aos-delay={sections.length * 60}
              className="bg-primary rounded-3xl shadow-xl p-8 text-white"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold">8. Contact Information</h2>
              </div>
              <p className="text-white/80 leading-relaxed mb-6">
                For any queries regarding these Terms &amp; Conditions, please contact us:
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-0.5 shrink-0 text-white/70" />
                  <p className="text-white/90 text-sm leading-relaxed">
                    Ghanshyam Complex, B-101, Above Vodafone Gallery, Near DNS Bank,<br />
                    Vishnu Nagar, Dombivli West, Kalyan, Maharashtra – 421202
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 shrink-0 text-white/70" />
                  <span className="text-white/90 text-sm">08291237037</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 shrink-0 text-white/70" />
                  <span className="text-white/90 text-sm">prayan17062017@gmail.com</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;
