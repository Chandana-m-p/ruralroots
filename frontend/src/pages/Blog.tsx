import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BookOpen, Calendar, User, ArrowRight, Tag, Search, Sparkles, X, Check, Share2 } from 'lucide-react';
import { Footer } from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';

interface BlogPost {
  id: number;
  title: string;
  category: 'Logistics' | 'Artisans' | 'Agriculture' | 'Technology';
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
  tags: string[];
}

export const Blog: React.FC = () => {
  const { t } = useLanguage();
<<<<<<< HEAD

  return (
    <div>
      <div className="container" style={{ padding: '40px 0 60px' }}>
        <h2>{t('blogTitle')}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginTop: '24px' }}>
          <div className="artisan-card" style={{ padding: '20px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--clay)', fontWeight: '700' }}>{t('craftHeritageTag')}</span>
            <h3 style={{ marginTop: '8px' }}>{t('blogPost1Title')}</h3>
            <p style={{ color: 'var(--ink-soft)', fontSize: '0.9rem', marginTop: '8px' }}>{t('blogPost1Desc')}</p>
          </div>
          <div className="artisan-card" style={{ padding: '20px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--forest)', fontWeight: '700' }}>{t('villageLogisticsTag')}</span>
            <h3 style={{ marginTop: '8px' }}>{t('blogPost2Title')}</h3>
            <p style={{ color: 'var(--ink-soft)', fontSize: '0.9rem', marginTop: '8px' }}>{t('blogPost2Desc')}</p>
