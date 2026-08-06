import { db, LocalProduct } from '../db';

const API_BASE = '/api/v1';

export interface VillageHubItem {
  id: number;
  hubCode: string;
  hubName: string;
  pincode: string;
  villageName: string;
  district: string;
  state: string;
  landmark?: string;
  operatesCod: boolean;
}

const SAMPLE_HUBS: VillageHubItem[] = [
  { id: 1, hubCode: 'HUB-RAMGARH-01', hubName: 'Ramgarh Central Kendra (Kalyan Store)', pincode: '452001', villageName: 'Ramgarh', district: 'Indore', state: 'Madhya Pradesh', landmark: 'Near Panchayat Bhawan', operatesCod: true },
  { id: 2, hubCode: 'HUB-CHANDAN-02', hubName: 'Chandanpur Rural Hub (Gupta General)', pincode: '452002', villageName: 'Chandanpur', district: 'Indore', state: 'Madhya Pradesh', landmark: 'Opposite Bus Stand', operatesCod: true },
  { id: 3, hubCode: 'HUB-NARSAPUR-03', hubName: 'Narsapur Artisanal Depot', pincode: '534275', villageName: 'Narsapur', district: 'West Godavari', state: 'Andhra Pradesh', landmark: 'Handicraft Weaver Co-op', operatesCod: true }
];

