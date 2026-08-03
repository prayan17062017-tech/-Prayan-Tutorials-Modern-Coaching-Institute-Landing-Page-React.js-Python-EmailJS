import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Loader2, User, Phone, Mail, BookOpen, MessageCircle, School } from 'lucide-react';
import { sendEnquiryEmail } from '../services/emailService';

const schema = z.object({
  studentName: z.string().min(2, "Name must be at least 2 characters"),
  parentName: z.string().min(2, "Parent name required"),
  mobile: z.string().regex(/^[6-9][0-9]{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Enter a valid email (e.g. name@example.com)"),
  className: z.string().min(1, "Please select a class"),
  stream: z.string().min(1, "Please select a stream"),
  course: z.string().min(1, "Please select a course"),
  school: z.string().min(2, "School name required"),
  message: z.string().optional(),
});

const COOLDOWN_MS = 10000;

const EnquiryForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const lastSubmitTime = useRef(0);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    // Honeypot check
    if (data._honeypot) return;

    // Cooldown check
    const now = Date.now();
    if (now - lastSubmitTime.current < COOLDOWN_MS) {
      setSubmitError(`Please wait ${Math.ceil((COOLDOWN_MS - (now - lastSubmitTime.current)) / 1000)}s before submitting again.`);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await sendEnquiryEmail(data);
      lastSubmitTime.current = Date.now();
      setShowSuccess(true);
      reset();

      // WhatsApp notification after 3 seconds
      const waMessage = `New Admission Enquiry:\nName: ${data.studentName}\nClass: ${data.className}\nCourse: ${data.course}`;
      setTimeout(() => {
        window.open(`https://wa.me/918291237037?text=${encodeURIComponent(waMessage)}`, '_blank');
      }, 3000);
    } catch (err) {
      console.error('EmailJS submission failed', err);
      setSubmitError(err.message || 'Submission failed. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="enquiry" className="section-padding">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content side */}
          <div data-aos="fade-right">
            <h2 className="text-primary font-bold tracking-widest uppercase mb-4 text-sm">Admission Open</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-8">
              Start Your Journey to <span className="text-primary italic">Success</span>
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-200 mb-10">
              Fill out the form below to receive detailed information about our courses, fee structure, and batch timings. Our team will get back to you within 24 hours.
            </p>

            <div className="space-y-6">
              {[
                { icon: CheckCircle, text: 'Personalized Career Counselling' },
                { icon: CheckCircle, text: 'Free Demo Lectures' },
                { icon: CheckCircle, text: 'Scholarship Test Details' }
              ].map((item, i) => (
                <motion.div 
                  key={item.text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center space-x-4 bg-white/50 dark:bg-gray-800/50 p-4 rounded-2xl border border-white/20"
                >
                  <item.icon className="text-primary w-6 h-6" />
                  <span className="font-bold text-gray-700 dark:text-gray-200">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Form side */}
          <div className="bg-gray-50 dark:bg-gray-900 p-8 md:p-12 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-2xl relative" data-aos="fade-left">
            <h4 className="text-2xl font-black text-gray-900 dark:text-white mb-8 text-center uppercase tracking-widest">Enquiry Form</h4>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Honeypot field — hidden from real users */}
              <input type="text" {...register('_honeypot')} className="hidden" aria-hidden="true" tabIndex={-1} autoComplete="off" />
              <div className="grid md:grid-cols-2 gap-6">
                {/* Student Name */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-100 flex items-center"><User className="w-4 h-4 mr-2" /> Student Name</label>
                  <input {...register('studentName')} className="w-full bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 p-4 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white dark:placeholder:text-gray-400" placeholder="John Doe" />
                  {errors.studentName && <p className="text-red-500 text-xs font-bold">{errors.studentName.message}</p>}
                </div>

                {/* Parent Name */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-100 flex items-center"><User className="w-4 h-4 mr-2" /> Parent Name</label>
                  <input {...register('parentName')} className="w-full bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 p-4 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white dark:placeholder:text-gray-400" placeholder="Robert Doe" />
                  {errors.parentName && <p className="text-red-500 text-xs font-bold">{errors.parentName.message}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Mobile — +91 prefix fixed, no shift on typing */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-100 flex items-center">
                    <Phone className="w-4 h-4 mr-2" /> Mobile Number
                  </label>
                  <div className={`relative rounded-xl border overflow-hidden transition-all ${
                    errors.mobile ? 'border-red-400' : 'border-gray-200 dark:border-gray-800 focus-within:ring-2 focus-within:ring-primary'
                  }`}>
                    <span className="absolute inset-y-0 left-0 flex items-center justify-center w-14 bg-primary/10 dark:bg-primary/20 text-primary font-extrabold text-sm border-r border-gray-200 dark:border-gray-700 select-none pointer-events-none z-10">
                      +91
                    </span>
                    <input
                      {...register('mobile', {
                        onChange: (e) => {
                          // Strip non-digits and cap at 10 — update RHF state correctly
                          const cleaned = e.target.value.replace(/\D/g, '').slice(0, 10);
                          e.target.value = cleaned;
                        }
                      })}
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="9876543210"
                      className="w-full bg-white/50 dark:bg-gray-900/50 pl-16 pr-4 py-4 outline-none dark:text-white dark:placeholder:text-gray-400 text-sm"
                    />
                  </div>
                  {errors.mobile
                    ? <p className="text-red-500 text-xs font-bold">{errors.mobile.message}</p>
                    : <p className="text-gray-400 text-xs">10-digit number without country code</p>
                  }
                </div>

                {/* Email — @ prefix fixed, no shift on typing */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-100 flex items-center">
                    <Mail className="w-4 h-4 mr-2" /> Email Address
                  </label>
                  <div className={`relative rounded-xl border overflow-hidden transition-all ${
                    errors.email ? 'border-red-400' : 'border-gray-200 dark:border-gray-800 focus-within:ring-2 focus-within:ring-primary'
                  }`}>
                    <span className="absolute inset-y-0 left-0 flex items-center justify-center w-10 bg-primary/10 dark:bg-primary/20 text-primary font-extrabold text-sm border-r border-gray-200 dark:border-gray-700 select-none pointer-events-none z-10">
                      @
                    </span>
                    <input
                      {...register('email')}
                      type="email"
                      inputMode="email"
                      placeholder="name@example.com"
                      className="w-full bg-white/50 dark:bg-gray-900/50 pl-12 pr-4 py-4 outline-none dark:text-white dark:placeholder:text-gray-400 text-sm"
                    />
                  </div>
                  {errors.email
                    ? <p className="text-red-500 text-xs font-bold">{errors.email.message}</p>
                    : <p className="text-gray-400 text-xs">Valid email e.g. name@example.com</p>
                  }
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {/* Class */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 dark:text-gray-100 uppercase tracking-widest">Class</label>
                  <select {...register('className')} className="w-full bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 p-3 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white">
                    <option value="" className="dark:bg-gray-900">Select</option>
                    <option value="XI-XII Science" className="dark:bg-gray-900">XI-XII Science</option>
                    <option value="XI Science" className="dark:bg-gray-900">XI Science</option>
                    <option value="XII Science" className="dark:bg-gray-900">XII Science</option>
                  </select>
                </div>
                {/* Stream */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 dark:text-gray-100 uppercase tracking-widest">Stream</label>
                  <select {...register('stream')} className="w-full bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 p-3 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white">
                    <option value="" className="dark:bg-gray-900">Select</option>
                    <option value="PCM" className="dark:bg-gray-900">PCM</option>
                    <option value="PCB" className="dark:bg-gray-900">PCB</option>
                    <option value="PCMB" className="dark:bg-gray-900">PCMB</option>
                  </select>
                </div>
                {/* Course */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 dark:text-gray-100 uppercase tracking-widest">Course</label>
                  <select {...register('course')} className="w-full bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 p-3 rounded-xl focus:ring-2 focus:ring-primary outline-none dark:text-white">
                    <option value="" className="dark:bg-gray-900">Select</option>
                    <option value="Regular" className="dark:bg-gray-900">Regular</option>
                    <option value="JEE (Mains)" className="dark:bg-gray-900">JEE</option>
                    <option value="NEET" className="dark:bg-gray-900">NEET</option>
                    <option value="MHT-CET" className="dark:bg-gray-900">CET</option>
                  </select>
                </div>
              </div>

              {/* School Name */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-100 flex items-center"><School className="w-4 h-4 mr-2" /> School/College Name</label>
                <input {...register('school')} className="w-full bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 p-4 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white dark:placeholder:text-gray-400" placeholder="St. Mary's High School" />
                {errors.school && <p className="text-red-500 text-xs font-bold">{errors.school.message}</p>}
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-100 flex items-center"><MessageCircle className="w-4 h-4 mr-2" /> Additional Message</label>
                <textarea {...register('message')} className="w-full bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 p-4 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all h-24 resize-none dark:text-white dark:placeholder:text-gray-400" placeholder="How can we help you?"></textarea>
              </div>

              {submitError && (
                <p className="text-red-500 text-sm font-bold text-center">{submitError}</p>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-primary/30 flex items-center justify-center space-x-3 disabled:opacity-70 transition-all uppercase tracking-widest"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-6 h-6" />
                    <span>Submit Enquiry</span>
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white dark:bg-gray-900 p-12 rounded-[3rem] shadow-2xl text-center max-w-md border-t-8 border-green-500"
            >
              <div className="bg-green-100 dark:bg-green-900/30 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="text-green-500 w-12 h-12" />
              </div>
              <h4 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Submission Successful!</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Thank you for contacting Prayan Tutorials! Your enquiry has been submitted successfully. A confirmation email has been sent to your registered email address. Our admissions team will contact you within 24 hours.
              </p>
              <button 
                onClick={() => setShowSuccess(false)}
                className="w-full bg-gray-900 dark:bg-white dark:text-gray-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest"
              >
                Great!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default EnquiryForm;
