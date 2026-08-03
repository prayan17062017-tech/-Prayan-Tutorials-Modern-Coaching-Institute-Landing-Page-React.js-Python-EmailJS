import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, MessageSquare } from 'lucide-react';
import ChatWindow from './ChatWindow';
import { findResponseKey, responses } from './chatbotData';
import botAvatar from '../../assets/Prayan bot.png';

// Helper to get formatted local time
const getTimestamp = () => {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours}:${minutes} ${ampm}`;
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // Send message handler (works for typed inputs and quick replies)
  const handleSendMessage = (text) => {
    const userMsg = {
      id: `user-${Date.now()}`,
      text,
      sender: 'user',
      timestamp: getTimestamp(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulated typing delay for natural conversation feel
    setTimeout(() => {
      const responseKey = findResponseKey(text);
      const botResponse = responses[responseKey];

      const botMsg = {
        id: `bot-${Date.now()}`,
        text: botResponse.text,
        sender: 'bot',
        type: botResponse.type,
        timestamp: getTimestamp(),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  // Smooth scroll to admission enquiry form and minimize chatbot
  const handleAdmissionClick = () => {
    setIsOpen(false);
    const element = document.getElementById('enquiry');
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen ? (
          /* Collapsed Button State */
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-40 flex items-center space-x-3"
          >
            {/* Label Pill */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-primary text-white font-extrabold text-xs py-2 px-3.5 rounded-2xl shadow-xl flex items-center space-x-2 border border-white/20 dark:border-gray-800"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span>Prayan Bot</span>
            </motion.div>

            {/* Circular Bot Icon Button */}
            <motion.button
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl cursor-pointer border-4 border-white dark:border-gray-800 relative focus:outline-none overflow-hidden"
              title="Chat with Prayan Bot"
            >
              {/* Pulse effect rings */}
              <span className="absolute inset-0 w-full h-full rounded-full bg-primary/40 animate-ping -z-10 opacity-75"></span>
              <span className="absolute inset-[-4px] w-[72px] h-[72px] rounded-full border border-primary/20 animate-pulse -z-20"></span>
              <img src={botAvatar} alt="Prayan Bot" className="w-full h-full object-cover rounded-full" />
            </motion.button>
          </motion.div>
        ) : (
          /* Expanded Chat window State */
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40, x: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="fixed bottom-6 right-6 z-50 origin-bottom-right"
          >
            <ChatWindow
              messages={messages}
              isTyping={isTyping}
              onSendMessage={handleSendMessage}
              onClose={() => setIsOpen(false)}
              onAdmissionClick={handleAdmissionClick}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
