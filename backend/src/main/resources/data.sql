-- Seed Users (Phone OTP logic used for actual logins)
INSERT INTO users (id, phone_number, full_name, role, preferred_language, is_active, created_at) 
VALUES (1, '9876543210', 'Ananya Sharma', 'ROLE_BUYER', 'en', true, CURRENT_TIMESTAMP());

INSERT INTO users (id, phone_number, full_name, role, preferred_language, is_active, created_at) 
VALUES (2, '9123456789', 'Sunita Devi (Hub Manager)', 'ROLE_HUB_MANAGER', 'hi', true, CURRENT_TIMESTAMP());

INSERT INTO users (id, phone_number, full_name, role, preferred_language, is_active, created_at) 
VALUES (3, '9999999999', 'System Admin', 'ROLE_ADMIN', 'en', true, CURRENT_TIMESTAMP());

-- Seed Village Hubs
INSERT INTO village_hubs (id, hub_code, hub_name, manager_id, pincode, village_name, district, state, landmark, operates_cod, created_at)
VALUES (1, 'HUB-RAMGARH-01', 'Ramgarh Central Kendra (Kalyan Store)', 2, '452001', 'Ramgarh', 'Indore', 'Madhya Pradesh', 'Near Panchayat Bhawan', true, CURRENT_TIMESTAMP());

INSERT INTO village_hubs (id, hub_code, hub_name, manager_id, pincode, village_name, district, state, landmark, operates_cod, created_at)
VALUES (2, 'HUB-CHANDAN-02', 'Chandanpur Rural Hub (Gupta General)', 2, '452002', 'Chandanpur', 'Indore', 'Madhya Pradesh', 'Opposite Bus Stand', true, CURRENT_TIMESTAMP());

