import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mic, MicOff, Search } from 'lucide-react';

interface VoiceSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const VoiceSearch: React.FC<VoiceSearchProps> = ({ searchQuery, setSearchQuery }) => {
  const { t, lang } = useLanguage();
  const [isListening, setIsListening] = useState(false);

  const startVoiceSearch = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Voice recognition not supported in this browser. Please use Chrome on Mobile.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : lang === 'gu' ? 'gu-IN' : 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
    };

    recognition.start();
  };

  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <Search className="search-icon" size={20} />
        <input 
          type="text" 
          className="search-input"
          placeholder={t('searchPlaceholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button 
          className={`mic-btn ${isListening ? 'listening' : ''}`}
          onClick={startVoiceSearch}
          title={t('voiceSearch')}
        >
          {isListening ? <MicOff size={20} className="pulse" /> : <Mic size={20} />}
        </button>
      </div>
    </div>
  );
};
