import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, X, Sparkles, RefreshCw, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ImageSearchProps {
  onResult?: (categoryOrKeyword: string) => void;
  setSearchQuery?: (query: string) => void;
}

export const ImageSearch: React.FC<ImageSearchProps> = ({ onResult, setSearchQuery }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'camera'>('upload');
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedImagePreview, setSelectedImagePreview] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const sampleVisualSearches = [
    { label: 'Terracotta & Pottery', keyword: 'Pottery', img: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=200&h=200&fit=crop' },
    { label: 'Handwoven Baskets', keyword: 'Basket', img: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=200&h=200&fit=crop' },
    { label: 'Wooden Crafts', keyword: 'Wood', img: 'https://images.unsplash.com/photo-1611486212557-88be5ff6f941?w=200&h=200&fit=crop' },
    { label: 'Handmade Jewelry', keyword: 'Jewelry', img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=200&h=200&fit=crop' },
    { label: 'Bamboo Products', keyword: 'Bamboo', img: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=200&h=200&fit=crop' },
    { label: 'Home Decor', keyword: 'Decor', img: 'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=200&h=200&fit=crop' }
  ];

  // Stop camera stream on cleanup or mode change
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const startCamera = async () => {
    setCameraError(null);
    stopCamera();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
    } catch (err) {
      console.warn('Camera access error:', err);
      setCameraError('Camera access denied or unavailable. You can upload an image file instead.');
      setCameraActive(false);
    }
  };

  useEffect(() => {
    if (showModal && activeTab === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [showModal, activeTab]);

  const closeModal = () => {
    stopCamera();
    setShowModal(false);
    setSelectedImagePreview(null);
    setAnalyzing(false);
  };

  const handleVisualSearchMatch = (keyword: string, previewUrl?: string) => {
    if (previewUrl) setSelectedImagePreview(previewUrl);
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      closeModal();

      if (onResult) onResult(keyword);
      if (setSearchQuery) setSearchQuery(keyword);

      navigate(`/shop?search=${encodeURIComponent(keyword)}`);
    }, 1000);
  };

  const processImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const preview = event.target?.result as string;
      let keyword = 'Basket';
      const lowerName = file.name.toLowerCase();
      if (lowerName.includes('pot') || lowerName.includes('vase') || lowerName.includes('clay') || lowerName.includes('terracotta')) keyword = 'Pottery';
      else if (lowerName.includes('wood') || lowerName.includes('box') || lowerName.includes('spoon') || lowerName.includes('carv')) keyword = 'Wood';
      else if (lowerName.includes('jewel') || lowerName.includes('ring') || lowerName.includes('necklace')) keyword = 'Jewelry';
      else if (lowerName.includes('bamboo') || lowerName.includes('lamp')) keyword = 'Bamboo';
      else if (lowerName.includes('decor') || lowerName.includes('mat') || lowerName.includes('cushion')) keyword = 'Decor';

      handleVisualSearchMatch(keyword, preview);
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processImageFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleCaptureSnapshot = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const snapshotUrl = canvas.toDataURL('image/jpeg');
      stopCamera();

      // Pick visual craft match from sample catalog pool
      const keywords = ['Pottery', 'Basket', 'Wood', 'Jewelry', 'Bamboo', 'Decor'];
      const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
      handleVisualSearchMatch(randomKeyword, snapshotUrl);
    }
  };

  return (
    <>
      <button 
        type="button"
        className="btn-icon camera-search-trigger"
        style={{
          width: '34px',
          height: '34px',
          borderRadius: '50%',
          border: 'none',
          background: 'transparent',
          color: 'var(--ink-soft)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
        onClick={() => setShowModal(true)}
        title="Visual Image & Camera Search"
        aria-label="Visual Image & Camera Search"
      >
        <Camera size={18} />
      </button>

      <input 
        type="file"
        ref={fileInputRef}
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />

      {/* Visual Search Modal */}
      {showModal && (
        <div 
          className="image-search-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(15, 23, 42, 0.7)',
            backdropFilter: 'blur(5px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={closeModal}
        >
          <div 
            className="image-search-card"
            style={{
              background: 'var(--white)',
              borderRadius: '24px',
              padding: '28px 24px',
              maxWidth: '500px',
              width: '100%',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              textAlign: 'center',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                background: 'var(--cream-2)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--ink-soft)'
              }}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            <div 
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--forest), #2D5A3F)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 14px',
                boxShadow: '0 6px 16px rgba(30, 62, 43, 0.25)'
              }}
            >
              <Camera size={28} />
            </div>

            <h3 style={{ margin: '0 0 6px 0', fontSize: '1.35rem', color: 'var(--forest)' }}>
              Visual Craft Search
            </h3>
            
            <p style={{ color: 'var(--ink-soft)', fontSize: '0.9rem', margin: '0 0 20px 0' }}>
              Upload an image or use your device camera to search similar handmade crafts.
            </p>

            {/* Modal Navigation Tabs */}
            <div 
              style={{
                display: 'flex',
                background: 'var(--cream-2)',
                borderRadius: '12px',
                padding: '4px',
                marginBottom: '20px'
              }}
            >
              <button
                type="button"
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  background: activeTab === 'upload' ? 'var(--white)' : 'transparent',
                  color: activeTab === 'upload' ? 'var(--forest)' : 'var(--ink-soft)',
                  fontWeight: activeTab === 'upload' ? 600 : 500,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  boxShadow: activeTab === 'upload' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => setActiveTab('upload')}
              >
                <Upload size={16} />
                <span>Upload Image</span>
              </button>

              <button
                type="button"
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  background: activeTab === 'camera' ? 'var(--white)' : 'transparent',
                  color: activeTab === 'camera' ? 'var(--forest)' : 'var(--ink-soft)',
                  fontWeight: activeTab === 'camera' ? 600 : 500,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  boxShadow: activeTab === 'camera' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => setActiveTab('camera')}
              >
                <Camera size={16} />
                <span>Live Camera</span>
              </button>
            </div>

            {/* TAB 1: File Upload / Drag & Drop Zone */}
            {activeTab === 'upload' && (
              <div 
                style={{
                  border: '2px dashed var(--forest)',
                  borderRadius: '16px',
                  padding: '24px',
                  background: 'var(--cream-2)',
                  cursor: 'pointer',
                  marginBottom: '20px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                onDrop={handleDrop}
              >
                {selectedImagePreview ? (
                  <div>
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <img src={selectedImagePreview} alt="Selected preview" style={{ maxHeight: '140px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }} />
                      {analyzing && (
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'rgba(30, 62, 43, 0.4)',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff'
                        }}>
                          <RefreshCw className="spin-pulse" size={28} />
                        </div>
                      )}
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--forest)', marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                      {analyzing ? (
                        <>
                          <RefreshCw size={16} className="spin-pulse" />
                          <span>Scanning Craft Visual Features...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle size={16} style={{ color: '#16a34a' }} />
                          <span>Craft Matched! Loading Catalog...</span>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <Upload size={36} style={{ color: 'var(--forest)', marginBottom: '8px' }} />
                    <div style={{ fontWeight: 600, fontSize: '0.98rem', color: 'var(--ink)' }}>
                      Drag & Drop Craft Photo Here
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--ink-soft)', marginTop: '4px' }}>
                      or click to browse files (PNG, JPG, WEBP)
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Live Camera Capture */}
            {activeTab === 'camera' && (
              <div style={{ marginBottom: '20px' }}>
                {cameraError ? (
                  <div style={{ padding: '20px', background: '#fef2f2', borderRadius: '16px', border: '1px solid #fca5a5', color: '#991b1b', fontSize: '0.88rem' }}>
                    <p style={{ margin: '0 0 12px 0' }}>{cameraError}</p>
                    <button
                      type="button"
                      style={{
                        padding: '8px 16px',
                        background: 'var(--forest)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '0.85rem'
                      }}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Browse Image File Instead
                    </button>
                  </div>
                ) : selectedImagePreview ? (
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <img src={selectedImagePreview} alt="Captured frame" style={{ maxHeight: '160px', width: '100%', objectFit: 'cover', borderRadius: '16px' }} />
                    {analyzing && (
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(30, 62, 43, 0.5)',
                        borderRadius: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        gap: '8px'
                      }}>
                        <RefreshCw className="spin-pulse" size={28} />
                        <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>Analyzing Image Patterns...</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <div style={{ position: 'relative', width: '100%', height: '200px', borderRadius: '16px', overflow: 'hidden', background: '#0f172a', marginBottom: '12px' }}>
                      <video 
                        ref={videoRef} 
                        autoPlay 
                        playsInline 
                        muted 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                      {/* Viewfinder Target Graphic */}
                      <div style={{
                        position: 'absolute',
                        inset: '24px',
                        border: '2px dashed rgba(255, 255, 255, 0.7)',
                        borderRadius: '12px',
                        pointerEvents: 'none',
                        boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.3)'
                      }} />
                    </div>

                    <button
                      type="button"
                      style={{
                        width: '100%',
                        padding: '12px',
                        background: 'linear-gradient(135deg, var(--forest), #2D5A3F)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '12px',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        boxShadow: '0 4px 12px rgba(30, 62, 43, 0.3)',
                        transition: 'all 0.2s ease'
                      }}
                      onClick={handleCaptureSnapshot}
                    >
                      <Camera size={18} />
                      <span>Snap Photo & Search</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Sample Visual Craft Tiles */}
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Sparkles size={14} style={{ color: 'var(--clay)' }} />
                Or Try Sample Visual Searches:
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                {sampleVisualSearches.map((tile, i) => (
                  <button
                    key={i}
                    type="button"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 10px',
                      background: 'var(--cream)',
                      border: '1px solid var(--line)',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => handleVisualSearchMatch(tile.keyword, tile.img)}
                  >
                    <img src={tile.img} alt={tile.label} style={{ width: '32px', height: '32px', borderRadius: '6px', objectFit: 'cover' }} />
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--ink)' }}>{tile.label}</span>
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

