import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArtisanCard, Artisan } from '../components/ArtisanCard';
import { Footer } from '../components/Footer';
import { X, Award, MapPin, Heart, ShoppingBag, ArrowRight, Quote } from 'lucide-react';

const ARTISANS_LIST: Artisan[] = [
  {
    id: 'artisan-1',
    name: 'Ananya Sharma',
    location: 'Jaipur, Rajasthan',
    craft: 'Terracotta & Clay Pottery',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces',
    banner: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=1000&h=400&fit=crop',
    rating: 4.9,
    productCount: 24,
    experienceYears: 22,
    category: 'pottery',
    specialty: 'Traditional Wheel Pottery & Earth Pigment Painting',
    quote: 'Pottery is not just clay in my hands; it is the living breath of my ancestors passed down through three generations in our village.',
    story: `Ananya Sharma grew up in a small pottery village outside Jaipur, watching her grandmother mold natural red clay on traditional wooden wheels. For over two decades, she has preserved ancestral terracotta pot-making techniques, using natural earth pigments harvested locally without any artificial chemicals or plastic glazes.

Through RuralRoots, Ananya now leads a cooperative of 14 women in her village. Every terracotta vase and unglazed clay bowl she creates supports sustainable rural livelihoods and keeps traditional Rajasthani craft heritage vibrant.`
  },
  {
    id: 'artisan-2',
    name: 'Lalitha Devi',
    location: 'Srikakulam, Andhra Pradesh',
    craft: 'Handwoven Sabai Grass',
    photo: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop&crop=faces',
    banner: 'https://images.unsplash.com/photo-1622560481156-01ac25e4c0ac?w=1000&h=400&fit=crop',
    rating: 4.8,
    productCount: 32,
    experienceYears: 16,
    category: 'baskets',
    specialty: 'Eco-Friendly Storage Baskets & Braided Home Decor',
    quote: 'Every strand of Sabai grass we weave carries the strength and dignity of rural women striving for financial independence.',
    story: `Lalitha Devi leads a self-help group of 28 rural women weavers in Srikakulam. Harvesting wild Sabai grass along coastal riverbanks, Lalitha splits, vegetable-dyes, and hand-braids durable storage baskets and home accessories.

What started as an informal village gathering under a banyan tree has blossomed into a thriving micro-enterprise. Her handwoven creations preserve age-old weaving heritage while funding local education initiatives for young girls in her district.`
  },
  {
    id: 'artisan-3',
    name: 'Ramesh Kumar',
    location: 'Indore, Madhya Pradesh',
    craft: 'Sheesham Wood Carving',
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=faces',
    banner: 'https://images.unsplash.com/photo-1611486212557-88be5ff6f941?w=1000&h=400&fit=crop',
    rating: 4.7,
    productCount: 18,
    experienceYears: 28,
    category: 'wood',
    specialty: 'Intricate Relief Wood Carving & Organic Oil Finishes',
    quote: 'A piece of wood is a canvas waiting for a soul to be carved into it with patience and respect.',
    story: `Master woodcrafter Ramesh Kumar has spent 28 years perfecting intricate lattice and floral wood carving on sustainably sourced Sheesham wood. Taught by his father in rural Madhya Pradesh, Ramesh uses hand-forged chisels to create heirloom jewelry boxes and wooden decorative trays.

Each creation is finished with natural organic beeswax, ensuring a silky luster without harmful chemical lacquers. His workshop employs 8 local artisans in his village.`
  },
  {
    id: 'artisan-4',
    name: 'Meena Bai',
    location: 'Guwahati, Assam',
    craft: 'Bamboo & Cane Weaving',
    photo: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop&crop=faces',
    banner: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=1000&h=400&fit=crop',
    rating: 4.9,
    productCount: 29,
    experienceYears: 19,
    category: 'bamboo',
    specialty: 'Flexible Bamboo Lattice & Eco Household Trays',
    quote: 'Bamboo grows fast in our forests, and when shaped by patient hands, it turns into timeless household art.',
    story: `Meena Bai lives near the lush bamboo groves of Assam. She specializes in splitting seasoned bamboo stalks into ultra-thin flexible ribbons, weaving them into intricate trays, storage baskets, and wall hangings.

Meena's craft is 100% biodegradable and zero-waste. She regularly trains young women in her village panchayat to keep Assam's bamboo craft legacy vibrant for future generations.`
  },
  {
    id: 'artisan-5',
    name: 'Suresh Patil',
    location: 'Kolhapur, Maharashtra',
    craft: 'Traditional Leather & Metalwork',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces',
    banner: 'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=1000&h=400&fit=crop',
    rating: 4.6,
    productCount: 21,
    experienceYears: 25,
    category: 'decor',
    specialty: 'Hand-stitched Vegetable-tanned Goods & Brass Details',
    quote: 'True craftsmanship requires patience, strength, and respect for raw natural materials.',
    story: `Suresh Patil comes from a family of traditional Kolhapuri craftsmen. Working with vegetable-tanned leather and hand-cast brass embellishments, Suresh crafts durable goods built to last decades.

His workshop employs 8 local artisans in his village, preserving century-old tanning and hand-stitching techniques passed down through generations.`
  },
  {
    id: 'artisan-6',
    name: 'Kamla Devi',
    location: 'Kutch, Gujarat',
    craft: 'Mirrorwork & Embroidery',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces',
    banner: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=1000&h=400&fit=crop',
    rating: 4.95,
    productCount: 35,
    experienceYears: 30,
    category: 'decor',
    specialty: 'Rabari Hand Embroidery & Shisha Mirror Stitching',
    quote: 'The mirrors in our embroidery reflect the vibrant sunlight and resilient spirit of the Kutch desert.',
    story: `Kamla Devi is a master artisan from Kutch known for intricate Rabari mirrorwork embroidery. Using vibrant indigo and crimson threads, Kamla embeds small hand-cut mirrors into organic cotton cushion covers and wall tapestries.

Her exquisite needlework has been showcased in national craft exhibitions, and she now leads a rural collective empowering 25 village embroiderers.`
  }
];

