import { db, LocalProduct } from '../db';

const API_BASE = '/api/v1';

export async function fetchProducts(): Promise<LocalProduct[]> {
  try {
    const res = await fetch(`${API_BASE}/products`);
    if (res.ok) {
      const data = await res.json();
      // Cache products locally in Dexie IndexedDB
      await db.products.clear();
      const productsToStore: LocalProduct[] = data.map((p: any) => ({
        id: p.id,
        sku: p.sku,
        titleI18n: p.titleI18n,
        descriptionI18n: p.descriptionI18n,
        basePrice: p.basePrice,
        stockQuantity: p.stockQuantity,
        thumbnailUrl: p.thumbnailUrl,
        imagesJson: p.imagesJson,
        isActive: p.isActive
      }));
      await db.products.bulkPut(productsToStore);
      return productsToStore;
    }
  } catch (err) {
    console.warn('Network error fetching products, reading from Dexie IndexedDB local cache:', err);
  }

  // Fallback to local Dexie IndexedDB
  const cached = await db.products.toArray();
  if (cached.length > 0) {
    return cached;
  }

  // Mock static fallback catalog if completely fresh load without network
  return [
    {
      id: 1,
      sku: 'SEED-WHEAT-05',
      titleI18n: '{"en": "Hybrid Wheat Seeds (5kg)", "hi": "हाइब्रिड गेहूं का बीज (5 किलो)", "mr": "हायब्रिड गव्हाचे बियाणे (5 किलो)", "gu": "હાઇબ્રિડ ઘઉંનું બીજ (5 કિલો)"}',
      descriptionI18n: '{"en": "High yield organic wheat seeds", "hi": "सूखे मौसम के लिए उपयुक्त उच्च उपज वाला जैविक गेहूं बीज।"}',
      basePrice: 450.00,
      stockQuantity: 100,
      thumbnailUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&q=60',
      imagesJson: '[]',
      isActive: true
    },
    {
      id: 2,
      sku: 'FERT-NPK-10',
      titleI18n: '{"en": "Bio NPK Organic Fertilizer (10kg)", "hi": "बायो एनपीके जैविक खाद (10 किलो)", "mr": "बायो एनपीके सेंद्रिय खत (10 किलो)", "gu": "બાયો એનપીકે ઓર્ગેનિક ખાતર (10 કિલો)"}',
      descriptionI18n: '{"en": "Balanced organic soil nutrients", "hi": "सभी फसलों के लिए संतुलित जैविक एनपीके मृदा पोषक।"}',
      basePrice: 620.00,
      stockQuantity: 85,
      thumbnailUrl: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=300&q=60',
      imagesJson: '[]',
      isActive: true
    },
    {
      id: 3,
      sku: 'TOOL-SICKLE-01',
      titleI18n: '{"en": "Forged Steel Harvest Sickle", "hi": "मजबूत स्टील दरांती (हंसिया)", "mr": "मजबूत पोलादी विळा", "gu": "મજબૂત સ્ટીલ દાતરડું"}',
      descriptionI18n: '{"en": "Ergonomic harvesting tool", "hi": "फसल कटाई के लिए मजबूत और टिकाऊ दरांती।"}',
      basePrice: 180.00,
      stockQuantity: 50,
      thumbnailUrl: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=300&q=60',
      imagesJson: '[]',
      isActive: true
    },
    {
      id: 4,
      sku: 'SOLAR-LAMP-01',
      titleI18n: '{"en": "Rechargeable Solar LED Lantern", "hi": "सोलर एलईडी लालटेन (चार्जिंग)", "mr": "सौर एलईडी कंदील", "gu": "સોલર એડી ફાનસ"}',
      descriptionI18n: '{"en": "Dual USB phone charging lantern", "hi": "फोन चार्जिंग और 12 घंटे की रोशनी देने वाली सोलर लाइट।"}',
      basePrice: 850.00,
      stockQuantity: 40,
      thumbnailUrl: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=300&q=60',
      imagesJson: '[]',
      isActive: true
    }
  ];
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
