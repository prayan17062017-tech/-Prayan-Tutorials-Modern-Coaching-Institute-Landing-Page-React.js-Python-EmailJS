import React, { useState } from 'react';
import { User, MapPin, Copy, Check, Phone, Instagram, FileText } from 'lucide-react';
import { addressText } from './chatbotData';
import botAvatar from '../../assets/Prayan bot.png';

const ChatMessage = ({ message, onAdmissionClick }) => {
  const isBot = message.sender === 'bot';
  const [copied, setCopied] = useState(false);

  // Address copy function
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(addressText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper function to format text with newlines and markdown-like bold markers
  const formatText = (text) => {
    return text.split('\n').map((line, i) => {
      let formatted = line;
      // Replace **text** with bold tags
      formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return (
        <span
          key={i}
          className="block min-h-[1em]"
          dangerouslySetInnerHTML={{ __html: formatted }}
        />
      );
    });
  };

  // Maps URL for Dombivli West address
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressText)}`;

  return (
    <div className={`flex items-start space-x-2.5 ${isBot ? 'justify-start' : 'justify-end'}`}>
      {/* Bot Avatar */}
      {isBot && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full border border-primary/30 overflow-hidden shadow-sm">
          <img src={botAvatar} alt="Prayan Bot" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Message Bubble container */}
      <div className="flex flex-col max-w-[75%] space-y-1">
        {/* Bubble */}
        <div
          className={`p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm transition-all duration-200 ${
            isBot
              ? 'bg-blue-50/70 border border-blue-100/50 text-gray-800 rounded-tl-none dark:bg-gray-800/40 dark:border-gray-700/50 dark:text-gray-100'
              : 'bg-primary text-white rounded-tr-none shadow-md shadow-primary/10'
          }`}
        >
          <div className="space-y-1 font-medium">{formatText(message.text)}</div>

          {/* Action buttons inside Bot responses */}
          {isBot && message.type === 'location' && (
            <div className="mt-3.5 flex flex-wrap gap-2">
              <a
                href={mapUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-xl shadow-md hover:bg-primary/95 transition-all"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Open Maps</span>
              </a>
              <button
                onClick={handleCopyAddress}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-xl shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Address'}</span>
              </button>
            </div>
          )}

          {isBot && message.type === 'contact' && (
            <div className="mt-3.5 flex flex-wrap gap-2">
              <a
                href="tel:08291237037"
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-xl shadow-md hover:bg-primary/95 transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>
              <a
                href="https://www.instagram.com/prayantutorials/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500 text-white text-xs font-bold rounded-xl shadow-md hover:opacity-95 transition-all"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Instagram</span>
              </a>
            </div>
          )}

          {isBot && message.type === 'admission' && (
            <div className="mt-3.5">
              <button
                onClick={onAdmissionClick}
                className="flex items-center space-x-1.5 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold rounded-xl shadow-md hover:opacity-95 transition-all w-full justify-center"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Go to Admission Form</span>
              </button>
            </div>
          )}
        </div>

        {/* Timestamp */}
        <span
          className={`text-[10px] text-gray-400 dark:text-gray-500 px-1 ${
            isBot ? 'self-start' : 'self-end'
          }`}
        >
          {message.timestamp}
        </span>
      </div>

      {/* User Icon */}
      {!isBot && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs shadow-md">
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
