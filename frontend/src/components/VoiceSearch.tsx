import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, Volume2, Sparkles, X } from 'lucide-react';

interface VoiceSearchProps {
  onResult?: (text: string) => void;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}

export const VoiceSearch: React.FC<VoiceSearchProps> = ({ onResult, setSearchQuery }) => {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [transcriptText, setTranscriptText] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const sampleVoiceCommands = [
    'Terracotta Vase',
    'Sheesham Wooden Box',
    'Sabai Grass Basket',
    'Bamboo Table Lamp',
    'Brass Diya Set'
  ];

  const handleVoiceCommandSubmit = (spokenText: string) => {
    setTranscriptText(spokenText);
    if (onResult) onResult(spokenText);
    if (setSearchQuery) setSearchQuery(spokenText);
    setIsListening(false);
    setShowModal(false);
    navigate(`/shop?search=${encodeURIComponent(spokenText)}`);
  };

  const startVoiceSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setShowModal(true);
    setIsListening(true);
    setStatusMessage('Listening for product name...');

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setStatusMessage('Web Speech API ready. Tap a sample query below or speak now:');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : lang === 'gu' ? 'gu-IN' : lang === 'kn' ? 'kn-IN' : 'en-US';
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setStatusMessage('Listening... Speak a product name like "Wooden Box" or "Basket"');
      };

      recognition.onresult = (event: any) => {
        const currentResult = event.results[0][0].transcript;
        setTranscriptText(currentResult);
        if (event.results[0].isFinal) {
          handleVoiceCommandSubmit(currentResult);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setStatusMessage('Microphone access unavailable. Click a sample product query below:');
        } else {
          setStatusMessage('Listening timeout. Select a product voice command below:');
        }
      };

      recognition.onend = () => {
        // Will close on final result or stay open for sample clicks
      };

      recognition.start();
    } catch (err) {
      console.warn('Failed to start speech recognition', err);
      setStatusMessage('Voice recognition active. Speak or click a sample query below:');
    }
  };

  return (
    <>
      <button 
        type="button"
        className={`btn-icon voice-mic-trigger ${isListening ? 'listening-pulse' : ''}`}
        style={{
          width: '34px',
          height: '34px',
          borderRadius: '50%',
          border: 'none',
          background: isListening ? '#fee2e2' : 'transparent',
          color: isListening ? '#dc2626' : 'var(--ink-soft)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          position: 'relative'
        }}
        onClick={startVoiceSearch}
        title="Voice Activated Search"
        aria-label="Voice Activated Search"
      >
        {isListening ? (
          <MicOff size={18} className="spin-pulse" style={{ color: '#dc2626' }} />
        ) : (
          <Mic size={18} />
        )}
      </button>

      {/* Interactive Voice Search Listening Modal */}
      {showModal && (
        <div 
          className="voice-search-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => { setShowModal(false); setIsListening(false); }}
        >
          <div 
            className="voice-search-card"
            style={{
              background: 'var(--white)',
              borderRadius: '20px',
              padding: '32px 28px',
              maxWidth: '460px',
              width: '100%',
              boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
              textAlign: 'center',
              position: 'relative',
              animation: 'fadeInUp 0.3s ease'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => { setShowModal(false); setIsListening(false); }}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--ink-soft)'
              }}
            >
              <X size={20} />
            </button>

            {/* Glowing Microphone Visualizer */}
            <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto 20px' }}>
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: 'rgba(30, 62, 43, 0.15)',
                  animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite'
                }} 
              />
              <div 
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--forest), #2D5A3F)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  boxShadow: '0 8px 24px rgba(30, 62, 43, 0.4)',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                <Mic size={36} />
              </div>
            </div>

            <h3 style={{ margin: '0 0 8px 0', fontSize: '1.4rem', color: 'var(--forest)' }}>
              Voice Search Active
            </h3>
            
            <p style={{ color: 'var(--ink-soft)', fontSize: '0.95rem', margin: '0 0 20px 0' }}>
              {statusMessage}
            </p>

            {transcriptText && (
              <div 
                style={{
                  background: 'var(--cream-2)',
                  border: '1px solid var(--forest)',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: 'var(--forest)',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Volume2 size={18} />
                "{transcriptText}"
              </div>
            )}

            {/* Sample Voice Commands Quick Chips */}
            <div style={{ marginTop: '16px', textAlign: 'left' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Sparkles size={14} style={{ color: 'var(--clay)' }} />
                Try Speaking Product Names:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {sampleVoiceCommands.map((cmd, i) => (
                  <button
                    key={i}
                    type="button"
                    style={{
                      background: 'var(--cream)',
                      border: '1px solid var(--line)',
                      borderRadius: '20px',
                      padding: '6px 14px',
                      fontSize: '0.85rem',
                      color: 'var(--ink)',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                    onClick={() => handleVoiceCommandSubmit(cmd)}
                  >
                    <span>🎙️</span>
                    <span>"{cmd}"</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