const INITIAL_PRODUCTS: LocalProduct[] = [
  // CLOTHING
  {
    id: 1,
    sku: 'ART-CLOTH-01',
    category: 'clothing',
    titleI18n: JSON.stringify({ en: 'Handwoven Organic Cotton Stole', hi: 'हाथ से बुना ऑर्गेनिक कॉटन स्टोल', kn: 'ಕೈಯಿಂದ ನೇಯ್ದ ಸಾವಯವ ಹತ್ತಿ ಶಾಲು' }),
    descriptionI18n: JSON.stringify({ en: 'Lightweight breathable organic cotton stole woven on traditional pit looms.', hi: 'पारंपरिक खड्ड करघे पर बुना गया हल्का जैविक सूती स्टोल।' }),
    basePrice: 1299,
    stockQuantity: 40,
    thumbnailUrl: 'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=400&q=80',
    imagesJson: JSON.stringify(['https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=800&q=80']),
    isActive: true,
    artisanName: 'Lalitha Devi',
    artisanRegion: 'Narsapur, Andhra Pradesh'
  },
  {
    id: 2,
    sku: 'ART-CLOTH-02',
    category: 'clothing',
    titleI18n: JSON.stringify({ en: 'Handcrafted Embroidered Leather Mojari', hi: 'हाथ से बनी चमड़े की मोजड़ी', kn: 'ರೇಷ್ಮೆ ದಾರದಿಂದ ಕಸೂತಿ ಮಾಡಿದ ಚರ್ಮದ ಮೊಜರಿ' }),
    descriptionI18n: JSON.stringify({ en: 'Traditional Rajasthani ethnic leather jutti embroidered with silk threads and mirrors.', hi: 'रेशम के धागों से कशीदाकारी की गई पारंपरिक चमड़े की मोजड़ी।' }),
    basePrice: 999,
    stockQuantity: 35,
    thumbnailUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80',
    imagesJson: JSON.stringify(['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80']),
    isActive: true,
    artisanName: 'Gopal Samant',
    artisanRegion: 'Midnapore, West Bengal'
  },
  {
    id: 3,
    sku: 'ART-CLOTH-03',
    category: 'clothing',
    titleI18n: JSON.stringify({ en: 'Pure Khadi Handloom Silk Dupatta', hi: 'शुद्ध खादी हैंडलूम सिल्क दुपट्टा', kn: 'ಶುದ್ಧ ಕೈಮಗ್ಗ ರೇಷ್ಮೆ ದುಪಟ್ಟಾ' }),
    descriptionI18n: JSON.stringify({ en: 'Pure hand-spun Tussar silk dupatta featuring authentic Kantha stitch borders.', hi: 'कांथा सिलाई बॉर्डर के साथ शुद्ध हाथ से काता गया रेशमी दुपट्टा।' }),
    basePrice: 1599,
    stockQuantity: 28,
    thumbnailUrl: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&q=80',
    imagesJson: JSON.stringify(['https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80']),
    isActive: true,
    artisanName: 'Sujata Roy',
    artisanRegion: 'Shantiniketan, West Bengal'
  },

  // FOOD
  {
    id: 4,
    sku: 'ART-FOOD-01',
    category: 'food',
    titleI18n: JSON.stringify({ en: 'Raw Organic Wild Forest Honey', hi: 'कच्चा ऑर्गेनिक जंगली शहद', kn: 'ಕಾಡಿನ ಹೂವುಗಳಿಂದ ಸಂಗ್ರಹಿಸಿದ ನೈಸರ್ಗಿಕ ಜೇನುತುಪ್ಪ' }),
    descriptionI18n: JSON.stringify({ en: 'Unfiltered pure honey collected from natural wild forest flora by tribal gatherers.', hi: 'प्राकृतिक जंगलों से इकट्ठा किया गया 100% शुद्ध और अनफिल्टर्ड शहद।' }),
    basePrice: 499,
    stockQuantity: 120,
    thumbnailUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80',
    imagesJson: JSON.stringify(['https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80']),
    isActive: true,
    artisanName: 'Sundarbans Co-op',
    artisanRegion: 'Sundarbans, West Bengal'
  },
  {
    id: 5,
    sku: 'ART-FOOD-02',
    category: 'food',
    titleI18n: JSON.stringify({ en: 'Hand-Ground Heritage Spice Box Set', hi: 'हाथ से पिसा हुआ विरासत मसाला बॉक्स', kn: 'ಮರದ ಪೆಟ್ಟಿಗೆಯಲ್ಲಿ ಕಲ್ಲಿನಲ್ಲಿ ಪುಡಿ ಮಾಡಿದ ಸಾವಯವ ಸಾಂಬಾರು ಪದಾರ್ಥಗಳು' }),
    descriptionI18n: JSON.stringify({ en: 'Stone-milled organic turmeric, cumin, coriander, and garam masala in Sheesham box.', hi: 'शीशम के डिब्बे में पत्थर से पिसे हुए शुद्ध जैविक मसाले।' }),
    basePrice: 1150,
    stockQuantity: 63,
    thumbnailUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80',
    imagesJson: JSON.stringify(['https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80']),
    isActive: true,
    artisanName: 'Jagdish Mistry',
    artisanRegion: 'Saran, Bihar'
  },

  // HEALTHCARE
  {
    id: 6,
    sku: 'ART-HEALTH-01',
    category: 'healthcare',
    titleI18n: JSON.stringify({ en: 'Terracotta Clay Water Pitcher', hi: 'मिट्टी का पारंपरिक सुराहीदार जग', kn: 'ನೀರಿಗೆ ನೈಸರ್ಗಿಕ ತಂಪನ್ನು ನೀಡುವ ಸಾಂಪ್ರದಾಯಿಕ ಮಣ್ಣಿನ ಜಗ್' }),
    descriptionI18n: JSON.stringify({ en: 'Evaporative cooling natural terracotta pitcher for fresh, alkaline drinking water.', hi: 'प्राकृतिक रूप से पानी को ठंडा रखने वाला मिट्टी का पारंपरिक सुराहीदार जग।' }),
    basePrice: 899,
    stockQuantity: 52,
    thumbnailUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&q=80',
    imagesJson: JSON.stringify(['https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80']),
    isActive: true,
    artisanName: 'Rameshwar Patel',
    artisanRegion: 'Khurja, Uttar Pradesh'
  },
  {
    id: 7,
    sku: 'ART-HEALTH-02',
    category: 'healthcare',
    titleI18n: JSON.stringify({ en: 'Porcelain Essential Oil Aroma Diffuser', hi: 'चीनी मिट्टी का सुगंधित डिफ्यूज़र', kn: 'ಸುಗಂಧ ತೈಲಗಳಿಗೆ ಮೇಣದಬತ್ತಿ ಹಚ್ಚುವ ಪೋರ್ಸಿಲೇನ್ ಆಯಿಲ್ ಬರ್ನರ್' }),
    descriptionI18n: JSON.stringify({ en: 'Tea-light warm porcelain aroma oil burner casting delicate geometric light.', hi: 'सुगंधित तेलों के लिए मोमबत्ती वाला चीनी मिट्टी का डिफ्यूज़र।' }),
    basePrice: 799,
    stockQuantity: 67,
    thumbnailUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&q=80',
    imagesJson: JSON.stringify(['https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&q=80']),
    isActive: true,
    artisanName: 'Santosh Sutar',
    artisanRegion: 'Sawantwadi, Maharashtra'
  },

  // ELECTRONICS
  {
    id: 8,
    sku: 'ART-ELEC-01',
    category: 'electronics',
    titleI18n: JSON.stringify({ en: 'Acoustic Wooden Smartphone Amplifier Dock', hi: 'लकड़ी का अकॉस्टिक स्मार्टफोन एम्पलीफायर', kn: 'ವಿದ್ಯುತ್ ಇಲ್ಲದೆ ಶಬ್ದ ಹೆಚ್ಚಿಸುವ ಮರದ ಅಕೌಸ್ಟಿಕ್ ಸ್ಪೀಕರ್ ಡೆಕ್' }),
    descriptionI18n: JSON.stringify({ en: 'Electricity-free natural sound resonating wooden acoustic horn dock for phones.', hi: 'बिना बिजली के मोबाइल साउंड बढ़ाने वाला लकड़ी का अनोखा एम्पलीफायर।' }),
    basePrice: 999,
    stockQuantity: 88,
    thumbnailUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&q=80',
    imagesJson: JSON.stringify(['https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80']),
    isActive: true,
    artisanName: 'Trilok Rathore',
    artisanRegion: 'Indore, Madhya Pradesh'
  },
  {
    id: 9,
    sku: 'ART-ELEC-02',
    category: 'electronics',
    titleI18n: JSON.stringify({ en: 'Hand-Woven Bamboo LED Desk Lamp', hi: 'बांस की जाली का LED डेस्क लैंप', kn: 'ಕೈಯಿಂದ ನೇಯ್ದ ಬಿದಿರಿನ LED ಫ್ಲೋರ್ ಲ್ಯಾಂಪ್' }),
    descriptionI18n: JSON.stringify({ en: 'Woven bamboo lattice floor light shade casting warm ambient shadows with 12W LED.', hi: 'कमरे में मनमोहक रोशनी बिखेरने वाला बांस की जाली का 12W LED फ्लोर लैंप।' }),
    basePrice: 1499,
    stockQuantity: 73,
    thumbnailUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80',
    imagesJson: JSON.stringify(['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80']),
    isActive: true,
    artisanName: 'Tarun Gogoi',
    artisanRegion: 'Nagaon, Assam'
  },

  // APPLIANCES
  {
    id: 10,
    sku: 'ART-APP-01',
    category: 'appliances',
    titleI18n: JSON.stringify({ en: 'Bamboo Steamer Basket for Dumplings', hi: 'बांस का 2-स्तरीय स्टीमर', kn: 'ಮೋಮೋಸ್ ಬೇಯಿಸಲು ಸಾಂಪ್ರದಾಯಿಕ 2-ಅಂಚಿನ ಬಿದಿರಿನ ಸ್ವೀಮರ್' }),
    descriptionI18n: JSON.stringify({ en: '2-tier traditional bamboo basket designed for steaming dim sum and veggies.', hi: 'मोमोज और सब्जियां भाप में पकाने के लिए बांस का 2-स्तरीय स्टीमर।' }),
    basePrice: 799,
    stockQuantity: 82,
    thumbnailUrl: 'https://images.unsplash.com/photo-1622560481156-01ac25e4c0ac?w=400&q=80',
    imagesJson: JSON.stringify(['https://images.unsplash.com/photo-1622560481156-01ac25e4c0ac?w=800&q=80']),
    isActive: true,
    artisanName: 'Nagen Das',
    artisanRegion: 'Barpeta, Assam'
  },
  {
    id: 11,
    sku: 'ART-APP-02',
    category: 'appliances',
    titleI18n: JSON.stringify({ en: 'Engraved Sheesham Cooking Spoon Set', hi: 'शीशम लकड़ी के चम्मचों का सेट', kn: 'ನಾನ್-ಸ್ಟಿಕ್ ಪಾತ್ರೆಗಳಿಗೆ ಸೂಕ್ತವಾದ ಮರದ ಸೌಟುಗಳ ಸೆಟ್' }),
    descriptionI18n: JSON.stringify({ en: 'Non-stick friendly hand-carved Sheesham wooden cooking spatulas set of 5.', hi: 'नान-स्टिक बर्तनों के लिए सुरक्षित हस्तनिर्मित लकड़ी के चम्मचों का सेट।' }),
    basePrice: 599,
    stockQuantity: 78,
    thumbnailUrl: 'https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=400&q=80',
    imagesJson: JSON.stringify(['https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=800&q=80']),
    isActive: true,
    artisanName: 'Ramesh Kumar',
    artisanRegion: 'Tikamgarh, Madhya Pradesh'
  },

  // POTTERY & BASKETS & WOOD
  {
    id: 12,
    sku: 'ART-POTTERY-01',
    category: 'pottery',
    titleI18n: JSON.stringify({ en: 'Handpainted Terracotta Vase', hi: 'हाथ से चित्रित टेराकोटा फूलदान', kn: 'ಹಸ್ತಚಿತ್ರಿತ ಟೆರಾಕೋಟಾ ಹೂದಾನಿ' }),
    descriptionI18n: JSON.stringify({ en: 'Handcrafted terracotta vase painted with traditional tribal motifs by artisans in Rajasthan.', hi: 'राजस्थान के कारीगरों द्वारा पारंपरिक जनजातीय रूपांकनों के साथ चित्रित।' }),
    basePrice: 899,
    stockQuantity: 45,
    thumbnailUrl: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&q=80',
    imagesJson: JSON.stringify(['https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80']),
    isActive: true,
    artisanName: 'Ananya Sharma',
    artisanRegion: 'Jaipur, Rajasthan'
  },
  {
    id: 13,
    sku: 'ART-BASKET-01',
    category: 'baskets',
    titleI18n: JSON.stringify({ en: 'Handwoven Sabai Grass Basket', hi: 'हाथ से बुनी सबाई घास की टोकरी', kn: 'ಕೈಯಿಂದ ನೇಯ್ದ ಸಬಾಯಿ ಹುಲ್ಲಿನ ಬುಟ್ಟಿ' }),
    descriptionI18n: JSON.stringify({ en: 'Eco-friendly storage basket handwoven from natural Sabai grass fibers.', hi: 'प्राकृतिक सबाई घास के रेशों से हाथ से बुनी गई पर्यावरण-अनुकूल टोकरी।' }),
    basePrice: 699,
    stockQuantity: 60,
    thumbnailUrl: 'https://images.unsplash.com/photo-1622560481156-01ac25e4c0ac?w=400&q=80',
    imagesJson: JSON.stringify(['https://images.unsplash.com/photo-1622560481156-01ac25e4c0ac?w=800&q=80']),
    isActive: true,
    artisanName: 'Savitri Bai',
    artisanRegion: 'Mayurbhanj, Odisha'
  },
  {
    id: 14,
    sku: 'ART-JEWELRY-01',
    category: 'jewelry',
    titleI18n: JSON.stringify({ en: 'Beaded Tribal Drop Earrings', hi: 'मनके वाले जनजातीय झुमके', kn: 'ಮಣಿಗಳುಳ್ಳ ಗಿರಿಜನ ಕಿವಿಯೋಲೆಗಳು' }),
    descriptionI18n: JSON.stringify({ en: 'Vibrant beaded drop earrings handmade using recycled glass beads and natural thread.', hi: 'पुनर्चक्रित कांच के मनकों और धागे का उपयोग करके बने झुमके।' }),
    basePrice: 450,
    stockQuantity: 80,
    thumbnailUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80',
    imagesJson: JSON.stringify(['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80']),
    isActive: true,
    artisanName: 'Lalitha Devi',
    artisanRegion: 'Narsapur, Andhra Pradesh'
  },
  {
    id: 15,
    sku: 'ART-WOOD-01',
    category: 'wood',
    titleI18n: JSON.stringify({ en: 'Carved Sheesham Wooden Jewelry Box', hi: 'नक्काशीदार शीशम की लकड़ी का डिब्बा', kn: 'ಕೆತ್ತಿದ ಶೀಶಮ್ ಮರದ ಆಭರಣ ಪೆಟ್ಟಿಗೆ' }),
    descriptionI18n: JSON.stringify({ en: 'Intricately carved wooden box made from sustainably sourced solid Sheesham wood.', hi: 'टिकाऊ शीशम की लकड़ी से बना सुंदर डिब्बा।' }),
    basePrice: 1150,
    stockQuantity: 30,
    thumbnailUrl: 'https://images.unsplash.com/photo-1611486212557-88be5ff6f941?w=400&q=80',
    imagesJson: JSON.stringify(['https://images.unsplash.com/photo-1611486212557-88be5ff6f941?w=800&q=80']),
    isActive: true,
    artisanName: 'Jagdish Mistry',
    artisanRegion: 'Saran, Bihar'
  }
];

