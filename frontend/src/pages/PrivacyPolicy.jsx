import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Shield, Database, Lock, Globe, Cookie, Users, MapPin, Phone, Mail,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LAST_UPDATED = 'June 2025';

const sections = [
  {
    icon: Database,
    title: '1. Information We Collect',
    content: (
      <>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          When you submit an enquiry through our website, we may collect the following personal information:
        </p>
        <ul className="space-y-2">
          {['Student Name', 'Parent Name', 'Mobile Number', 'Email Address', 'Class & Stream', 'Course of Interest', 'School / College', 'Additional Message'].map((item) => (
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
    icon: Shield,
    title: '2. How We Use Your Information',
    content: (
      <>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          The information you provide is used solely for educational and communication purposes:
        </p>
        <ul className="space-y-2">
          {['Processing admission enquiries', 'Contacting students and parents', 'Providing course guidance and counselling', 'Sharing academic updates and announcements'].map((item) => (
            <li key={item} className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
              <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    icon: Lock,
    title: '3. Data Protection',
    content: (
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
        We take the security of your personal information seriously. All data collected through our website is handled securely and is never sold, rented, or shared with third parties for commercial purposes. Access to your information is restricted to authorised personnel only.
      </p>
    ),
  },
  {
    icon: Globe,
    title: '4. Third-Party Services',
    content: (
      <>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          Our website may use the following third-party services to enhance functionality:
        </p>
        <ul className="space-y-2 mb-4">
          {['EmailJS – for form submission and email delivery', 'Google Maps – for displaying our institute location', 'Google Reviews – for showcasing student testimonials', 'Hosting Platform – for website deployment and availability'].map((item) => (
            <li key={item} className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
              <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          Each of these services operates under its own privacy policy. We encourage you to review their respective policies for more information.
        </p>
      </>
    ),
  },
  {
    icon: Cookie,
    title: '5. Cookies',
    content: (
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
        Our website may use cookies to improve your browsing experience, remember your preferences, and analyse site traffic. You can choose to disable cookies through your browser settings; however, some features of the website may not function as intended.
      </p>
    ),
  },
  {
    icon: Users,
    title: "6. Children's Privacy",
    content: (
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
        Prayan Tutorials primarily serves school and college students. Where applicable, parental or guardian consent may be required before collecting personal information from students below the age of 18. We encourage parents to be involved in their child's use of our website.
      </p>
    ),
  },
];

const PrivacyPolicy = () => {
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
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
              Privacy <span className="text-primary">Policy</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Your privacy is important to us. This policy explains how Prayan Tutorials collects, uses, and protects your information.
            </p>
            <span className="inline-block text-sm text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-4 py-1.5 rounded-full">
              Last Updated: {LAST_UPDATED}
            </span>
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
                <h2 className="text-xl font-bold">7. Contact Us</h2>
              </div>
              <p className="text-white/80 leading-relaxed mb-6">
                If you have any questions or concerns about this Privacy Policy, please reach out to us:
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

export default PrivacyPolicy;