=======
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const posts: BlogPost[] = [
    {
      id: 1,
      title: "Solving the Last-Mile Address Problem in Rural India with Hub-and-Spoke Logistics",
      category: "Logistics",
      excerpt: "Why door-to-door delivery fails in non-addressed rural villages and how local Kirana Village Hubs created a 100% reliable Cash-on-Delivery handover model.",
      content: `In urban metros, e-commerce relies heavily on GPS coordinates, door numbers, and digital payments via UPI or credit cards. However, in rural Indian villages housing over 600 million people, physical street addresses are often non-existent.

A parcel sent to "Near Big Banyan Tree, Ramgarh Village" inevitably gets lost or delayed when third-party courier delivery agents attempt traditional doorstep delivery.

### The Village Hub Solution
RuralRoots re-engineered the logistics pipeline by implementing a Hub-and-Spoke distribution model. Instead of dispatching individual packages to unmapped houses:

1. **Consolidated Consignments:** All regional orders are grouped into bulk shipments sent to a single designated Village Hub Store (a trusted local Kirana or Panchayat center).
2. **Local SMS Alert:** Once the shipment arrives at the Village Hub, the buyer receives an automated SMS notification (or voice call).
3. **Cash-on-Delivery Inspection:** The buyer walks over to their local Village Hub, inspects the delivered goods, and pays cash directly to the Hub Manager.

This zero-friction workflow eliminates delivery failures while boosting local Kirana store footfall and commission income!`,
      author: "Vikram Sharma",
      date: "August 2, 2026",
      readTime: "5 min read",
      imageUrl: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80",
      tags: ["Logistics", "VillageHub", "COD", "RuralSupplyChain"]
    },
    {
      id: 2,
      title: "Preserving Ancient Handloom Heritage: From Kutch Weavers to Digital Buyers",
      category: "Artisans",
      excerpt: "Discover how authentic Kutchi Ajrakh block printers and terracotta potters gain direct access to national markets with transparent fair-trade pricing.",
      content: `Handicrafts form the cultural backbone of rural India, employing over 7 million skilled weavers and artisans. Yet for decades, middleman trader syndicates bought artisan crafts at fraction of their true value while inflating retail margins by up to 400%.

### Empowering Rural Craft Communities
By onboarding artisan cooperatives directly onto the RuralRoots platform:

- **Verified Authenticity:** Every product is tagged with the artisan's voice story, craft heritage, and origin district.
- **Fair-Trade Direct Earnings:** Artisans receive 85% of retail sale value directly into their local bank accounts, eliminating middleman cuts.
- **Offline Catalog Upload:** Hub managers assist non-smartphone artisans by photographing and indexing handcrafted items during weekly village visits.

Through this digital inclusion initiative, handloom weavers in Gujarat and Rajasthan have reported a 35% increase in annual household earnings.`,
      author: "Priya Sundaram",
      date: "July 28, 2026",
      readTime: "4 min read",
      imageUrl: "https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=800&q=80",
      tags: ["Artisans", "Handicrafts", "FairTrade", "KutchCrafts"]
    },
    {
      id: 3,
      title: "Offline-First Service Workers: Engineering Zero-Loss E-Commerce for Spotty 2G Networks",
      category: "Technology",
      excerpt: "A deep dive into Workbox 7.0 precaching, IndexedDB queue storage, and UUID idempotency keys designed to guarantee 0% order loss in extreme dead zones.",
      content: `In deep rural regions, network coverage is notoriously erratic. A farmer browsing products might lose 3G signal halfway through placing an order.

If an application relies purely on standard HTTP requests, network dropouts result in failed transactions, corrupted cart state, and frustrated users.

### The RuralRoots Offline Architecture
Our progressive web app (PWA) utilizes modern client-side storage to handle dead zones seamlessly:

- **Background Pre-caching:** Workbox 7.0 service workers cache critical UI components, product images, and regional translation dictionaries on first load.
- **IndexedDB Order Queue:** When an offline buyer clicks "Place Order", the transaction is assigned a cryptographically generated UUID idempotency key and stored in a Dexie IndexedDB pending queue.
- **Auto-Sync Engine:** As soon as the mobile device reconnects to a tower, the Service Worker triggers a background synchronization dispatch (POST /api/v1/orders/sync).

The backend Spring Boot server checks the UUID idempotency key to prevent double-charging or duplicate order creation, guaranteeing 100% reliability!`,
      author: "Amitabh Roy",
      date: "July 20, 2026",
      readTime: "6 min read",
      imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
      tags: ["PWA", "ServiceWorker", "IndexedDB", "OfflineFirst"]
    },
    {
      id: 4,
      title: "Organic Soil Regeneration & Direct Seed Access for Smallholder Farmers",
      category: "Agriculture",
      excerpt: "How direct access to verified organic bio-fertilizers and indigenous seed varieties is increasing crop yield while restoring soil vitality.",
      content: `Smallholder farmers owning less than 2 hectares of land face persistent challenges accessing genuine organic seeds and bio-pesticides. Counterfeit agricultural chemicals sold in unregulated local markets frequently ruin soil fertility.

### Sustainable Agri-Inputs
RuralRoots partners directly with agricultural university cooperatives and certified organic seed producers to list lab-tested inputs at wholesale prices:

- **Verified Quality Control:** Batch testing ensures 95%+ germination rate for seeds.
- **Voice Guide Application:** Native audio guides instruct farmers on natural compost ratio and organic pest deterrent preparation in local dialects.`,
      author: "Rajeshwar Patil",
      date: "July 12, 2026",
      readTime: "4 min read",
      imageUrl: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80",
      tags: ["Agriculture", "OrganicFarming", "SoilHealth", "FarmersFirst"]
    }
  ];

  const categories = ['All', 'Logistics', 'Artisans', 'Agriculture', 'Technology'];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* HEADER HERO */}
      <section style={{
        background: 'linear-gradient(135deg, var(--forest) 0%, #1A3624 100%)',
        color: 'var(--white)',
        padding: '60px 20px 70px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '0.85rem',
            color: 'var(--sand)',
            fontWeight: 600,
            marginBottom: '16px'
          }}>
            <BookOpen size={16} color="var(--clay)" />
            {t('blog')} • Stories, Insights & Field Notes
          </div>

          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--sand)', marginBottom: '16px' }}>
            RuralRoots Journal & Field Reports
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.6 }}>
            Explore deep dives into rural tech inclusion, artisan craft preservation, offline logistics engineering, and farmer stories from across rural India.
          </p>
        </div>
      </section>

      {/* SEARCH & CATEGORIES BAR */}
      <section style={{ maxWidth: '1100px', margin: '-30px auto 40px', padding: '0 20px', width: '100%', boxSizing: 'border-box' }}>
        <div style={{
          background: 'var(--white)',
          padding: '18px 24px',
          borderRadius: '16px',
          boxShadow: '0 8px 24px rgba(44, 76, 56, 0.08)',
          border: '1px solid var(--line)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          {/* CATEGORY PILLS */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  border: selectedCategory === cat ? 'none' : '1px solid var(--line)',
                  background: selectedCategory === cat ? 'var(--forest)' : 'var(--cream-2)',
                  color: selectedCategory === cat ? 'var(--white)' : 'var(--ink-soft)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* SEARCH INPUT */}
          <div style={{ position: 'relative', width: '260px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-soft)' }} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                borderRadius: '20px',
                border: '1px solid var(--line)',
                fontSize: '0.88rem',
                outline: 'none',
                background: 'var(--cream)'
              }}
            />
