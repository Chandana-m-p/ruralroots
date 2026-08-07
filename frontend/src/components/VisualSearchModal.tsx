import React, { useState, useRef } from 'react';
import { Camera, Image as ImageIcon, X, Sparkles, CheckCircle2 } from 'lucide-react';

interface VisualSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearchImage: (categoryOrTag: string, imagePreviewUrl: string) => void;
}

export const VisualSearchModal: React.FC<VisualSearchModalProps> = ({
  isOpen,
  onClose,
  onSearchImage
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [detectedCategory, setDetectedCategory] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const url = event.target?.result as string;
      setSelectedImage(url);
      analyzeImage(file.name);
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = (fileName: string) => {
    setAnalyzing(true);
    setDetectedCategory(null);

    // Simulate visual craft recognition model based on image traits / category match
    setTimeout(() => {
      const nameLower = fileName.toLowerCase();
      let matchedCategory = 'pottery';

      if (nameLower.includes('basket') || nameLower.includes('weave') || nameLower.includes('jute')) {
        matchedCategory = 'baskets';
      } else if (nameLower.includes('wood') || nameLower.includes('carv') || nameLower.includes('box')) {
        matchedCategory = 'wood';
      } else if (nameLower.includes('bamboo') || nameLower.includes('tray')) {
        matchedCategory = 'bamboo';
      } else if (nameLower.includes('jewel') || nameLower.includes('earring') || nameLower.includes('bead')) {
        matchedCategory = 'jewelry';
      } else if (nameLower.includes('cushion') || nameLower.includes('stole') || nameLower.includes('cloth') || nameLower.includes('textile')) {
        matchedCategory = 'decor';
      } else {
        const categories = ['pottery', 'baskets', 'wood', 'bamboo', 'jewelry', 'decor'];
        matchedCategory = categories[Math.floor(Math.random() * categories.length)];
      }

      setDetectedCategory(matchedCategory);
      setAnalyzing(false);
    }, 1000);
  };

  const handleApplySearch = () => {
    if (detectedCategory && selectedImage) {
      onSearchImage(detectedCategory, selectedImage);
      onClose();
    }
  };

  const resetModal = () => {
    setSelectedImage(null);
    setDetectedCategory(null);
    setAnalyzing(false);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        background: 'var(--white)',
        borderRadius: '20px',
        maxWidth: '500px',
        width: '100%',
        padding: '28px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
        border: '1px solid var(--line)',
        position: 'relative',
        animation: 'fadeIn 0.2s ease-out'
      }}>
        {/* Close button */}
        <button
          onClick={() => { resetModal(); onClose(); }}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'var(--cream-2)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--ink)'
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
          <div style={{ background: '#FFF3E0', padding: '10px', borderRadius: '12px', color: '#E65100' }}>
            <Camera size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--forest)', margin: 0 }}>
              Visual Camera Search
            </h2>
            <div style={{ fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
              Take a photo or select an image from your gallery
            </div>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--line)', margin: '16px 0' }} />

        {/* Hidden File Input supporting Gallery & Camera capture */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        {!selectedImage ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', margin: '20px 0' }}>
            {/* Take Photo Button */}
            <button
              onClick={() => {
                if (fileInputRef.current) {
                  fileInputRef.current.setAttribute('capture', 'environment');
                  fileInputRef.current.click();
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                padding: '16px',
                borderRadius: '12px',
                background: 'var(--forest)',
                color: 'var(--white)',
                border: 'none',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(44, 76, 56, 0.2)'
              }}
            >
              <Camera size={20} />
              Take Photo with Camera
            </button>

            {/* Choose from Gallery Button */}
            <button
              onClick={() => {
                if (fileInputRef.current) {
                  fileInputRef.current.removeAttribute('capture');
                  fileInputRef.current.click();
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                padding: '16px',
                borderRadius: '12px',
                background: 'var(--cream-2)',
                color: 'var(--ink)',
                border: '1.5px solid var(--line)',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              <ImageIcon size={20} color="var(--clay)" />
              Choose Photo from Gallery
            </button>

            <div style={{
              background: 'var(--cream)',
              padding: '12px 16px',
              borderRadius: '10px',
              border: '1px dashed var(--line)',
              fontSize: '0.82rem',
              color: 'var(--ink-soft)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '6px'
            }}>
              <Sparkles size={16} color="var(--amber)" />
              Tip: Upload photos of terracotta pottery, wooden items, baskets, or tribal jewelry for instant visual recognition!
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', margin: '16px 0' }}>
            <div style={{
              position: 'relative',
              width: '100%',
              maxHeight: '240px',
              borderRadius: '14px',
              overflow: 'hidden',
              background: '#000',
              marginBottom: '16px'
            }}>
              <img
                src={selectedImage}
                alt="Captured visual search"
                style={{ width: '100%', height: '240px', objectFit: 'cover' }}
              />

              {analyzing && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0, 0, 0, 0.65)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFF',
                  gap: '12px'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    border: '3px solid #FFF',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                  }} />
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Analyzing Craft Pattern...</span>
                </div>
              )}
            </div>

            {detectedCategory && !analyzing && (
              <div style={{
                background: '#ECFDF5',
                border: '1px solid #A7F3D0',
                padding: '14px',
                borderRadius: '12px',
                marginBottom: '16px',
                textAlign: 'left'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#065F46', fontWeight: 700 }}>
                  <CheckCircle2 size={18} /> Visual Match Detected!
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--ink)', marginTop: '4px' }}>
                  Category Match: <strong style={{ textTransform: 'capitalize' }}>{detectedCategory}</strong>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={resetModal}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid var(--line)',
                  background: 'var(--cream)',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Retake / Change
              </button>

              <button
                disabled={analyzing || !detectedCategory}
                onClick={handleApplySearch}
                className="btn-primary"
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  opacity: analyzing || !detectedCategory ? 0.6 : 1
                }}
              >
                View Matching Products ➔
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
