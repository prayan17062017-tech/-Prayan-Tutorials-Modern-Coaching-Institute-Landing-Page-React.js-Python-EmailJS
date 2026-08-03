import React, { useEffect, useRef } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Faculty from './components/Faculty';
import GoogleReviews from './components/reviews/GoogleReviews';
import Results from './components/Results';
import Maps from './components/Maps';
import EnquiryForm from './components/EnquiryForm';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import BackgroundPattern from './components/BackgroundPattern';
import Chatbot from './components/chatbot/Chatbot';
import ResultsShowcase from './components/results-showcase/ResultsShowcase';
import ResultsGallery from './pages/ResultsGallery';
import WhyPrayan from './pages/WhyPrayan';
import CoursesPage from './pages/courses/Courses';
import XiXiiScience from './pages/courses/XiXiiScience';
import XiScience from './pages/courses/XiScience';
import XiiScience from './pages/courses/XiiScience';
import JeeMain from './pages/courses/JeeMain';
import MhtCetPCM from './pages/courses/MhtCetPCM';
import MhtCetPCB from './pages/courses/MhtCetPCB';
import Neet from './pages/courses/Neet';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';

function App() {
  const aosInitialized = useRef(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!aosInitialized.current) {
      AOS.init({
        duration: 1000,
        once: true,
        easing: 'ease-in-out',
        disable: false,
      });
      aosInitialized.current = true;
    } else {
      AOS.refresh();
    }
  });

  // Intercept anchor clicks on non-home route and redirect to home with hash
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a');
      if (!target) return;
      
      const href = target.getAttribute('href');
      if (href && href.startsWith('#')) {
        if (location.pathname !== '/') {
          e.preventDefault();
          navigate('/' + href);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, [location.pathname, navigate]);

  // Handle scrolling to element when landing on home route with hash
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, [location]);

  return (
    <div className="overflow-x-hidden relative" style={{ isolation: 'isolate' }}>
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <Navbar />
              <main className="relative z-0">
                <ResultsShowcase />
                <Hero />
                <About />
                <Features />
                <Faculty />
                <GoogleReviews />
                <Results />
                <Maps />
                <EnquiryForm />
              </main>
              <Footer />
              <BackgroundPattern />
              <Chatbot />
              <BackToTop />
            </>
          } 
        />
        <Route path="/results-gallery" element={<><ResultsGallery /><BackgroundPattern /><Chatbot /><BackToTop /></>} />
        <Route path="/why-prayan" element={<><WhyPrayan /><BackgroundPattern /><Chatbot /><BackToTop /></>} />
        <Route path="/courses" element={<><CoursesPage /><BackgroundPattern /><Chatbot /><BackToTop /></>} />
        <Route path="/courses/xi-xii-science" element={<><XiXiiScience /><BackgroundPattern /><Chatbot /><BackToTop /></>} />
        <Route path="/courses/xi-science" element={<><XiScience /><BackgroundPattern /><Chatbot /><BackToTop /></>} />
        <Route path="/courses/xii-science" element={<><XiiScience /><BackgroundPattern /><Chatbot /><BackToTop /></>} />
        <Route path="/courses/jee-main" element={<><JeeMain /><BackgroundPattern /><Chatbot /><BackToTop /></>} />
        <Route path="/courses/mht-cet-pcm" element={<><MhtCetPCM /><BackgroundPattern /><Chatbot /><BackToTop /></>} />
        <Route path="/courses/mht-cet-pcb" element={<><MhtCetPCB /><BackgroundPattern /><Chatbot /><BackToTop /></>} />
        <Route path="/courses/neet" element={<><Neet /><BackgroundPattern /><Chatbot /><BackToTop /></>} />
        <Route path="/privacy-policy" element={<><PrivacyPolicy /><BackgroundPattern /><Chatbot /><BackToTop /></>} />
        <Route path="/terms-and-conditions" element={<><TermsAndConditions /><BackgroundPattern /><Chatbot /><BackToTop /></>} />
      </Routes>
    </div>
  );
}

export default App;

