import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BackgroundPattern from '../../components/BackgroundPattern';
import Chatbot from '../../components/chatbot/Chatbot';
import BackToTop from '../../components/BackToTop';
import Breadcrumb from './Breadcrumb';
import CourseHero from './CourseHero';
import CourseOverview from './CourseOverview';
import SubjectsCovered from './SubjectsCovered';
import TeachingMethodology from './TeachingMethodology';
import WhyChooseUs from './WhyChooseUs';
import CareerOpportunities from './CareerOpportunities';
import FAQ from './FAQ';
import AdmissionCTA from './AdmissionCTA';

const CoursePage = ({ seo, hero, overview, subjects, whyChooseUs, careers, faqs, extraSections }) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
      {/* SEO */}
      <title>{seo?.title || 'Course | Prayan Tutorials'}</title>

      <Navbar />
      <main className="relative z-0">
        <CourseHero {...hero} />

        {/* Breadcrumb inside page */}
        <div className="container mx-auto px-6 md:px-12 lg:px-24 pt-8">
          <Breadcrumb items={[{ label: 'Courses', href: '/courses' }, { label: hero.title }]} />
        </div>

        <CourseOverview {...overview} />
        {extraSections}
        <SubjectsCovered subjects={subjects} />
        <TeachingMethodology />
        <WhyChooseUs features={whyChooseUs} />
        <CareerOpportunities careers={careers} />
        <FAQ faqs={faqs} />
        <AdmissionCTA />
      </main>
      <Footer />
      <BackgroundPattern />
      <Chatbot />
      <BackToTop />
    </>
  );
};

export default CoursePage;