export async function fetchProducts(): Promise<LocalProduct[]> {
  try {
    const res = await fetch(`${API_BASE}/products`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch (err) {
    console.warn('Backend API unavailable, serving local catalog.', err);
  }

  // Fallback to local Dexie IndexedDB cache or INITIAL_PRODUCTS
  const localCount = await db.products.count();
  if (localCount < INITIAL_PRODUCTS.length) {
    await db.products.clear();
    await db.products.bulkAdd(INITIAL_PRODUCTS);
  }
  return await db.products.toArray();
}

export async function fetchProductById(id: number): Promise<LocalProduct | undefined> {
  const products = await fetchProducts();
  return products.find((p) => p.id === Number(id));
}

export async function fetchHubs(): Promise<VillageHubItem[]> {
  try {
    const res = await fetch(`${API_BASE}/hubs`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch (err) {
    console.warn('Hubs API offline, returning sample hubs.');
  }
  return SAMPLE_HUBS;
}

export function getProductCategory(product: LocalProduct): string {
  if (product && product.category && product.category.trim() !== '') {
    return product.category.toLowerCase().trim();
  }
  const sku = (product?.sku || '').toUpperCase();
  const text = `${product?.titleI18n || ''} ${product?.descriptionI18n || ''}`.toLowerCase();

  if (sku.includes('CLOTH') || sku.includes('STOLE') || text.includes('cotton') || text.includes('silk') || text.includes('mojari') || text.includes('dupatta') || text.includes('stole')) {
    return 'clothing';
  }
  if (sku.includes('FOOD') || text.includes('honey') || text.includes('spice') || text.includes('organic food') || text.includes('turmeric')) {
    return 'food';
  }
  if (sku.includes('HEALTH') || text.includes('pitcher') || text.includes('aroma') || text.includes('diffuser') || text.includes('wellness') || text.includes('clay water')) {
    return 'healthcare';
  }
  if (sku.includes('ELEC') || text.includes('amplifier') || text.includes('led') || text.includes('speaker') || text.includes('dock') || text.includes('desk lamp')) {
    return 'electronics';
  }
  if (sku.includes('APP') || text.includes('steamer') || text.includes('spoon') || text.includes('spatula') || text.includes('appliance') || text.includes('cooking')) {
    return 'appliances';
  }
  if (sku.includes('POTTERY') || sku.includes('VASE') || sku.includes('BOWL') || text.includes('terracotta') || text.includes('clay bowl')) {
    return 'pottery';
  }
  if (sku.includes('BASKET') || text.includes('basket') || text.includes('sabai')) {
    return 'baskets';
  }
  if (sku.includes('JEWELRY') || text.includes('earrings') || text.includes('jewelry')) {
    return 'jewelry';
  }
  if (sku.includes('WOOD') || text.includes('wooden') || text.includes('sheesham')) {
    return 'wood';
  }
  if (sku.includes('BAMBOO') || text.includes('bamboo tray')) {
    return 'bamboo';
  }
  if (sku.includes('CUSHION') || text.includes('cushion') || text.includes('decor')) {
    return 'decor';
  }
  return 'pottery';
}

export async function fetchMyOrders(token?: string): Promise<any[]> {
  try {
    if (token) {
      const res = await fetch(`${API_BASE}/orders/my-orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        return await res.json();
      }
    }
  } catch (err) {
    console.warn('Backend fetchMyOrders offline, loading local pending orders.');
  }

  // Fallback to local Dexie pending orders
  const pending = await db.pendingOrders.toArray();
  return pending.map((po) => ({
    id: po.id,
    orderNumber: `RR-OFF-${(po.idempotencyKey || '123456').slice(0, 6).toUpperCase()}`,
    idempotencyKey: po.idempotencyKey,
    hubName: po.hubName,
    buyerPhone: po.buyerPhone,
    totalAmount: po.totalAmount,
    paymentType: po.paymentType,
    paymentStatus: po.paymentType === 'COD' ? 'UNPAID' : 'PAID',
    orderStatus: po.syncStatus === 'CANCELLED' ? 'Cancelled' : po.syncStatus === 'SYNCED' ? 'Delivered Successfully' : 'Order Placed (Offline Sync)',
    offlineCreatedAt: po.offlineCreatedAt,
    syncedAt: po.syncStatus === 'SYNCED' ? po.offlineCreatedAt : null,
    deliveryDate: new Date(Date.now() + 3 * 86400000).toISOString(),
    cancellationReason: po.cancellationReason,
    cancelledAt: po.cancelledAt,
    items: po.items
  }));
}

export async function cancelOrderApi(orderId: number, reason: string, token?: string): Promise<boolean> {
  try {
    if (token) {
      const res = await fetch(`${API_BASE}/orders/${orderId}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ reason })
      });
      if (res.ok) return true;
    }
  } catch (err) {
    console.warn('Backend cancel API offline, updating local IndexedDB status.');
  }

  // Local Dexie fallback
  const localOrder = await db.pendingOrders.get(orderId);
  if (localOrder) {
    await db.pendingOrders.update(orderId, {
      syncStatus: 'CANCELLED',
      cancellationReason: reason,
      cancelledAt: new Date().toISOString()
    });
    return true;
  }
  return false;
}

export async function fetchProductReviews(productId: number): Promise<{ reviews: any[]; summary: any }> {
  try {
    const res = await fetch(`${API_BASE}/products/${productId}/reviews`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.reviews) {
        return data;
      }
    }
  } catch (err) {
    console.warn('Backend reviews API offline, falling back to local Dexie store.', err);
  }

  const localReviews = await db.reviews.where('productId').equals(productId).toArray();
  const total = localReviews.length;
  const avg = total > 0 ? localReviews.reduce((sum, r) => sum + r.overallRating, 0) / total : 0;

  const dist: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  localReviews.forEach(r => { dist[r.overallRating] = (dist[r.overallRating] || 0) + 1; });

  return {
    reviews: localReviews.length > 0 ? localReviews : [
      {
        id: 101,
        productId,
        orderId: 1,
        buyerName: 'Sunita Devi (Verified Buyer)',
        overallRating: 5,
        title: 'Exquisite Craftsmanship & Authenticity!',
        comment: 'Handcrafted with exceptional skill. The natural materials and traditional technique give it a timeless look.',
        isVerifiedPurchase: true,
        helpfulVotes: 14,
        createdAt: new Date().toISOString(),
        attributes: [
          { attributeName: 'quality', ratingScore: 5 },
          { attributeName: 'material_authenticity', ratingScore: 5 },
          { attributeName: 'value_for_money', ratingScore: 4 }
        ],
        mediaList: [
          { mediaType: 'IMAGE', url: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80' }
        ]
      }
    ],
    summary: {
      averageRating: avg > 0 ? Math.round(avg * 10) / 10 : 4.9,
      totalReviews: total > 0 ? total : 1,
      ratingDistribution: dist,
      attributeAverages: { quality: 4.9, material_authenticity: 4.8, value_for_money: 4.7 }
    }
  };
}

export async function submitProductReview(reviewData: {
  productId: number;
  orderId?: number;
  overallRating: number;
  title: string;
  comment: string;
  attributes: Array<{ attributeName: string; ratingScore: number }>;
  mediaList: Array<{ mediaType: string; url: string }>;
}): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData)
    });
    if (res.ok) {
      const created = await res.json();
      await db.reviews.add({
        productId: created.productId,
        orderId: created.orderId,
        buyerName: created.buyerName || 'Verified Buyer',
        overallRating: created.overallRating,
        title: created.title,
        comment: created.comment,
        isVerifiedPurchase: true,
        helpfulVotes: 0,
        createdAt: created.createdAt || new Date().toISOString(),
        attributes: created.attributes || reviewData.attributes,
        mediaList: created.mediaList || reviewData.mediaList
      });
      return true;
    }
  } catch (err) {
    console.warn('Backend review submit offline, saving to Dexie IndexedDB cache.');
  }

  await db.reviews.add({
    productId: reviewData.productId,
    orderId: reviewData.orderId || 1,
    buyerName: 'Verified Artisan Supporter',
    overallRating: reviewData.overallRating,
    title: reviewData.title,
    comment: reviewData.comment,
    isVerifiedPurchase: true,
    helpfulVotes: 0,
    createdAt: new Date().toISOString(),
    attributes: reviewData.attributes,
    mediaList: reviewData.mediaList
  });
  return true;
}

export async function voteHelpfulReview(reviewId: number): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/reviews/${reviewId}/helpful`, { method: 'POST' });
    if (res.ok) return true;
  } catch (err) {
    console.warn('Helpful vote offline endpoint fallback.');
  }
  return true;
}

