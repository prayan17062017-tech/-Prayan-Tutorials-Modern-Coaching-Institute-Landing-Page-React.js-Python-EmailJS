import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Instagram, MessageSquare, MapPin, Phone, Mail, ChevronRight, Facebook, Linkedin } from 'lucide-react';
import LogoImg from '../assets/PRAYAN TUTORIALS logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-white pt-20 pb-10 overflow-hidden relative">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] -ml-32 -mb-32"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img 
                src={LogoImg} 
                alt="PRAYAN TUTORIALS Logo" 
                className="h-12 w-auto object-contain drop-shadow-lg" 
              />
              <span
                className="text-xl tracking-wide uppercase font-extrabold select-none bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif', letterSpacing: '0.08em' }}
              >
                Prayan Tutorials
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering science students with expert guidance, innovative teaching methods, and a commitment to academic excellence for XI, XII Science, JEE & NEET.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Instagram, href: 'https://www.instagram.com/prayantutorials/', color: 'hover:bg-pink-600' },
                { icon: MessageSquare, href: 'https://wa.me/918291237037', color: 'hover:bg-green-600' },
                { icon: Facebook, href: 'https://www.facebook.com/prayan.tutorials/', color: 'hover:bg-blue-600' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/prayan-tutorials-3999483a6/', color: 'hover:bg-blue-700' }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`bg-gray-800 p-3 rounded-xl transition-all duration-300 ${social.color}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-8 border-l-4 border-primary pl-4">Quick Links</h4>
            <ul className="space-y-4">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '#about' },
                { label: 'Why Prayan', href: '/why-prayan' },
                { label: 'Features', href: '#features' },
                { label: 'Our Faculty', href: '#faculty' },
                { label: 'Student Results', href: '#results' },
                { label: 'Admission', href: '#enquiry' },
              ].map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('/') ? (
                    <Link to={link.href} className="text-gray-400 hover:text-primary transition-colors flex items-center group">
                      <ChevronRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-gray-400 hover:text-primary transition-colors flex items-center group">
                      <ChevronRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-lg font-bold mb-8 border-l-4 border-secondary pl-4">Our Courses</h4>
            <ul className="space-y-4">
              {[
                { label: 'XI + XII Science', href: '/courses/xi-xii-science' },
                { label: 'XI Science', href: '/courses/xi-science' },
                { label: 'XII Science', href: '/courses/xii-science' },
                { label: 'JEE (Main)', href: '/courses/jee-main' },
                { label: 'MHT-CET PCM', href: '/courses/mht-cet-pcm' },
                { label: 'MHT-CET PCB', href: '/courses/mht-cet-pcb' },
                { label: 'NEET', href: '/courses/neet' },
              ].map((course) => (
                <li key={course.label}>
                  <Link to={course.href} className="text-gray-400 hover:text-primary transition-colors flex items-center group">
                    <ChevronRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                    {course.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-lg font-bold mb-8 border-l-4 border-accent pl-4">Contact Info</h4>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <div className="bg-gray-800 p-2 rounded-lg mt-1">
                  <MapPin className="text-primary w-4 h-4" />
                </div>
                <span className="text-gray-400 text-sm leading-relaxed">
                  Ghanshyam Complex, B-101, Dombivli West, Kalyan, Maharashtra 421202
                </span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="bg-gray-800 p-2 rounded-lg">
                  <Phone className="text-primary w-4 h-4" />
                </div>
                <span className="text-gray-400 text-sm">082912 37037</span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="bg-gray-800 p-2 rounded-lg">
                  <Mail className="text-primary w-4 h-4" />
                </div>
                <span className="text-gray-400 text-sm">prayan17062017@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-900 flex flex-col md:row justify-between items-center text-center md:text-left gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} <span className="text-white font-bold tracking-widest">PRAYAN TUTORIALS</span>. All Rights Reserved.
          </p>
          <div className="flex space-x-6 text-gray-500 text-xs font-bold uppercase tracking-widest">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