-- Seed Multi-lingual Artisanal Products
INSERT INTO products (id, sku, title_i18n, description_i18n, base_price, stock_quantity, thumbnail_url, images_json, is_active, version)
VALUES (1, 'ART-VASE-01', 
  '{"en": "Handpainted Terracotta Vase", "hi": "हाथ से चित्रित टेराकोटा फूलदान", "mr": "हातने रंगवलेले मातीचे भांडे", "gu": "હાથથી ચીતરેલું ટેરાકોટા ફ્લાવરવાઝ"}', 
  '{"en": "Handcrafted terracotta vase painted with traditional tribal motifs by artisans in Rajasthan.", "hi": "राजस्थान के कारीगरों द्वारा पारंपरिक जनजातीय रूपांकनों के साथ चित्रित हस्तनिर्मित टेराकोटा फूलदान।"}', 
  899.00, 45, 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&q=80', '["https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80"]', true, 0);

INSERT INTO products (id, sku, title_i18n, description_i18n, base_price, stock_quantity, thumbnail_url, images_json, is_active, version)
VALUES (2, 'ART-BASKET-01', 
  '{"en": "Handwoven Sabai Grass Basket", "hi": "हाथ से बुनी सबाई घास की टोकरी", "mr": "हातने विणलेली सबाई गवताची टोपली", "gu": "હાથથી વણેલી સબાઈ ઘાસની ટોપલી"}', 
  '{"en": "Eco-friendly storage basket handwoven from natural Sabai grass fibers by women artisans.", "hi": "महिला कारीगरों द्वारा प्राकृतिक सबाई घास के रेशों से हाथ से बुनी गई पर्यावरण-अनुकूल टोकरी।"}', 
  699.00, 60, 'https://images.unsplash.com/photo-1622560481156-01ac25e4c0ac?w=400&q=80', '["https://images.unsplash.com/photo-1622560481156-01ac25e4c0ac?w=800&q=80"]', true, 0);

INSERT INTO products (id, sku, title_i18n, description_i18n, base_price, stock_quantity, thumbnail_url, images_json, is_active, version)
VALUES (3, 'ART-JEWELRY-01', 
  '{"en": "Beaded Tribal Drop Earrings", "hi": "मनके वाले जनजातीय झुमके", "mr": "मण्यांचे आदिवासी कानातले", "gu": "મોતીના આદિવાસી ઝુમખા"}', 
  '{"en": "Vibrant beaded drop earrings handmade using recycled glass beads and natural thread.", "hi": "पुनर्चक्रित कांच के मनकों और प्राकृतिक धागे का उपयोग करके हस्तनिर्मित ज्वलंत झुमके।"}', 
  450.00, 80, 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80', '["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80"]', true, 0);

INSERT INTO products (id, sku, title_i18n, description_i18n, base_price, stock_quantity, thumbnail_url, images_json, is_active, version)
VALUES (4, 'ART-WOOD-01', 
  '{"en": "Carved Sheesham Wooden Jewelry Box", "hi": "नक्काशीदार शीशम की लकड़ी का आभूषण डिब्बा", "mr": "कोरलेले शीशम लाकडी दागिण्यांचे बॉक्स", "gu": "કોતરણીવાળું શીશમ લાકડાનું દાગીના બોક્સ"}', 
  '{"en": "Intricately carved wooden box made from sustainably sourced solid Sheesham wood.", "hi": "टिकाऊ शीशम की लकड़ी से बना जटिल नक्काशीदार लकड़ी का डिब्बा।"}', 
  1150.00, 30, 'https://images.unsplash.com/photo-1611486212557-88be5ff6f941?w=400&q=80', '["https://images.unsplash.com/photo-1611486212557-88be5ff6f941?w=800&q=80"]', true, 0);

INSERT INTO products (id, sku, title_i18n, description_i18n, base_price, stock_quantity, thumbnail_url, images_json, is_active, version)
VALUES (5, 'ART-STOLE-01', 
  '{"en": "Handwoven Organic Cotton Stole", "hi": "हाथ से बुना ऑर्गेनिक कॉटन स्टोल", "mr": "हातने विणलेली सेंद्रिय सुती शाल", "gu": "હાથથી વણેલું ઓર્ગેનિક કોટન સ્ટોલ"}', 
  '{"en": "Lightweight breathable stole woven on traditional pit looms using natural vegetable dyes.", "hi": "प्राकृतिक वनस्पति रंगों का उपयोग करके पारंपरिक खड्ड करघे पर बुना गया हल्का शॉल।"}', 
  1299.00, 40, 'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=400&q=80', '["https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=800&q=80"]', true, 0);

INSERT INTO products (id, sku, title_i18n, description_i18n, base_price, stock_quantity, thumbnail_url, images_json, is_active, version)
VALUES (6, 'ART-BOWL-01', 
  '{"en": "Handcrafted Unglazed Clay Bowl Set", "hi": "हस्तनिर्मित बिना पॉलिश वाली मिट्टी का कटोरा सेट", "mr": "हातने बनवलेला अनग्लेज्ड मातीचा वाडगा सेट", "gu": "હાથથી બનાવેલ માટીના વાટકા નો સેટ"}', 
  '{"en": "Traditional unglazed terracotta serving bowls that preserve authentic flavor and minerals.", "hi": "पारंपरिक बिना पॉलिश वाले टेराकोटा परोसने के कटोरे जो प्रामाणिक स्वाद बनाए रखते हैं।"}', 
  549.00, 50, 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&q=80', '["https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80"]', true, 0);

INSERT INTO products (id, sku, title_i18n, description_i18n, base_price, stock_quantity, thumbnail_url, images_json, is_active, version)
VALUES (7, 'ART-BAMBOO-01', 
  '{"en": "Handmade Bamboo Serving Tray", "hi": "हस्तनिर्मित बांस परोसने की ट्रे", "mr": "हातने बनवलेले बांबूचे ट्रे", "gu": "હાથથી બનાવેલી વાંસની પીરસવાની ટ્રે"}', 
  '{"en": "Durable bamboo tray crafted by master weavers in Assam, finished with organic beeswax.", "hi": "असम में मास्टर बुनकरों द्वारा तैयार की गई टिकाऊ बांस की ट्रे, जैविक मोम से परिष्कृत।"}', 
  399.00, 75, 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=400&q=80', '["https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=800&q=80"]', true, 0);

INSERT INTO products (id, sku, title_i18n, description_i18n, base_price, stock_quantity, thumbnail_url, images_json, is_active, version)
VALUES (8, 'ART-CUSHION-01', 
  '{"en": "Hand Block-Printed Cotton Cushion Cover", "hi": "हाथ से ब्लॉक-प्रिंटेड कॉटन कुशन कवर", "mr": "हातने ब्लॉक-प्रिंट केलेले सुती उशीचे कव्हर", "gu": "હાથથી બ્લોક-પ્રિન્ટેડ કોટન કુશન કવર"}', 
  '{"en": "Pure cotton cushion cover block-printed by traditional master artisans using natural indigo.", "hi": "प्राकृतिक नील का उपयोग करके पारंपरिक कारीगरों द्वारा ब्लॉक-प्रिंट किया गया शुद्ध सूती कुशन कवर।"}', 
  399.00, 65, 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&q=80', '["https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80"]', true, 0);
