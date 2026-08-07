import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Truck, Users, WifiOff, Volume2, Heart, Award, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';

export const OurStory: React.FC = () => {
  const { t } = useLanguage();

  const impactStats = [
    { number: "50+", label: "Village Hub Stores", desc: "Trusted local Kirana partners handling COD logistics" },
    { number: "10,000+", label: "Rural Farmers & Artisans", desc: "Direct market access with zero middlemen exploitation" },
    { number: "100%", label: "Offline-First Resilience", desc: "Zero order loss even during zero 2G/3G connectivity" },
    { number: "4.9 ★", label: "Community Trust Score", desc: "Empowering non-literate buyers with voice search" }
  ];

  const pillars = [
    {
      icon: <WifiOff size={28} className="text-emerald-700" />,
      title: "Offline-First PWA Technology",
      description: "Spotty network connections shouldn't stop rural commerce. Our Service Worker architecture precaches products into IndexedDB so buyers can browse and place orders completely offline."
    },
    {
      icon: <Truck size={28} className="text-emerald-700" />,
      title: "Hub-and-Spoke Cash Logistics",
      description: "Without pinpoint street addresses, delivery to individual doors fails. We deliver bulk consignments to designated local Village Hubs (Kirana stores), where buyers pay cash upon inspection."
    },
    {
      icon: <Volume2 size={28} className="text-emerald-700" />,
      title: "Voice Search & Multi-Lingual Ease",
      description: "Text-only interfaces create barriers. RuralRoots provides native Web Speech API voice search and 4 regional language translations (Hindi, English, Marathi, Gujarati) for full digital inclusion."
    },
    {
      icon: <Heart size={28} className="text-emerald-700" />,
      title: "Artisan & Farmer Empowerment",
      description: "By connecting rural creators directly with conscious consumers, we ensure fair pricing, preserve traditional handicraft heritage, and boost rural household earnings by up to 35%."
    }
  ];

  const testimonials = [
    {
      name: "Sunita Devi",
      role: "Village Hub Manager, Ramgarh",
      quote: "Managing the RuralRoots hub in our village has allowed 200+ local families to receive authentic farm supplies and handloom goods without traveling 40 km to town.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80"
    },
    {
      name: "Ramesh Patel",
      role: "Cotton Farmer, Gujarat",
      quote: "Even when I'm out in the field with zero signal, I can place my seed and tool orders on the app. As soon as I reach home, it syncs instantly!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80"
    }
  ];

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* HERO SECTION */}
      <section style={{
        background: 'linear-gradient(135deg, var(--forest) 0%, #152C1E 100%)',
        color: 'var(--white)',
        padding: '70px 20px 80px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200, 137, 72, 0.15) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '850px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(8px)',
            padding: '6px 16px',
            borderRadius: '20px',
            fontSize: '0.85rem',
            color: 'var(--sand)',
            fontWeight: 600,
            marginBottom: '20px'
          }}>
            <Sparkles size={16} color="var(--clay)" />
            {t('ourStory')} • Digital Inclusion for Rural India
          </div>

          <h1 style={{ fontSize: '2.8rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '20px', color: 'var(--sand)' }}>
            Bridging the Digital Divide with Offline-First Rural E-Commerce
          </h1>

          <p style={{ fontSize: '1.15rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.7, maxWidth: '750px', margin: '0 auto 30px' }}>
            RuralRoots was born out of a crucial mission: enabling 600 million+ rural citizens to access high-quality agricultural tools, authentic handcrafted heritage items, and daily essentials — regardless of network availability, literacy barriers, or delivery address constraints.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/shop" className="btn-primary" style={{ padding: '14px 28px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Explore Catalog <ArrowRight size={18} />
            </Link>
            <Link to="/artisans" className="btn-secondary" style={{ padding: '14px 28px', fontSize: '1rem', background: 'rgba(255,255,255,0.1)', color: '#FFF', border: '1px solid rgba(255,255,255,0.2)' }}>
              Meet Our Artisans
            </Link>
          </div>
        </div>
      </section>

      {/* IMPACT METRICS */}
      <section style={{ maxWidth: '1100px', margin: '-40px auto 60px', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          background: 'var(--white)',
          padding: '30px',
          borderRadius: '16px',
          boxShadow: '0 12px 36px rgba(44, 76, 56, 0.1)',
          border: '1px solid var(--line)'
        }}>
          {impactStats.map((stat, idx) => (
            <div key={idx} style={{ textAlign: 'center', padding: '10px' }}>
              <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--forest)', marginBottom: '4px' }}>
                {stat.number}
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '4px' }}>
                {stat.label}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--ink-soft)', lineHeight: 1.4 }}>
                {stat.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION & PILLARS */}
      <section style={{ maxWidth: '1100px', margin: '0 auto 80px', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--forest)', marginBottom: '12px' }}>
            Built for Extreme Rural Constraints
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--ink-soft)', maxWidth: '650px', margin: '0 auto' }}>
            Traditional e-commerce platforms break down in rural environments. Here is how RuralRoots solves the core operational challenges.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {pillars.map((p, idx) => (
            <div key={idx} style={{
              background: 'var(--white)',
              padding: '28px',
              borderRadius: '16px',
              border: '1px solid var(--line)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.04)'
            }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'var(--cream-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                {p.icon}
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '10px' }}>
                {p.title}
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ background: 'var(--cream-2)', padding: '60px 20px', marginBottom: '60px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--forest)' }}>
              Voices from the Village
            </h2>
            <p style={{ color: 'var(--ink-soft)', marginTop: '6px' }}>
              Hear how RuralRoots is transforming everyday commerce in local communities.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ background: 'var(--white)', padding: '24px', borderRadius: '14px', border: '1px solid var(--line)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                  <img src={t.image} alt={t.name} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--ink)' }}>{t.name}</h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--clay)', fontWeight: 600 }}>{t.role}</p>
                  </div>
                </div>
                <p style={{ fontSize: '0.92rem', color: 'var(--ink-soft)', fontStyle: 'italic', lineHeight: 1.6 }}>
                  "{t.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
