import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, MessageSquare, Map as MapIcon, X, ExternalLink } from 'lucide-react';
import MapsImg from '../assets/PRAYAN TUTORIALS maps.png';

const Maps = () => {
  const [showQRModal, setShowQRModal] = useState(false);
  const address = "Ghanshyam Complex, B-101, Mahatma Gandhi Rd, above Anil Eye Hospital, near DNS Bank, Dombivli, Vishnu Nagar, Dombivli West, Dombivli, Kalyan, Maharashtra 421202";
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const whatsappUrl = "https://wa.me/918291237037";
  const phone = "082912 37037";

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-primary font-bold tracking-widest uppercase mb-4 text-sm">Find Us</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            Locate Our <span className="text-primary italic">Campus</span>
          </h3>
          <p className="text-gray-600 dark:text-gray-200 max-w-2xl mx-auto">
            Conveniently located in the heart of Dombivli, easily accessible for all students.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-stretch">
          {/* Map Section */}
          <div className="lg:col-span-8 h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800" data-aos="zoom-in">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3409.3237257656333!2d73.08592067466854!3d19.220285447428125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be79572edd68f4b%3A0x674921a3b6937f65!2sPrayan%20Tutorials!5e1!3m2!1sen!2sin!4v1781359969946!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps"
              className="grayscale-[20%] dark:invert-[90%] dark:hue-rotate-180"
            ></iframe>
          </div>

          {/* Contact Details & QR */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Address Card */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-gray-50 dark:bg-gray-900 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl flex-1"
              data-aos="fade-left"
            >
              <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <MapPin className="text-primary w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Institute Address</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm mb-8 italic">
                {address}
              </p>
              
              <div className="space-y-4">
                <a href={`tel:${phone.replace(/ /g, '')}`} className="flex items-center space-x-3 text-gray-700 dark:text-gray-200 hover:text-primary transition-colors font-semibold">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>{phone}</span>
                </a>
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className="flex items-center space-x-3 text-gray-700 dark:text-gray-200 hover:text-green-500 transition-colors font-semibold">
                  <MessageSquare className="w-5 h-5 text-green-500" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </motion.div>

            {/* QR Card */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              onClick={() => setShowQRModal(true)}
              className="bg-gray-50 dark:bg-gray-900 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 cursor-pointer group flex flex-col items-center justify-center relative overflow-hidden shadow-xl"
              data-aos="fade-left"
              data-aos-delay="100"
            >
              <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                <img src={MapsImg} alt="QR" className="w-10 h-10 object-contain" />
              </div>
              <img src={MapsImg} alt="Scan for Directions" className="w-[120px] h-[120px] mb-4 bg-white p-2 rounded-xl shadow-inner object-contain" />
              <p className="text-primary font-black text-sm uppercase tracking-widest flex items-center">
                Scan for Directions <ExternalLink className="w-4 h-4 ml-2" />
              </p>
            </motion.div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <motion.a
                href={mapUrl}
                target="_blank"
                whileHover={{ y: -5 }}
                className="bg-primary text-white p-4 rounded-2xl flex flex-col items-center justify-center font-bold shadow-lg shadow-primary/20"
              >
                <MapIcon className="mb-2 w-6 h-6" />
                <span className="text-xs uppercase tracking-tighter">Open in Maps</span>
              </motion.a>
              <motion.a
                href={`tel:${phone.replace(/ /g, '')}`}
                whileHover={{ y: -5 }}
                className="bg-secondary text-white p-4 rounded-2xl flex flex-col items-center justify-center font-bold shadow-lg shadow-secondary/20"
              >
                <Phone className="mb-2 w-6 h-6" />
                <span className="text-xs uppercase tracking-tighter">Call Now</span>
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      {/* QR Zoom Modal */}
      <AnimatePresence>
        {showQRModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowQRModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="bg-white dark:bg-gray-900 p-10 rounded-[3rem] shadow-2xl relative flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowQRModal(false)}
                className="absolute top-6 right-6 p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200"
              >
                <X className="w-6 h-6" />
              </button>
              <h4 className="text-2xl font-black text-primary mb-8 text-center uppercase tracking-widest">Google Maps Navigation</h4>
              <div className="bg-white p-6 rounded-[2rem] shadow-2xl border-8 border-primary/10 mb-8">
                <img src={MapsImg} alt="Google Maps QR Code" className="w-[300px] h-[300px] object-contain" />
              </div>
              <p className="text-gray-500 font-medium text-center max-w-xs">
                Scan this QR code with your phone camera to open the location directly in Google Maps.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Maps;
