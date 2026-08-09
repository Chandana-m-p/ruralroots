import { db, LocalProduct } from '../db';
import productService from './productService';
import hubService from './hubService';

const API_BASE = '/api/v1';

export const FALLBACK_PRODUCTS: LocalProduct[] = [
  {
    id: 1,
    sku: 'ART-VASE-01',
    category: 'pottery',
    titleI18n: '{"en": "Handpainted Terracotta Vase", "hi": "हाथ से चित्रित टेराकोटा फूलदान", "mr": "हातने रंगवलेले मातीचे भांडे", "gu": "હાથથી ચીતરેલું ટેરાકોટા ફ્લાવરવાઝ"}',
    descriptionI18n: '{"en": "Handcrafted terracotta vase painted with traditional tribal motifs by artisans in Rajasthan.", "hi": "राजस्थान के कारीगरों द्वारा पारंपरिक जनजातीय रूपांकनों के साथ चित्रित हस्तनिर्मित टेराकोटा फूलदान।"}',
    basePrice: 899.00,
    stockQuantity: 45,
    thumbnailUrl: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&q=80',
    imagesJson: '["https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80"]',
    isActive: true
  },
  {
    id: 2,
    sku: 'ART-BASKET-01',
    category: 'baskets',
    titleI18n: '{"en": "Handwoven Sabai Grass Basket", "hi": "हाथ से बुनी सबाई घास की टोकरी", "mr": "हातने विणलेली सबाई गवताची टोपली", "gu": "હાથથી વણેલી સબાઈ ઘાસની ટોપલી"}',
    descriptionI18n: '{"en": "Eco-friendly storage basket handwoven from natural Sabai grass fibers by women artisans.", "hi": "महिला कारीगरों द्वारा प्राकृतिक सबाई घास के रेशों से हाथ से बुनी गई पर्यावरण-अनुकूल टोकरी।"}',
    basePrice: 699.00,
    stockQuantity: 60,
    thumbnailUrl: 'https://images.unsplash.com/photo-1622560481156-01ac25e4c0ac?w=400&q=80',
    imagesJson: '["https://images.unsplash.com/photo-1622560481156-01ac25e4c0ac?w=800&q=80"]',
    isActive: true
  },
  {
    id: 3,
    sku: 'ART-JEWELRY-01',
    category: 'jewelry',
    titleI18n: '{"en": "Beaded Tribal Drop Earrings", "hi": "मनके वाले जनजातीय झुमके", "mr": "मण्यांचे आदिवासी कानातले", "gu": "મોતીના આદિવાસી ઝુમખા"}',
    descriptionI18n: '{"en": "Vibrant beaded drop earrings handmade using recycled glass beads and natural thread.", "hi": "पुनर्चक्रित कांच के मनकों और प्राकृतिक धागे का उपयोग करके हस्तनिर्मित ज्वलंत झुमके।"}',
    basePrice: 450.00,
    stockQuantity: 80,
    thumbnailUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80',
    imagesJson: '["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80"]',
    isActive: true
  },
  {
    id: 4,
    sku: 'ART-WOOD-01',
    category: 'wood',
    titleI18n: '{"en": "Carved Sheesham Wooden Jewelry Box", "hi": "नक्काशीदार शीशम की लकड़ी का आभूषण डिब्बा", "mr": "कोरलेले शीशम लाकडी दागिण्यांचे बॉक्स", "gu": "કોતરણીવાળું શીશમ લાકડાનું દાગીના બોક્સ"}',
    descriptionI18n: '{"en": "Intricately carved wooden box made from sustainably sourced solid Sheesham wood.", "hi": "टिकाऊ शीशम की लकड़ी से बना जटिल नक्काशीदार लकड़ी का डिब्बा।"}',
    basePrice: 1150.00,
    stockQuantity: 30,
    thumbnailUrl: 'https://images.unsplash.com/photo-1611486212557-88be5ff6f941?w=400&q=80',
    imagesJson: '["https://images.unsplash.com/photo-1611486212557-88be5ff6f941?w=800&q=80"]',
    isActive: true
  },
  {
    id: 5,
    sku: 'ART-STOLE-01',
    category: 'decor',
    titleI18n: '{"en": "Handwoven Organic Cotton Stole", "hi": "हाथ से बुना ऑर्गेनिक कॉटन स्टोल", "mr": "हातने विणलेली सेंद्रिय सुती शाल", "gu": "હાથથી વણેલું ઓર્ગેનિક કોટન સ્ટોલ"}',
    descriptionI18n: '{"en": "Lightweight breathable stole woven on traditional pit looms using natural vegetable dyes.", "hi": "प्राकृतिक वनस्पति रंगों का उपयोग करके पारंपरिक खड्ड करघे पर बुना गया हल्का शॉल।"}',
    basePrice: 1299.00,
    stockQuantity: 40,
    thumbnailUrl: 'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=400&q=80',
    imagesJson: '["https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=800&q=80"]',
    isActive: true
  },
  {
    id: 6,
    sku: 'ART-BOWL-01',
    category: 'pottery',
    titleI18n: '{"en": "Handcrafted Unglazed Clay Bowl Set", "hi": "हस्तनिर्मित बिना पॉलिश वाली मिट्टी का कटोरा सेट", "mr": "हातने बनवलेला अनग्लेज्ड मातीचा वाडगा सेट", "gu": "હાથથી બનાવેલ માટીના વાટકા નો સેટ"}',
    descriptionI18n: '{"en": "Traditional unglazed terracotta serving bowls that preserve authentic flavor and minerals.", "hi": "पारंपरिक बिना पॉलिश वाले टेराकोटा परोसने के कटोरे जो प्रामाणिक स्वाद बनाए रखते हैं।"}',
    basePrice: 549.00,
    stockQuantity: 50,
    thumbnailUrl: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&q=80',
    imagesJson: '["https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80"]',
    isActive: true
  },
  {
    id: 7,
    sku: 'ART-BAMBOO-01',
    category: 'bamboo',
    titleI18n: '{"en": "Handmade Bamboo Serving Tray", "hi": "हस्तनिर्मित बांस परोसने की ट्रे", "mr": "हातने बनवलेले बांबूचे ट्रे", "gu": "હાથથી બનાવેલી વાંસની પીરસવાની ટ્રે"}',
    descriptionI18n: '{"en": "Durable bamboo tray crafted by master weavers in Assam, finished with organic beeswax.", "hi": "असम में मास्टर बुनकरों द्वारा तैयार की गई टिकाऊ बांस की ट्रे, जैविक मोम से परिष्कृत।"}',
    basePrice: 399.00,
    stockQuantity: 75,
    thumbnailUrl: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=400&q=80',
    imagesJson: '["https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=800&q=80"]',
    isActive: true
  },
  {
    id: 8,
    sku: 'ART-CUSHION-01',
    category: 'decor',
    titleI18n: '{"en": "Hand Block-Printed Cotton Cushion Cover", "hi": "हाथ से ब्लॉक-प्रिंटेड कॉटन कुशन कवर", "mr": "हातने ब्लॉक-प्रिंट केलेले सुती उशीचे कव्हर", "gu": "હાથથી બ્લોક-પ્રિન્ટેડ કોટન કુશન કવર"}',
    descriptionI18n: '{"en": "Pure cotton cushion cover block-printed by traditional master artisans using natural indigo.", "hi": "प्राकृतिक नील का उपयोग करके पारंपरिक कारीगरों द्वारा ब्लॉक-प्रिंट किया गया शुद्ध सूती कुशन कवर।"}',
    basePrice: 399.00,
    stockQuantity: 65,
    thumbnailUrl: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&q=80',
    imagesJson: '["https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80"]',
    isActive: true
  },
  {
    id: 9,
    sku: 'ART-PAINTING-01',
    category: 'decor',
    titleI18n: '{"en": "Handpainted Madhubani Folk Art Canvas", "hi": "हाथ से चित्रित मधुबनी लोक कला कैनवास", "mr": "हातने रंगवलेले मधुबनी लोककला कॅनव्हास", "gu": "હાથથી ચીતરેલું મધુબની લોકકળા કેનવાસ"}',
    descriptionI18n: '{"en": "Authentic Madhubani painting painted on handmade canvas by Mithila women artisans.", "hi": "मिथिला की महिला कारीगरों द्वारा हस्तनिर्मित कैनवास पर बनाई गई प्रामाणिक मधुबनी पेंटिंग।"}',
    basePrice: 1499.00,
    stockQuantity: 25,
    thumbnailUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=400&q=80',
    imagesJson: '["https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&q=80"]',
    isActive: true
  },
  {
    id: 10,
    sku: 'ART-TEA-01',
    category: 'pottery',
    titleI18n: '{"en": "Jaipur Blue Pottery Ceramic Tea Set", "hi": "जयपुर ब्लू पॉटरी सिरेमिक टी सेट", "mr": "जयपूर ब्लू पॉटरी सिरॅमिक टी सेट", "gu": "જયપુર બ્લુ પોટરી સિરામિક ટી સેટ"}',
    descriptionI18n: '{"en": "Exquisite 6-piece glazed blue pottery tea set handcrafted using quartz stone in Jaipur.", "hi": "जयपुर में क्वार्ट्ज पत्थर का उपयोग करके हस्तनिर्मित उत्कृष्ट 6-पीस ब्लू पॉटरी टी सेट।"}',
    basePrice: 1850.00,
    stockQuantity: 20,
    thumbnailUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80',
    imagesJson: '["https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80"]',
    isActive: true
  },
  {
    id: 11,
    sku: 'ART-BRASS-01',
    category: 'decor',
    titleI18n: '{"en": "Bastar Brass Dhokra Tribal Elephant Craft", "hi": "बस्तर पीतल ढोकरा जनजातीय हाथी शिल्प", "mr": "बस्तर पितळ ढोकरा आदिवासी हत्ती कलाकृती", "gu": "બસ્તર પિત્તળ ઢોકરા આદિવાસી હાથી ક્રાફ્ટ"}',
    descriptionI18n: '{"en": "Ancient lost-wax cast brass elephant figurine handcrafted by Dhokra metal artisans of Chhattisgarh.", "hi": "छत्तीसगढ़ के ढोकरा धातु कारीगरों द्वारा हस्तनिर्मित पीतल का हाथी।"}',
    basePrice: 1650.00,
    stockQuantity: 15,
    thumbnailUrl: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&q=80',
    imagesJson: '["https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&q=80"]',
    isActive: true
  },
  {
    id: 12,
    sku: 'ART-JUTTI-01',
    category: 'jewelry',
    titleI18n: '{"en": "Handcrafted Embroidered Leather Mojari", "hi": "हस्तनिर्मित कढ़ाईदार चमड़े की मोजरी", "mr": "हातने बनवलेली नक्षीदार कातडी मोजडी", "gu": "હાથથી બનાવેલી એમ્બ્રોયડરી વાળી ચામડાની મોજડી"}',
    descriptionI18n: '{"en": "Traditional Rajasthani ethnic leather jutti embroidered with silk threads and mirrors.", "hi": "रेशम के धागों और शीशों से कढ़ी हुई पारंपरिक राजस्थानी एथनिक लेदर जूती।"}',
    basePrice: 999.00,
    stockQuantity: 35,
    thumbnailUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80',
    imagesJson: '["https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80"]',
    isActive: true
  },
  {
    id: 13,
    sku: 'ART-TOYS-01',
    category: 'wood',
    titleI18n: '{"en": "Channapatna Eco Wooden Stacking Toys", "hi": "चन्नापटना इको वुडन स्टैकिंग खिलौने", "mr": "चन्नापटना इको लाकडी खेळणी", "gu": "ચન્નપટના ઈકો વૂડન રમકડાં"}',
    descriptionI18n: '{"en": "Non-toxic lac-turnery wooden toys crafted with natural vegetable dyes in Karnataka.", "hi": "कर्नाटक में प्राकृतिक वनस्पति रंगों से तैयार किए गए गैर-विषैले लकड़ी के खिलौने।"}',
    basePrice: 650.00,
    stockQuantity: 55,
    thumbnailUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&q=80',
    imagesJson: '["https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&q=80"]',
    isActive: true
  },
  {
    id: 14,
    sku: 'ART-SCROLL-01',
    category: 'decor',
    titleI18n: '{"en": "Odisha Pattachitra Palm Leaf Scroll", "hi": "ओडिशा पट्टचित्र ताड़ के पत्ते की स्क्रॉल चित्रकारी", "mr": "ओडिशा पट्टचित्र ताडाच्या पानांचे स्क्रोल चित्र", "gu": "ઓડિશા પટ્ટાચિત્ર તાળના પાંદડાની સ્ક્ર્રોલ ચિત્રકળા"}',
    descriptionI18n: '{"en": "Intricate mythology story carved and painted on seasoned palm leaves by Raghurajpur artisans.", "hi": "रघुराजपुर के कारीगरों द्वारा ताड़ के पत्तों पर उकेरी गई और चित्रित की गई पौराणिक कहानी।"}',
    basePrice: 2100.00,
    stockQuantity: 10,
    thumbnailUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400&q=80',
    imagesJson: '["https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&q=80"]',
    isActive: true
  }
];

