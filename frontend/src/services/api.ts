import { db, LocalProduct } from '../db';

const API_BASE = '/api/v1';

export const FALLBACK_PRODUCTS: LocalProduct[] = [
  {
    id: 1,
    sku: 'ART-VASE-01',
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
    titleI18n: '{"en": "Hand Block-Printed Cotton Cushion Cover", "hi": "हाथ से ब्लॉक-प्रिंटेड कॉटन कुशन कवर", "mr": "हातने ब्लॉक-प्रिंट केलेले सुती उशीचे कव्हर", "gu": "હાથથી બ્લોક-પ્રિન્ટેડ કોટન કુશન કવર"}',
    descriptionI18n: '{"en": "Pure cotton cushion cover block-printed by traditional master artisans using natural indigo.", "hi": "प्राकृतिक नील का उपयोग करके पारंपरिक कारीगरों द्वारा ब्लॉक-प्रिंट किया गया शुद्ध सूती कुशन कवर।"}',
    basePrice: 399.00,
    stockQuantity: 65,
    thumbnailUrl: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&q=80',
    imagesJson: '["https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80"]',
    isActive: true
  }
];

export async function fetchProducts(): Promise<LocalProduct[]> {
  try {
    const res = await fetch(`${API_BASE}/products`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        await db.products.clear();
        const productsToStore: LocalProduct[] = data.map((p: any) => ({
          id: p.id,
          sku: p.sku,
          titleI18n: typeof p.titleI18n === 'object' ? JSON.stringify(p.titleI18n) : p.titleI18n,
          descriptionI18n: typeof p.descriptionI18n === 'object' ? JSON.stringify(p.descriptionI18n) : p.descriptionI18n,
          basePrice: p.basePrice,
          stockQuantity: p.stockQuantity,
          thumbnailUrl: p.thumbnailUrl,
          imagesJson: typeof p.imagesJson === 'object' ? JSON.stringify(p.imagesJson) : (p.imagesJson || '[]'),
          isActive: p.isActive
        }));
        await db.products.bulkPut(productsToStore);
        return productsToStore;
      }
    }
  } catch (err) {
    console.warn('Network error fetching products, reading from Dexie IndexedDB local cache:', err);
  }

  // Fallback to local Dexie IndexedDB
  const cached = await db.products.toArray();
  if (cached.length > 0) {
    return cached;
  }

  // Cache fallback products into Dexie IndexedDB if DB is empty
  await db.products.bulkPut(FALLBACK_PRODUCTS);
  return FALLBACK_PRODUCTS;
}

export async function fetchHubs() {
  try {
    const res = await fetch(`${API_BASE}/hubs`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Network error fetching hubs, using cached fallback');
  }

  return [
    {
      id: 1,
      hubCode: 'HUB-RAMGARH-01',
      hubName: 'Ramgarh Central Kendra (Kalyan Store)',
      pincode: '452001',
      villageName: 'Ramgarh',
      district: 'Indore',
      state: 'Madhya Pradesh',
      landmark: 'Near Panchayat Bhawan',
      operatesCod: true
    },
    {
      id: 2,
      hubCode: 'HUB-CHANDAN-02',
      hubName: 'Chandanpur Rural Hub (Gupta General)',
      pincode: '452002',
      villageName: 'Chandanpur',
      district: 'Indore',
      state: 'Madhya Pradesh',
      landmark: 'Opposite Bus Stand',
      operatesCod: true
    }
  ];
}
