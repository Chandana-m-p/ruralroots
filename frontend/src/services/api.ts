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
  },
  {
    id: 16,
    sku: 'ART-BASKET-02',
    category: 'baskets',
    titleI18n: JSON.stringify({ en: 'Natural Seagrass Storage Laundry Basket', hi: 'प्राकृतिक सीग्रास स्टोरेज टोकरी', kn: 'ಸೀಗ್ರಾಸ್ ಶೇಖರಣಾ ಬುಟ್ಟಿ' }),
    descriptionI18n: JSON.stringify({ en: 'Hand-braided using sustainably harvested seagrass and organic jute handles by women self-help clusters.', hi: 'महिलाओं के स्वयं सहायता समूहों द्वारा प्राकृतिक सबाई घास से बनाई गई टोकरी।' }),
    basePrice: 1299,
    stockQuantity: 42,
    thumbnailUrl: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=400&q=80',
    imagesJson: JSON.stringify(['https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=800&q=80']),
    isActive: true,
    artisanName: 'Lalitha Devi',
    artisanRegion: 'Narsapur, Andhra Pradesh'
  },
  {
    id: 17,
    sku: 'ART-POTTERY-02',
    category: 'pottery',
    titleI18n: JSON.stringify({ en: 'Molela Clay Terracotta Wall Plaque', hi: 'मोलेला क्ले टेराकोटा वॉल प्लाक', kn: 'ಮೊಲೇಲಾ ಮಣ್ಣಿನ ಗೋಡೆ ಚಿತ್ರ ಪಲಕ' }),
    descriptionI18n: JSON.stringify({ en: 'Hand-molded unglazed terracotta relief plaque crafted using traditional Molela clay techniques depicting rural folklore.', hi: 'मोलेला मिट्टी तकनीकों का उपयोग करके बनाई गई हाथ से बनी राहत पट्टिका।' }),
    basePrice: 1450,
    stockQuantity: 25,
    thumbnailUrl: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&q=80',
    imagesJson: JSON.stringify(['https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80']),
    isActive: true,
    artisanName: 'Mohanlal Kumhar',
    artisanRegion: 'Rajsamand, Rajasthan'
  },
  {
    id: 18,
    sku: 'ART-BAMBOO-02',
    category: 'bamboo',
    titleI18n: JSON.stringify({ en: 'Assamese Handwoven Bamboo Tea Tray', hi: 'असमिया हाथ से बुना बांस का चाय ट्रे', kn: 'ಅಸ್ಸಾಮಿ ಕೈಯಿಂದ ನೇಯ್ದ ಬಿದಿರಿನ ಟೀ ಟ್ರೇ' }),
    descriptionI18n: JSON.stringify({ en: 'Artisanal woven bamboo serving tray with natural cane reinforced borders, crafted by self-help women artisans in Assam.', hi: 'प्राकृतिक बेंत की सीमाओं के साथ कारीगर द्वारा बुना गया बांस का ट्रे।' }),
    basePrice: 850,
    stockQuantity: 55,
    thumbnailUrl: 'https://images.unsplash.com/photo-1596496181848-3091d4878b24?w=400&q=80',
    imagesJson: JSON.stringify(['https://images.unsplash.com/photo-1596496181848-3091d4878b24?w=800&q=80']),
    isActive: true,
    artisanName: 'Meena Bai',
    artisanRegion: 'Guwahati, Assam'
  },
  {
    id: 19,
    sku: 'ART-JEWELRY-02',
    category: 'jewelry',
    titleI18n: JSON.stringify({ en: 'Traditional Filigree Silver Jhumka Earrings', hi: 'पारंपरिक फिलीग्री चांदी के झुमके', kn: 'ಸಾಂಪ್ರದಾಯಿಕ ಬೆಳ್ಳಿಯ ಜುಮುಕಿ ಕಿವಿಯೋಲೆಗಳು' }),
    descriptionI18n: JSON.stringify({ en: 'Delicate handcrafted oxidized silver wirework jhumka earrings featuring intricate filigree flower motifs made by Cuttack silversmiths.', hi: 'कटक के सुनारों द्वारा बनाए गए जटिल फिलीग्री फूलों के रूपांकनों वाले चांदी के झुमके।' }),
    basePrice: 1890,
    stockQuantity: 20,
    thumbnailUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80',
    imagesJson: JSON.stringify(['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80']),
    isActive: true,
    artisanName: 'Sushma Devi',
    artisanRegion: 'Cuttack, Odisha'
  },
  {
    id: 20,
    sku: 'ART-DECOR-01',
    category: 'decor',
    titleI18n: JSON.stringify({ en: 'Hand-Block Printed Chanderi Cushion Cover Set', hi: 'हाथ से ब्लॉक प्रिंटेड चंदेरी कुशन कवर सेट', kn: 'ಹ್ಯಾಂಡ್-ಬ್ಲಾಕ್ ಪ್ರಿಂಟ್ ಮಾಡಿದ ಚಂದೇರಿ ಕುಶನ್ ಕವರ್ ಸೆಟ್' }),
    descriptionI18n: JSON.stringify({ en: 'Premium Chanderi cotton cushion covers hand-block printed using natural vegetable dyes by master artisans of Bagru, Rajasthan.', hi: 'प्राकृतिक वनस्पति रंगों का उपयोग करके हाथ से ब्लॉक प्रिंट किए गए कुशन कवर।' }),
    basePrice: 1199,
    stockQuantity: 38,
    thumbnailUrl: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&q=80',
    imagesJson: JSON.stringify(['https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80']),
    isActive: true,
    artisanName: 'Radheshyam Chhipa',
    artisanRegion: 'Bagru, Rajasthan'
  },
  {
    id: 21,
    sku: 'ART-ELEC-01',
    category: 'electronics',
    titleI18n: JSON.stringify({ en: 'Solar Powered LED Village Lantern & Phone Charger', hi: 'सोलर पावर एलईडी लालटेन और फोन चार्जर', kn: 'ಸೌರಶಕ್ತಿ ಚಾಲಿತ ಎಲ್‌ಇಡಿ ಕಂಸೀಲು ಮತ್ತು ಮೊಬೈಲ್ ಚಾರ್ಜರ್' }),
    descriptionI18n: JSON.stringify({ en: 'Portable multi-purpose rural solar lantern with built-in USB power bank for smartphone charging, assembled by rural solar technician cooperatives.', hi: 'स्मार्टफोन चार्जिंग के लिए निर्मित यूएसबी पावर बैंक के साथ पोर्टेबल बहुउद्देशीय ग्रामीण सौर लालटेन।' }),
    basePrice: 1299,
    stockQuantity: 65,
    thumbnailUrl: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400&q=80',
    imagesJson: JSON.stringify(['https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80']),
    isActive: true,
    artisanName: 'Barefoot Solar Engineers',
    artisanRegion: 'Tilonia, Rajasthan'
  },
  {
    id: 22,
    sku: 'ART-ELEC-02',
    category: 'electronics',
    titleI18n: JSON.stringify({ en: 'Hand-Carved Sheesham Wooden Bluetooth Speaker', hi: 'नक्काशीदार शीशम लकड़ी का ब्लूटूथ स्पीकर', kn: 'ಹಸ್ತ ಕೆತ್ತನೆಯ ಶೀಶಮ್ ಮರದ ಬ್ಲೂಟೂತ್ ಸ್ಪೀಕರ್' }),
    descriptionI18n: JSON.stringify({ en: 'Eco-acoustic wireless Bluetooth speaker housed in solid hand-turned Sheesham wood casing, combining rich acoustic warmth with traditional rural woodcraft.', hi: 'पारंपरिक ग्रामीण काष्ठकला के साथ ठोस हस्तनिर्मित शीशम लकड़ी का ब्लूटूथ स्पीकर।' }),
    basePrice: 1850,
    stockQuantity: 30,
    thumbnailUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&q=80',
    imagesJson: JSON.stringify(['https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80']),
    isActive: true,
    artisanName: 'Ramesh Kumar',
    artisanRegion: 'Tikamgarh, Madhya Pradesh'
  },
  {
    id: 23,
    sku: 'ART-ELEC-03',
    category: 'electronics',
    titleI18n: JSON.stringify({ en: 'Rechargeable Solar LED Study Lamp', hi: 'रिचार्जेबल सोलर एलईडी स्टडी लैम्प', kn: 'ಮರುಚಾರ್ಜ್ ಮಾಡಬಹುದಾದ ಸೌರ ಎಲ್‌ಇಡಿ ಅಧ್ಯಯನ ದೀಪ' }),
    descriptionI18n: JSON.stringify({ en: 'Flexible neck solar LED reading lamp with dimmable natural warm light, designed for rural study setups and off-grid homes.', hi: 'ग्रामीण अध्ययन व्यवस्था और ऑफ-ग्रिड घरों के लिए डिज़ाइन किया गया सौर एलईडी रीडिंग लैंप।' }),
    basePrice: 899,
    stockQuantity: 80,
    thumbnailUrl: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&q=80',
    imagesJson: JSON.stringify(['https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80']),
    isActive: true,
    artisanName: 'Surya Jyoti Co-op',
    artisanRegion: 'Ranchi, Jharkhand'
  },
  {
    id: 24,
    sku: 'ART-ELEC-04',
    category: 'electronics',
    titleI18n: JSON.stringify({ en: 'Natural Bamboo Wireless Fast Charging Pad', hi: 'प्राकृतिक बांस का वायरलेस फास्ट चार्जिंग पैड', kn: 'ನೈಸರ್ಗಿಕ ಬಿದಿರಿನ ವೈರ್‌ಲೆಸ್ ಫಾಸ್ಟ್ ಚಾರ್ಜಿಂಗ್ ಪ್ಯಾಡ್' }),
    descriptionI18n: JSON.stringify({ en: '15W fast Qi wireless smartphone charging pad encrusted in sustainably harvested organic bamboo wood by Assam artisans.', hi: 'असम के कारीगरों द्वारा जैविक बांस की लकड़ी में निर्मित 15W फास्ट क्यूई वायरलेस स्मार्टफोन चार्जिंग पैड।' }),
    basePrice: 1150,
    stockQuantity: 45,
    thumbnailUrl: 'https://images.unsplash.com/photo-1622445268465-8438bc6d5863?w=400&q=80',
    imagesJson: JSON.stringify(['https://images.unsplash.com/photo-1622445268465-8438bc6d5863?w=800&q=80']),
    isActive: true,
    artisanName: 'Nagen Das',
    artisanRegion: 'Barpeta, Assam'
  },
  {
    id: 25,
    sku: 'ART-BRASS-02',
    category: 'appliances',
    titleI18n: JSON.stringify({ en: 'Hand-Hammered Kansa Bronze Thali Set', hi: 'हाथ से निर्मित कांसा थाली सेट', kn: 'ಹಸ್ತನಿರ್ಮಿತ ಕಂಚಿನ ಊಟದ ತಟ್ಟೆ ಸೆಟ್' }),
    descriptionI18n: JSON.stringify({ en: 'Traditional 5-piece hand-hammered Kansa bell metal dinner set crafted by hereditary coppersmiths of Odisha.', hi: 'ओडिशा के कारीगरों द्वारा पारंपरिक 5-पीस हस्तनिर्मित कांसा थाली सेट।' }),
    basePrice: 2499,
    stockQuantity: 25,
    thumbnailUrl: 'https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=400&q=80',
    imagesJson: JSON.stringify(['https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=800&q=80']),
    isActive: true,
    artisanName: 'Kansari Co-op',
    artisanRegion: 'Bangarh, Odisha'
  },
  {
    id: 26,
    sku: 'ART-CLOTH-04',
    category: 'clothing',
    titleI18n: JSON.stringify({ en: 'Hand-Tied Kutch Bandhani Silk Dupatta', hi: 'हाथ से बंधाई कच्ची बांधनी सिल्क दुपट्टा', kn: 'ಕೈಯಿಂದ ಕಟ್ಟಿದ ಕಚ್ ಬಾಂದಿನಿ ರೇಷ್ಮೆ ದುಪಟ್ಟಾ' }),
    descriptionI18n: JSON.stringify({ en: 'Vibrant pure silk dupatta with fine hand-tied tie-dye knots created by women artisans of Kutch.', hi: 'कच्छ की महिला कारीगरों द्वारा हस्तनिर्मित बंधाई और रंगाई के साथ जीवंत शुद्ध रेशमी दुपट्टा।' }),
    basePrice: 1850,
    stockQuantity: 35,
    thumbnailUrl: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&q=80',
    imagesJson: JSON.stringify(['https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80']),
    isActive: true,
    artisanName: 'Fatima Khatun',
    artisanRegion: 'Kutch, Gujarat'
  },
  {
    id: 27,
    sku: 'ART-FOOD-03',
    category: 'food',
    titleI18n: JSON.stringify({ en: 'Kachi Ghani Cold-Pressed Mustard Oil', hi: 'काची घानी कच्चा सरसों का तेल', kn: 'ಕಚ್ಚಾ ಗಾಣದ ಸಾಸಿವೆ ಎಣ್ಣೆ' }),
    descriptionI18n: JSON.stringify({ en: 'Pure 100% unrefined cold-pressed mustard oil extracted using traditional wooden ghani mills in rural Rajasthan.', hi: 'पारंपरिक लकड़ी की घानी से निकाला गया 100% शुद्ध अपरिष्कृत सरसों का तेल।' }),
    basePrice: 349,
    stockQuantity: 150,
    thumbnailUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80',
    imagesJson: JSON.stringify(['https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80']),
    isActive: true,
    artisanName: 'Gramin Tel Udyog',
    artisanRegion: 'Alwar, Rajasthan'
  },
  {
    id: 28,
    sku: 'ART-TOYS-02',
    category: 'wood',
    titleI18n: JSON.stringify({ en: 'Kondapalli Wooden Bullock Cart Toy', hi: 'कोंडापल्ली लकड़ी की बैलगाड़ी खिलौना', kn: 'ಹಸ್ತನಿರ್ಮಿತ ಕೊಂಡಪಲ್ಲಿ ಮರದ ಎತ್ತಿನ ಬಂಡಿ' }),
    descriptionI18n: JSON.stringify({ en: 'Traditional eco-friendly wooden bullock cart toy painted with non-toxic vegetable colors by Kondapalli artisans.', hi: 'गैर-विषैले वनस्पति रंगों से पेंट की गई पारंपरिक लकड़ी की बैलगाड़ी का खिलौना।' }),
    basePrice: 799,
    stockQuantity: 40,
    thumbnailUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&q=80',
    imagesJson: JSON.stringify(['https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&q=80']),
    isActive: true,
    artisanName: 'Venkateswara Rao',
    artisanRegion: 'Kondapalli, Andhra Pradesh'
  },
  {
    id: 29,
    sku: 'ART-HEALTH-03',
    category: 'healthcare',
    titleI18n: JSON.stringify({ en: 'Organic Khus Vetiver Soap Bar Set', hi: 'जैविक खस हर्बल स्नान साबुन सेट', kn: 'ಸಾವಯವ ಬಿಳಿಚಿಕು ನೈಸರ್ಗಿಕ ಸ್ನಾನದ ಸಾಬೂನು' }),
    descriptionI18n: JSON.stringify({ en: 'Set of 3 cold-processed coconut & vetiver root soaps hand-blended by women self-help groups.', hi: 'महिला स्वयं सहायता समूहों द्वारा हस्तनिर्मित नारियल और खस की जड़ से बने हर्बल साबुन।' }),
    basePrice: 299,
    stockQuantity: 100,
    thumbnailUrl: 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=400&q=80',
    imagesJson: JSON.stringify(['https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=800&q=80']),
    isActive: true,
    artisanName: 'Gramya Herbals',
    artisanRegion: 'Wayanad, Kerala'
  },
  {
    id: 30,
    sku: 'ART-DECOR-02',
    category: 'decor',
    titleI18n: JSON.stringify({ en: 'Natural Braided Jute Floor Runner Rug', hi: 'प्राकृतिक बुना हुआ जूट फ्लोर रनर', kn: 'ನೈಸರ್ಗಿಕ ಸೆಣಬಿನ ನೆಲದ ಹಾಸು' }),
    descriptionI18n: JSON.stringify({ en: 'Eco-friendly natural jute floor runner rug braided on traditional handlooms for rustic home interiors.', hi: 'देसी घरेलू सजावट के लिए पारंपरिक हथकरघे पर बुना गया प्राकृतिक जूट फ्लोर रनर।' }),
    basePrice: 1399,
    stockQuantity: 30,
    thumbnailUrl: 'https://images.unsplash.com/photo-1622560481156-01ac25e4c0ac?w=400&q=80',
    imagesJson: JSON.stringify(['https://images.unsplash.com/photo-1622560481156-01ac25e4c0ac?w=800&q=80']),
    isActive: true,
    artisanName: 'Shanti Devi',
    artisanRegion: 'Cooch Behar, West Bengal'
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
    const cat = product.category.toLowerCase().trim();
    if (cat === 'apparel' || cat === 'clothes') return 'clothing';
    if (cat === 'grocery') return 'food';
    if (cat === 'wellness') return 'healthcare';
    if (cat === 'smart tech') return 'electronics';
    if (cat === 'living') return 'appliances';
    return cat;
  }
  const sku = (product?.sku || '').toUpperCase();
  const title = (product?.titleI18n || '').toLowerCase();

  if (sku.includes('CLOTH') || sku.includes('STOLE') || sku.includes('JUTTI') || sku.includes('MOJARI') || sku.includes('DUPATTA') || title.includes('stole') || title.includes('dupatta') || title.includes('mojari') || title.includes('saree') || title.includes('kurta')) {
    return 'clothing';
  }
  if (sku.includes('FOOD') || sku.includes('HONEY') || sku.includes('SPICE') || title.includes('honey') || title.includes('spice') || title.includes('mustard oil') || title.includes('turmeric') || title.includes('ghee')) {
    return 'food';
  }
  if (sku.includes('HEALTH') || title.includes('pitcher') || title.includes('aroma') || title.includes('diffuser') || title.includes('soap')) {
    return 'healthcare';
  }
  if (sku.includes('ELEC') || sku.includes('SOLAR') || title.includes('amplifier') || title.includes('led') || title.includes('speaker') || title.includes('lantern') || title.includes('charging pad')) {
    return 'electronics';
  }
  if (sku.includes('APP') || sku.includes('BRASS-02') || title.includes('steamer') || title.includes('thali') || title.includes('spoon set') || title.includes('spatula')) {
    return 'appliances';
  }
  if (sku.includes('POTTERY') || sku.includes('VASE') || sku.includes('BOWL') || sku.includes('TEA') || title.includes('terracotta vase') || title.includes('clay bowl') || title.includes('blue pottery') || title.includes('wall plaque')) {
    return 'pottery';
  }
  if (sku.includes('BASKET') || title.includes('basket')) {
    return 'baskets';
  }
  if (sku.includes('JEWELRY') || title.includes('earrings') || title.includes('jhumka')) {
    return 'jewelry';
  }
  if (sku.includes('WOOD') || sku.includes('TOYS') || title.includes('bullock cart') || title.includes('stacking toys') || title.includes('wooden box')) {
    return 'wood';
  }
  if (sku.includes('BAMBOO') || title.includes('bamboo tea tray') || title.includes('bamboo serving tray')) {
    return 'bamboo';
  }
  if (sku.includes('DECOR') || sku.includes('CUSHION') || sku.includes('PAINTING') || sku.includes('SCROLL') || sku.includes('BRASS-01') || title.includes('cushion') || title.includes('canvas') || title.includes('scroll') || title.includes('runner rug') || title.includes('dhokra')) {
    return 'decor';
  }
  return 'decor';
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
  const safeId = Number(productId) || 1;
  try {
    const res = await fetch(`${API_BASE}/products/${safeId}/reviews`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.reviews) {
        return data;
      }
    }
  } catch (err) {
    console.warn('Backend reviews API offline, falling back to local Dexie store.', err);
  }

  let localReviews: any[] = [];
  try {
    localReviews = await db.reviews.where('productId').equals(safeId).toArray();
  } catch (err) {
    console.warn('Dexie review lookup fallback:', err);
  }

  const total = localReviews.length;
  const avg = total > 0 ? localReviews.reduce((sum, r) => sum + (Number(r.overallRating) || 5), 0) / total : 0;

  const dist: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  localReviews.forEach(r => {
    const score = Number(r.overallRating) || 5;
    dist[score] = (dist[score] || 0) + 1;
  });

  return {
    reviews: localReviews.length > 0 ? localReviews : [
      {
        id: 101,
        productId: safeId,
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

// =============================================================================
// ADDRESS MANAGEMENT API SERVICES (WITH INDEXEDDB FALLBACK)
// =============================================================================

export async function fetchUserAddresses(token?: string): Promise<import('../db').LocalAddress[]> {
  try {
    if (token) {
      const res = await fetch(`${API_BASE}/addresses`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const remoteAddresses = await res.json();
        if (Array.isArray(remoteAddresses)) {
          // Sync with local Dexie store
          await db.userAddresses.clear();
          const mapped = remoteAddresses.map((a: any) => ({
            remoteId: a.id,
            label: a.label,
            fullName: a.fullName,
            phoneNumber: a.phoneNumber,
            addressLine: a.addressLine,
            villageOrCity: a.villageOrCity,
            district: a.district,
            state: a.state,
            pincode: a.pincode,
            isDefault: a.isDefault
          }));
          await db.userAddresses.bulkAdd(mapped);
          return await db.userAddresses.toArray();
        }
      }
    }
  } catch (err) {
    console.warn('Backend address API offline, reading local Dexie userAddresses.');
  }

  const localList = await db.userAddresses.toArray();
  if (localList.length === 0) {
    const initialDefault = {
      label: 'Home',
      fullName: 'Ananya Sharma',
      phoneNumber: '9876543210',
      addressLine: 'Gram Panchayat Road, House #42',
      villageOrCity: 'Ramgarh',
      district: 'Indore',
      state: 'Madhya Pradesh',
      pincode: '452001',
      isDefault: true
    };
    const id = (await db.userAddresses.add(initialDefault)) as number;
    return [{ ...initialDefault, id }];
  }
  return localList;
}

export async function createUserAddress(
  addressData: Omit<import('../db').LocalAddress, 'id'>,
  token?: string
): Promise<import('../db').LocalAddress> {
  try {
    if (token) {
      const res = await fetch(`${API_BASE}/addresses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(addressData)
      });
      if (res.ok) {
        const created = await res.json();
        if (created.isDefault) {
          const all = await db.userAddresses.toArray();
          for (const item of all) {
            if (item.id) await db.userAddresses.update(item.id, { isDefault: false });
          }
        }
        const newLocalId = (await db.userAddresses.add({
          remoteId: created.id,
          label: created.label,
          fullName: created.fullName,
          phoneNumber: created.phoneNumber,
          addressLine: created.addressLine,
          villageOrCity: created.villageOrCity,
          district: created.district,
          state: created.state,
          pincode: created.pincode,
          isDefault: created.isDefault
        })) as number;
        return { ...addressData, id: newLocalId, remoteId: created.id };
      }
    }
  } catch (err) {
    console.warn('Backend address create API offline, saving to Dexie IndexedDB.');
  }

  if (addressData.isDefault) {
    const all = await db.userAddresses.toArray();
    for (const item of all) {
      if (item.id) await db.userAddresses.update(item.id, { isDefault: false });
    }
  }
  const id = (await db.userAddresses.add(addressData)) as number;
  return { ...addressData, id };
}

export async function updateUserAddress(
  addressId: number,
  addressData: Partial<import('../db').LocalAddress>,
  token?: string
): Promise<import('../db').LocalAddress> {
  const localItem = await db.userAddresses.get(addressId);
  const remoteId = localItem?.remoteId;

  try {
    if (token && remoteId) {
      const res = await fetch(`${API_BASE}/addresses/${remoteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(addressData)
      });
      if (res.ok) {
        const updated = await res.json();
        if (updated.isDefault) {
          const all = await db.userAddresses.toArray();
          for (const item of all) {
            if (item.id) await db.userAddresses.update(item.id, { isDefault: false });
          }
        }
        await db.userAddresses.update(addressId, {
          label: updated.label,
          fullName: updated.fullName,
          phoneNumber: updated.phoneNumber,
          addressLine: updated.addressLine,
          villageOrCity: updated.villageOrCity,
          district: updated.district,
          state: updated.state,
          pincode: updated.pincode,
          isDefault: updated.isDefault
        });
        return (await db.userAddresses.get(addressId))!;
      }
    }
  } catch (err) {
    console.warn('Backend address update API offline, updating Dexie locally.');
  }

  if (addressData.isDefault) {
    const all = await db.userAddresses.toArray();
    for (const item of all) {
      if (item.id) await db.userAddresses.update(item.id, { isDefault: false });
    }
  }
  await db.userAddresses.update(addressId, addressData);
  return (await db.userAddresses.get(addressId))!;
}

export async function deleteUserAddress(addressId: number, token?: string): Promise<boolean> {
  const localItem = await db.userAddresses.get(addressId);
  const remoteId = localItem?.remoteId;
  const wasDefault = localItem?.isDefault;

  try {
    if (token && remoteId) {
      await fetch(`${API_BASE}/addresses/${remoteId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
    }
  } catch (err) {
    console.warn('Backend address delete API offline, deleting from Dexie locally.');
  }

  await db.userAddresses.delete(addressId);
  if (wasDefault) {
    const remaining = await db.userAddresses.toArray();
    if (remaining.length > 0 && remaining[0].id) {
      await db.userAddresses.update(remaining[0].id, { isDefault: true });
    }
  }
  return true;
}

export async function setDefaultUserAddress(addressId: number, token?: string): Promise<import('../db').LocalAddress> {
  const localItem = await db.userAddresses.get(addressId);
  const remoteId = localItem?.remoteId;

  try {
    if (token && remoteId) {
      await fetch(`${API_BASE}/addresses/${remoteId}/default`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
      });
    }
  } catch (err) {
    console.warn('Backend set default address offline, setting locally in Dexie.');
  }

  const all = await db.userAddresses.toArray();
  for (const item of all) {
    if (item.id) await db.userAddresses.update(item.id, { isDefault: item.id === addressId });
  }
  return (await db.userAddresses.get(addressId))!;
}

