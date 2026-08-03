import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Phone } from 'lucide-react';

const AdmissionCTA = () => (
  <section className="section-padding">
    <div className="container mx-auto">
      <motion.div data-aos="zoom-in"
        className="bg-gradient-to-r from-primary to-secondary rounded-[2rem] p-12 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24" />
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Start Your Academic Journey Today</h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
            Join Prayan Tutorials and get expert guidance, personal attention, and a proven path to success.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.a href="#enquiry" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="bg-white text-primary px-8 py-4 rounded-2xl font-bold shadow-xl flex items-center group">
              Apply for Admission <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a href="tel:08291237037" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="bg-white/10 border border-white/30 text-white px-8 py-4 rounded-2xl font-bold flex items-center">
              <Phone className="w-5 h-5 mr-2" /> Contact Us
            </motion.a>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default AdmissionCTA;
