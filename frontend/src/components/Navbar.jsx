import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import LogoImg from '../assets/PRAYAN TUTORIALS logo.png';

const COURSE_LINKS = [
  { name: 'XI + XII Science (2 Years)', href: '/courses/xi-xii-science' },
  { name: 'XI Science', href: '/courses/xi-science' },
  { name: 'XII Science', href: '/courses/xii-science' },
  { name: 'JEE (Main)', href: '/courses/jee-main' },
  { name: 'MHT-CET PCM', href: '/courses/mht-cet-pcm' },
  { name: 'MHT-CET PCB', href: '/courses/mht-cet-pcb' },
  { name: 'NEET', href: '/courses/neet' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const dropdownRef = useRef(null);
  // Read what index.html already applied (matches OS preference)
  const [isDarkMode, setIsDarkMode] = useState(
    () => document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCoursesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
  };

  const navLinks = [
    { name: 'Home',         href: '#' },
    { name: 'About',        href: '#about' },
    { name: 'Features',     href: '#features' },
    { name: 'Faculty',      href: '#faculty' },
    // Courses dropdown is rendered inline after Faculty — see desktop & mobile render
    { name: 'Why Prayan',   href: '/why-prayan' },
    { name: 'Testimonials', href: '#reviews' },
    { name: 'Results',      href: '#results' },
    { name: 'Contact',      href: '#contact' },
  ];

  // Split at index 4 so Courses dropdown sits between Faculty (index 3) and Why Prayan (index 4)
  const beforeCourses = navLinks.slice(0, 4);
  const afterCourses  = navLinks.slice(4);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-xl' 
          : 'py-5 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <motion.a
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-3"
        >
          <img 
            src={LogoImg} 
            alt="Logo" 
            className="h-10 md:h-12 w-auto object-contain" 
          />
          <AnimatePresence mode="wait">
            {!isScrolled && (
              <motion.span 
                key="logo-text"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-xl md:text-2xl tracking-wide uppercase select-none font-extrabold"
                style={{ fontFamily: '"Montserrat", "Poppins", "Sora", "Manrope", sans-serif', letterSpacing: '0.06em' }}
              >
                <span className="text-primary dark:text-blue-400">Prayan</span>{' '}
                <span className="text-black dark:text-white">Tutorials</span>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-8">
          {beforeCourses.map((link, i) => (
            link.href.startsWith('/') ? (
              <Link
                key={link.name}
                to={link.href}
                className="font-medium text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-blue-400 transition-colors"
              >
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {link.name}
                </motion.span>
              </Link>
            ) : (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="font-medium text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-blue-400 transition-colors"
              >
                {link.name}
              </motion.a>
            )
          ))}

          {/* Courses Dropdown — between Faculty and Testimonials */}
          <div className="relative" ref={dropdownRef}
            onMouseEnter={() => setCoursesOpen(true)}
            onMouseLeave={() => setCoursesOpen(false)}>
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: beforeCourses.length * 0.1 }}
              className="font-medium text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-blue-400 transition-colors flex items-center gap-1"
            >
              Courses <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${coursesOpen ? 'rotate-180' : ''}`} />
            </motion.button>
            <AnimatePresence>
              {coursesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50"
                >
                  {COURSE_LINKS.map((c) => (
                    <Link key={c.href} to={c.href}
                      onClick={() => setCoursesOpen(false)}
                      className="block px-5 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-primary/10 hover:text-primary dark:hover:text-blue-400 transition-colors border-b border-gray-50 dark:border-gray-800 last:border-0"
                    >
                      {c.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {afterCourses.map((link, i) => (
            link.href.startsWith('/') ? (
              <Link
                key={link.name}
                to={link.href}
                className="font-medium text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-blue-400 transition-colors"
              >
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (beforeCourses.length + 1 + i) * 0.1 }}
                >
                  {link.name}
                </motion.span>
              </Link>
            ) : (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (beforeCourses.length + 1 + i) * 0.1 }}
                className="font-medium text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-blue-400 transition-colors"
              >
                {link.name}
              </motion.a>
            )
          ))}

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
          </button>
          <motion.a
            href="#enquiry"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-primary/30 transition-all"
          >
            Join Now
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center space-x-4">
          <button onClick={toggleDarkMode} className="p-2 rounded-full">
            {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-gray-800 dark:text-white"
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass dark:glass-dark border-t border-gray-200 dark:border-gray-800 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {beforeCourses.map((link) => (
                link.href.startsWith('/') ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-primary"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-primary"
                  >
                    {link.name}
                  </a>
                )
              ))}

              {/* Mobile Courses Accordion — between Faculty and Testimonials */}
              <div>
                <button
                  onClick={() => setMobileCoursesOpen(!mobileCoursesOpen)}
                  className="w-full flex items-center justify-between text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-primary"
                >
                  Courses <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${mobileCoursesOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {mobileCoursesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 pt-3 space-y-3">
                        {COURSE_LINKS.map((c) => (
                          <Link key={c.href} to={c.href}
                            onClick={() => { setIsOpen(false); setMobileCoursesOpen(false); }}
                            className="block text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary"
                          >
                            {c.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {afterCourses.map((link) => (
                link.href.startsWith('/') ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-primary"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-primary"
                  >
                    {link.name}
                  </a>
                )
              ))}

              <a
                href="#enquiry"
                onClick={() => setIsOpen(false)}
                className="bg-primary text-white text-center py-3 rounded-xl font-bold shadow-lg"
              >
                Enroll Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