>>>>>>> bb47bee993ff0ce233311e7ca24db9ee4b2afd2e
          </div>
        </div>
      </section>

      {/* POSTS GRID */}
      <section style={{ maxWidth: '1100px', margin: '0 auto 60px', padding: '0 20px', flex: 1, width: '100%', boxSizing: 'border-box' }}>
        {filteredPosts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--white)', borderRadius: '16px', border: '1px solid var(--line)' }}>
            <BookOpen size={48} color="var(--clay)" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--ink)' }}>No articles found</h3>
            <p style={{ color: 'var(--ink-soft)', fontSize: '0.9rem', marginTop: '6px' }}>Try searching for another keyword or selecting a different category.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
            {filteredPosts.map(post => (
              <article
                key={post.id}
                onClick={() => setActiveArticle(post)}
                style={{
                  background: 'var(--white)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid var(--line)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease, boxShadow 0.2s ease'
                }}
              >
                <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    background: 'var(--forest)',
                    color: 'var(--white)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '4px 12px',
                    borderRadius: '20px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {post.category}
                  </span>
                </div>

                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.8rem', color: 'var(--ink-soft)', marginBottom: '12px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={14} /> {post.date}
                    </span>
                    •
                    <span>{post.readTime}</span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.4, marginBottom: '10px' }}>
                    {post.title}
                  </h3>

                  <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: '20px', flex: 1 }}>
                    {post.excerpt}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: '1px solid var(--line)' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--clay)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <User size={14} /> {post.author}
                    </span>

                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--forest)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      Read Article <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* ARTICLE READER MODAL */}
      {activeArticle && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px'
        }} onClick={() => setActiveArticle(null)}>
          <div style={{
            background: 'var(--white)',
            maxWidth: '750px',
            maxHeight: '90vh',
            width: '100%',
            borderRadius: '20px',
            overflowY: 'auto',
            padding: '36px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            position: 'relative'
          }} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActiveArticle(null)}
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
                cursor: 'pointer'
              }}
            >
              <X size={20} color="var(--ink)" />
            </button>

            <span style={{
              background: 'var(--cream-2)',
              color: 'var(--forest)',
              fontSize: '0.8rem',
              fontWeight: 700,
              padding: '6px 14px',
              borderRadius: '20px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {activeArticle.category}
            </span>

            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--ink)', marginTop: '16px', marginBottom: '14px', lineHeight: 1.3 }}>
              {activeArticle.title}
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.85rem', color: 'var(--ink-soft)', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--line)' }}>
              <span>By <strong>{activeArticle.author}</strong></span>
              •
              <span>{activeArticle.date}</span>
              •
              <span>{activeArticle.readTime}</span>
            </div>

            <img
              src={activeArticle.imageUrl}
              alt={activeArticle.title}
              style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '12px', marginBottom: '24px' }}
            />

            <div style={{ fontSize: '1rem', color: 'var(--ink)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
              {activeArticle.content}
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '30px', flexWrap: 'wrap' }}>
              {activeArticle.tags.map(t => (
                <span key={t} style={{ background: 'var(--cream)', color: 'var(--clay)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 600 }}>
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* NEWSLETTER SUBSCRIPTION */}
      <section style={{ background: 'var(--cream-2)', padding: '60px 20px', borderTop: '1px solid var(--line)' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <Sparkles size={32} color="var(--forest)" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--forest)', marginBottom: '8px' }}>
            Subscribe to RuralRoots Field Reports
          </h3>
          <p style={{ fontSize: '0.92rem', color: 'var(--ink-soft)', marginBottom: '20px' }}>
            Get monthly updates on rural e-commerce tech, artisan spotlights, and agricultural innovations delivered to your inbox.
          </p>

          {subscribed ? (
            <div style={{ background: '#D1FAE5', color: '#065F46', padding: '14px', borderRadius: '10px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Check size={20} /> Thank you for subscribing to our newsletter!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '10px', maxWidth: '450px', margin: '0 auto' }}>
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1px solid var(--line)',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
              <button type="submit" className="btn-primary" style={{ padding: '12px 20px', fontSize: '0.92rem', borderRadius: '10px' }}>
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};
