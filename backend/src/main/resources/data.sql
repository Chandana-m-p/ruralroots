-- Seed Users (Phone OTP logic used for actual logins)
INSERT INTO users (id, phone_number, full_name, role, preferred_language, is_active, created_at) 
VALUES (1, '9876543210', 'Ramesh Patel', 'ROLE_BUYER', 'hi', true, CURRENT_TIMESTAMP());

INSERT INTO users (id, phone_number, full_name, role, preferred_language, is_active, created_at) 
VALUES (2, '9123456789', 'Sunita Devi (Hub Manager)', 'ROLE_HUB_MANAGER', 'hi', true, CURRENT_TIMESTAMP());

INSERT INTO users (id, phone_number, full_name, role, preferred_language, is_active, created_at) 
VALUES (3, '9999999999', 'System Admin', 'ROLE_ADMIN', 'en', true, CURRENT_TIMESTAMP());

-- Seed Village Hubs
INSERT INTO village_hubs (id, hub_code, hub_name, manager_id, pincode, village_name, district, state, landmark, operates_cod, created_at)
VALUES (1, 'HUB-RAMGARH-01', 'Ramgarh Central Kendra (Kalyan Store)', 2, '452001', 'Ramgarh', 'Indore', 'Madhya Pradesh', 'Near Panchayat Bhawan', true, CURRENT_TIMESTAMP());

INSERT INTO village_hubs (id, hub_code, hub_name, manager_id, pincode, village_name, district, state, landmark, operates_cod, created_at)
VALUES (2, 'HUB-CHANDAN-02', 'Chandanpur Rural Hub (Gupta General)', 2, '452002', 'Chandanpur', 'Indore', 'Madhya Pradesh', 'Opposite Bus Stand', true, CURRENT_TIMESTAMP());

-- Seed Multi-lingual Products
INSERT INTO products (id, sku, title_i18n, description_i18n, base_price, stock_quantity, thumbnail_url, images_json, is_active, version)
VALUES (1, 'SEED-WHEAT-05', 
  '{"en": "Hybrid Wheat Seeds (5kg)", "hi": "हाइब्रिड गेहूं का बीज (5 किलो)", "mr": "हायब्रिड गव्हाचे बियाणे (5 किलो)", "gu": "હાઇબ્રિડ ઘઉંનું બીજ (5 કિલો)"}', 
  '{"en": "High yield organic wheat seeds optimized for dry climate.", "hi": "सूखे मौसम के लिए उपयुक्त उच्च उपज वाला जैविक गेहूं बीज।"}', 
  450.00, 100, 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&q=60', '["https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=65"]', true, 0);

INSERT INTO products (id, sku, title_i18n, description_i18n, base_price, stock_quantity, thumbnail_url, images_json, is_active, version)
VALUES (2, 'FERT-NPK-10', 
  '{"en": "Bio NPK Organic Fertilizer (10kg)", "hi": "बायो एनपीके जैविक खाद (10 किलो)", "mr": "बायो एनपीके सेंद्रिय खत (10 किलो)", "gu": "બાયો એનપીકે ઓર્ગેનિક ખાતર (10 કિલો)"}', 
  '{"en": "Balanced NPK soil enhancer for all crops.", "hi": "सभी फसलों के लिए संतुलित जैविक एनपीके मृदा पोषक।"}', 
  620.00, 85, 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=300&q=60', '["https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=600&q=65"]', true, 0);

INSERT INTO products (id, sku, title_i18n, description_i18n, base_price, stock_quantity, thumbnail_url, images_json, is_active, version)
VALUES (3, 'TOOL-SICKLE-01', 
  '{"en": "Forged Steel Harvest Sickle", "hi": "मजबूत स्टील दरांती (हंसिया)", "mr": "मजबूत पोलादी विळा", "gu": "મજબૂત સ્ટીલ દાતરડું"}', 
  '{"en": "Heavy duty ergonomics harvest tool for crop cutting.", "hi": "फसल कटाई के लिए मजबूत और टिकाऊ दरांती।"}', 
  180.00, 50, 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=300&q=60', '["https://images.unsplash.com/photo-1589923188900-85dae523342b?w=600&q=65"]', true, 0);

INSERT INTO products (id, sku, title_i18n, description_i18n, base_price, stock_quantity, thumbnail_url, images_json, is_active, version)
VALUES (4, 'SOLAR-LAMP-01', 
  '{"en": "Rechargeable Solar LED Lantern", "hi": "सोलर एलईडी लालटेन (चार्जिंग)", "mr": "सौर एलईडी कंदील", "gu": "સોલર એડી ફાનસ"}', 
  '{"en": "Dual USB phone charging and 12-hour emergency solar light.", "hi": "फोन चार्जिंग और 12 घंटे की रोशनी देने वाली सोलर लाइट।"}', 
  850.00, 40, 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=300&q=60', '["https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=600&q=65"]', true, 0);