export const Artisans: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedArtisan, setSelectedArtisan] = useState<Artisan | null>(null);

  // Sync artisan story modal with URL query parameter ?id=artisan-X
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const artisanId = params.get('id');
    if (artisanId) {
      const found = ARTISANS_LIST.find((a) => a.id === artisanId);
      if (found) {
        setSelectedArtisan(found);
      }
    } else {
      setSelectedArtisan(null);
    }
  }, [location.search]);

  const handleOpenStory = (artisan: Artisan) => {
    setSelectedArtisan(artisan);
    navigate(`/artisans?id=${artisan.id}`, { replace: true });
  };

  const handleCloseStory = () => {
    setSelectedArtisan(null);
    navigate('/artisans', { replace: true });
  };

  const filtered = ARTISANS_LIST.filter((a) => {
    if (selectedRegion === 'all') return true;
    return a.location.toLowerCase().includes(selectedRegion.toLowerCase());
  });

  return (
    <div>
      <div className="container" style={{ paddingBottom: '48px' }}>
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="sep">›</span>
          <span className="current">Artisans</span>
        </div>

        {/* Hero Spotlight */}
        <div className="hero" style={{ padding: '36px', borderRadius: 'var(--radius-lg)', marginBottom: '32px' }}>
          <div style={{ maxWidth: '680px' }}>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '12px' }}>Meet Our Master Rural Artisans</h2>
            <p style={{ color: 'var(--ink-soft)', fontSize: '1rem', lineHeight: '1.6' }}>
              Every product on RuralRoots is hand-crafted by skilled master artisans across India's villages. Click on any artisan to read their personal life story, heritage craftsmanship, and village impact.
            </p>
          </div>
        </div>

        {/* Region Filter Bar */}
        <div className="shop-toolbar" style={{ marginBottom: '24px' }}>
          <span style={{ color: 'var(--ink-soft)', fontSize: '0.92rem', fontWeight: 600 }}>
            Filter Artisans by Region:
          </span>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['all', 'Rajasthan', 'Andhra Pradesh', 'Madhya Pradesh', 'Assam', 'Gujarat'].map((reg) => (
              <button
                key={reg}
                className={`btn ${selectedRegion === reg ? 'btn-primary' : 'btn-outline'}`}
                style={{ padding: '6px 14px', fontSize: '0.85rem' }}
                onClick={() => setSelectedRegion(reg)}
              >
                {reg === 'all' ? 'All Regions' : reg}
              </button>
            ))}
          </div>
        </div>

        {/* Artisans Grid */}
        <div className="artisan-grid">
          {filtered.map((artisan) => (
            <ArtisanCard 
              key={artisan.id} 
              artisan={artisan} 
              onSelectStory={handleOpenStory}
            />
          ))}
        </div>
      </div>

      {/* RICH ARTISAN STORY MODAL */}
      {selectedArtisan && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(6px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.2s ease-out'
          }}
          onClick={handleCloseStory}
        >
          <div 
            style={{
              background: 'var(--white)',
              borderRadius: '16px',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: 'var(--shadow-lg)',
              position: 'relative',
              border: '1px solid var(--line)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Modal Button */}
            <button 
              onClick={handleCloseStory}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid var(--line)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10
              }}
              aria-label="Close story"
            >
              <X size={20} />
            </button>

            {/* Banner & Profile Photo Header */}
            <div style={{ position: 'relative' }}>
              <img 
                src={selectedArtisan.banner || selectedArtisan.photo} 
                alt={selectedArtisan.name}
                style={{ width: '100%', height: '220px', objectFit: 'cover' }}
              />
              <div 
                style={{
                  position: 'absolute',
                  bottom: '-36px',
                  left: '24px',
                  width: '84px',
                  height: '84px',
                  borderRadius: '50%',
                  border: '4px solid var(--white)',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}
              >
                <img src={selectedArtisan.photo} alt={selectedArtisan.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>

            {/* Story Details Body */}
            <div style={{ padding: '48px 28px 28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h2 style={{ fontSize: '1.8rem', color: 'var(--ink)', marginBottom: '4px' }}>{selectedArtisan.name}</h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', color: 'var(--ink-soft)' }}>
                    <span>📍 {selectedArtisan.location}</span>
                    <span>•</span>
                    <span style={{ fontWeight: 600, color: 'var(--forest)' }}>🏷️ {selectedArtisan.craft}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ background: 'var(--cream-2)', padding: '6px 12px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 600, color: 'var(--clay)' }}>
                    ★ {selectedArtisan.rating} Rating
                  </span>
                  <span style={{ background: 'var(--cream-2)', padding: '6px 12px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 600, color: 'var(--forest)' }}>
                    {selectedArtisan.experienceYears || 20}+ Yrs Crafting
                  </span>
                </div>
              </div>

              {/* Quote Block */}
              {selectedArtisan.quote && (
                <div 
                  style={{
                    margin: '20px 0',
                    padding: '16px 20px',
                    background: 'var(--cream)',
                    borderRadius: '12px',
                    borderLeft: '4px solid var(--clay)',
                    fontStyle: 'italic',
                    color: 'var(--ink)',
                    fontSize: '0.95rem',
                    lineHeight: '1.5',
                    position: 'relative'
                  }}
                >
                  <Quote size={20} style={{ position: 'absolute', right: '12px', top: '12px', opacity: 0.2, color: 'var(--clay)' }} />
                  "{selectedArtisan.quote}"
                </div>
              )}

              {/* Story Narrative */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '8px', color: 'var(--ink)' }}>📖 Heritage Craft & Story</h4>
                <div style={{ fontSize: '0.95rem', color: 'var(--ink)', lineHeight: '1.7', whiteSpace: 'pre-line' }}>
                  {selectedArtisan.story}
                </div>
              </div>

              {/* Specialty & Impact Badge */}
              <div style={{ padding: '16px', background: 'var(--cream-2)', borderRadius: '10px', marginBottom: '24px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Award size={28} style={{ color: 'var(--forest)', flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--forest)' }}>Craft Specialty</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--ink-soft)' }}>{selectedArtisan.specialty || selectedArtisan.craft}</div>
                </div>
              </div>

              {/* Action Button */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => {
                    handleCloseStory();
                    navigate(`/shop?cat=${selectedArtisan.category || 'pottery'}`);
                  }}
                  className="btn btn-primary"
                  style={{ flex: 1, padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <ShoppingBag size={18} />
                  <span>Shop {selectedArtisan.name.split(' ')[0]}'s Handmade Creations</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

