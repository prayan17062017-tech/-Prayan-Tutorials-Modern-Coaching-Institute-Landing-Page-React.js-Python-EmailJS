import React, { useState, useEffect, useRef } from 'react';
import { Minimize2, Send } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { quickQuestions } from './chatbotData';
import botAvatar from '../../assets/Prayan bot.png';

const ChatWindow = ({ messages, isTyping, onSendMessage, onClose, onAdmissionClick }) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  // Auto scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onSendMessage(inputValue.trim());
    setInputValue('');
  };

  return (
    <div className="w-[360px] max-w-[92vw] h-[520px] max-h-[82vh] flex flex-col rounded-[2rem] overflow-hidden shadow-2xl glass dark:glass-dark border border-white/20 dark:border-gray-800/80 bg-white/95 dark:bg-gray-950/95 z-50">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white p-5 flex items-center justify-between shadow-md relative">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full border-2 border-white/40 shadow-inner overflow-hidden flex-shrink-0">
            <img src={botAvatar} alt="Prayan Bot" className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm tracking-wide flex items-center">
              🤖 PRAYAN BOT
            </h4>
            <p className="text-[11px] text-white/85 font-semibold">
              Prayan Tutorials Assistant
            </p>
          </div>
        </div>
        
        {/* Minimize Button */}
        <button
          onClick={onClose}
          className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all text-white border border-white/10 cursor-pointer"
          title="Minimize Chat"
        >
          <Minimize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-blue-50/20 to-transparent dark:from-gray-900/10 dark:to-transparent">
        
        {/* Greeting and Quick Action Buttons */}
        <div className="flex items-start space-x-2.5">
          <div className="flex-shrink-0 w-8 h-8 rounded-full border border-primary/30 overflow-hidden shadow-sm">
            <img src={botAvatar} alt="Prayan Bot" className="w-full h-full object-cover" />
          </div>
          
          <div className="bg-blue-50/70 border border-blue-100/50 p-4 rounded-2xl rounded-tl-none text-sm text-gray-800 dark:bg-gray-850 dark:border-gray-800 dark:text-gray-100 font-medium w-full shadow-sm">
            <p className="mb-3">
              Hello! 👋 I'm <strong className="text-primary dark:text-blue-400">Prayan Bot</strong>, your Prayan Tutorials assistant.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3.5 italic">
              Ask me anything or select a topic below to get started:
            </p>
            
            {/* Quick action buttons grid */}
            <div className="grid grid-cols-2 gap-2">
              {quickQuestions.map((q) => (
                <button
                  key={q.text}
                  onClick={() => onSendMessage(q.text)}
                  className="flex items-center space-x-2 p-2.5 bg-white hover:bg-primary hover:text-white dark:bg-gray-800 dark:hover:bg-primary border border-gray-100 dark:border-gray-700/60 rounded-xl text-left text-[11px] font-extrabold text-gray-700 dark:text-gray-200 transition-all shadow-sm hover:shadow-md cursor-pointer select-none active:scale-95 duration-100"
                >
                  <span className="text-sm">{q.icon}</span>
                  <span className="truncate">{q.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Message Stream */}
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            onAdmissionClick={onAdmissionClick}
          />
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center space-x-2.5 justify-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full border border-primary/30 overflow-hidden shadow-sm">
              <img src={botAvatar} alt="Prayan Bot" className="w-full h-full object-cover" />
            </div>
            <div className="p-3 bg-blue-50/70 border border-blue-100/50 rounded-2xl rounded-tl-none dark:bg-gray-850 dark:border-gray-800 flex items-center space-x-1 h-9 shadow-sm">
              <span className="w-1.5 h-1.5 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-1.5 h-1.5 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-1.5 h-1.5 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        )}
        
        {/* Anchor for auto scroll */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form
        onSubmit={handleSubmit}
        className="p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 flex items-center space-x-2.5"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 py-3 px-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm dark:text-white dark:placeholder-gray-500 font-semibold"
        />
        <button
          type="submit"
          disabled={!inputValue.trim()}
          className="p-3 bg-primary hover:bg-primary/95 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 disabled:hover:bg-primary text-white rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