export function getProductCategory(p: LocalProduct): string {
  if (p.category && p.category.trim() !== '') return p.category.toLowerCase();
  const sku = (p.sku || '').toUpperCase();
  const title = (p.titleI18n || '').toLowerCase();
  
  if (sku.includes('VASE') || sku.includes('BOWL') || sku.includes('POT') || title.includes('pottery') || title.includes('terracotta') || title.includes('clay') || title.includes('फूलदान') || title.includes('कटोरा')) return 'pottery';
  if (sku.includes('BASKET') || title.includes('basket') || title.includes('grass') || title.includes('टोकरी') || title.includes('सबाई')) return 'baskets';
  if (sku.includes('JEWELRY') || sku.includes('EARRING') || title.includes('jewelry') || title.includes('earring') || title.includes('झुमके') || title.includes('आभूषण')) return 'jewelry';
  if (sku.includes('WOOD') || title.includes('wood') || title.includes('sheesham') || title.includes('लकड़ी')) return 'wood';
  if (sku.includes('BAMBOO') || title.includes('bamboo') || title.includes('बांस') || title.includes('tray')) return 'bamboo';
  if (sku.includes('STOLE') || sku.includes('CUSHION') || title.includes('stole') || title.includes('cushion') || title.includes('decor') || title.includes('शॉल') || title.includes('कवर')) return 'decor';
  return 'pottery';
}

export async function fetchProducts(): Promise<LocalProduct[]> {
  return await productService.getAllProducts();
}

export async function fetchHubs() {
  return await hubService.getAllHubs();
}

export async function fetchMyOrders(token: string) {
  try {
    const res = await fetch(`${API_BASE}/orders/my-orders`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Network error fetching orders from database:', err);
  }
  return null;
}

export async function cancelOrderApi(orderId: number, reason: string, token?: string) {
  try {
    const res = await fetch(`${API_BASE}/orders/${orderId}/cancel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ reason })
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Network error cancelling order:', err);
  }
  return null;
}
