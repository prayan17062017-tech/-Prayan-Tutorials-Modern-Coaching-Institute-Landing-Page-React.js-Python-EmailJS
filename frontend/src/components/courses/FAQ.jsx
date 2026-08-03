import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQ = ({ faqs }) => {
  const [open, setOpen] = useState(null);
  return (
    <section className="section-padding">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-14" data-aos="fade-up">
          <h2 className="text-primary font-bold tracking-widest uppercase mb-4 text-sm">Got Questions?</h2>
          <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white">Frequently Asked <span className="text-primary italic">Questions</span></h3>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left font-bold text-gray-900 dark:text-white hover:text-primary transition-colors">
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                    <p className="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
