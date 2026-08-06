import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mic, MicOff } from 'lucide-react';

interface VoiceSearchProps {
  onResult?: (text: string) => void;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}

export const VoiceSearch: React.FC<VoiceSearchProps> = ({ onResult, setSearchQuery }) => {
  const { lang } = useLanguage();
  const [isListening, setIsListening] = useState(false);

  const startVoiceSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Voice recognition is not supported on this browser. Try Chrome or Edge.');
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
      if (onResult) onResult(transcript);
      if (setSearchQuery) setSearchQuery(transcript);
    };

    recognition.start();
  };

  return (
    <button 
      type="button"
      className={`btn-icon ${isListening ? 'active' : ''}`}
      style={{ width: '32px', height: '32px', border: 'none', background: 'transparent' }}
      onClick={startVoiceSearch}
      title="Voice Search"
      aria-label="Voice Search"
    >
      {isListening ? <MicOff size={16} color="var(--clay)" /> : <Mic size={16} color="var(--ink-soft)" />}
    </button>
  );
};
