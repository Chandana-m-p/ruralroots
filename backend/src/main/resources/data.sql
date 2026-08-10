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
INSERT INTO products (id, sku, category, title_i18n, description_i18n, base_price, stock_quantity, thumbnail_url, images_json, is_active, version)
VALUES (1, 'ART-VASE-01', 'pottery',
  '{"en": "Handpainted Terracotta Vase", "hi": "हाथ से चित्रित टेराकोटा फूलदान", "mr": "हातने रंगवलेले मातीचे भांडे", "gu": "હાથથી ચીતરેલું ટેરાકોટા ફ્લાવરવાઝ", "kn": "ಹಸ್ತಚಿತ್ರಿತ ಟೆರಾಕೋಟಾ ಹೂದಾನಿ"}', 
  '{"en": "Handcrafted terracotta vase painted with traditional tribal motifs by artisans in Rajasthan.", "hi": "राजस्थान के कारीगरों द्वारा पारंपरिक जनजातीय रूपांकनों के साथ चित्रित हस्तनिर्मित टेराकोटा फूलदान।"}', 
  899.00, 45, 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&q=80', '["https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80"]', true, 0);

INSERT INTO products (id, sku, category, title_i18n, description_i18n, base_price, stock_quantity, thumbnail_url, images_json, is_active, version)
VALUES (2, 'ART-BASKET-01', 'baskets',
  '{"en": "Handwoven Sabai Grass Basket", "hi": "हाथ से बुनी सबाई घास की टोकरी", "mr": "हातने विणलेली सबाई गवताची टोपली", "gu": "હાથથી વણેલી સબાઈ ઘાસની ટોપલી", "kn": "ಕೈಯಿಂದ ನೇಯ್ದ ಸಬಾಯಿ ಹುಲ್ಲಿನ ಬುಟ್ಟಿ"}', 
  '{"en": "Eco-friendly storage basket handwoven from natural Sabai grass fibers by women artisans.", "hi": "महिला कारीगरों द्वारा प्राकृतिक सबाई घास के रेशों से हाथ से बुनी गई पर्यावरण-अनुकूल टोकरी。"}', 
  699.00, 60, 'https://images.unsplash.com/photo-1622560481156-01ac25e4c0ac?w=400&q=80', '["https://images.unsplash.com/photo-1622560481156-01ac25e4c0ac?w=800&q=80"]', true, 0);

INSERT INTO products (id, sku, category, title_i18n, description_i18n, base_price, stock_quantity, thumbnail_url, images_json, is_active, version)
VALUES (3, 'ART-JEWELRY-01', 'jewelry',
  '{"en": "Beaded Tribal Drop Earrings", "hi": "मनके वाले जनजातीय झुमके", "mr": "मण्यांचे आदिवासी कानातले", "gu": "મોતીના આદિવાસી ઝુમખા", "kn": "ಮಣಿಗಳುಳ್ಳ ಗಿರಿಜನ ಕಿವಿಯೋಲೆಗಳು"}', 
  '{"en": "Vibrant beaded drop earrings handmade using recycled glass beads and natural thread.", "hi": "पुनर्चक्रित कांच के मनकों और प्राकृतिक धागे का उपयोग करके हस्तनिर्मित ज्वलंत झुमके।"}', 
  450.00, 80, 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80', '["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80"]', true, 0);

INSERT INTO products (id, sku, category, title_i18n, description_i18n, base_price, stock_quantity, thumbnail_url, images_json, is_active, version)
VALUES (4, 'ART-WOOD-01', 'wood',
  '{"en": "Carved Sheesham Wooden Jewelry Box", "hi": "नक्काशीदार शीशम की लकड़ी का आभूषण डिब्बा", "mr": "कोरलेले शीशम लाकडी दागिण्यांचे बॉक्स", "gu": "કોતરણીવાળું શીશમ લાકડાનું દાગીના બોક્સ", "kn": "ಕೆತ್ತಿದ ಶೀಶಮ್ ಮರದ ಆಭರಣ ಪೆಟ್ಟಿಗೆ"}', 
  '{"en": "Intricately carved wooden box made from sustainably sourced solid Sheesham wood.", "hi": "टिकाऊ शीशम की लकड़ी से बना जटिल नक्काशीदार लकड़ी का डिब्बा।"}', 
  1150.00, 30, 'https://images.unsplash.com/photo-1611486212557-88be5ff6f941?w=400&q=80', '["https://images.unsplash.com/photo-1611486212557-88be5ff6f941?w=800&q=80"]', true, 0);

INSERT INTO products (id, sku, category, title_i18n, description_i18n, base_price, stock_quantity, thumbnail_url, images_json, is_active, version)
VALUES (5, 'ART-STOLE-01', 'clothing',
  '{"en": "Handwoven Organic Cotton Stole", "hi": "हाथ से बुना ऑर्गेनिक कॉटन स्टोल", "mr": "हातने विणलेली सेंद्रिय सुती शाल", "gu": "હાથથી વણેલું ઓર્ગેનિક કોટન સ્ટોલ", "kn": "ಕೈಯಿಂದ ನೇಯ್ದ ಸಾವಯವ ಹತ್ತಿ ಶಾಲು"}', 
  '{"en": "Lightweight breathable stole woven on traditional pit looms using natural vegetable dyes.", "hi": "प्राकृतिक वनस्पति रंगों का उपयोग करके पारंपरिक खड्ड करघे पर बुना गया हल्का शॉल।"}', 
  1299.00, 40, 'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=400&q=80', '["https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=800&q=80"]', true, 0);

INSERT INTO products (id, sku, category, title_i18n, description_i18n, base_price, stock_quantity, thumbnail_url, images_json, is_active, version)
VALUES (6, 'ART-BOWL-01', 'pottery',
  '{"en": "Handcrafted Unglazed Clay Bowl Set", "hi": "हस्तनिर्मित बिना पॉलिश वाली मिट्टी का कटोरा सेट", "mr": "हातने बनवलेला अनग्लेज्ड मातीचा वाडगा सेट", "gu": "હાથથી બનાવેલ માટીના વાટકા નો સેટ", "kn": "ಹಸ್ತನಿರ್ಮಿತ ಮೆರುಗುಗೊಳಿಸದ ಮಣ್ಣಿನ ಬೌಲ್ ಸೆಟ್"}', 
  '{"en": "Traditional unglazed terracotta serving bowls that preserve authentic flavor and minerals.", "hi": "पारंपरिक बिना पॉलिश वाले टेराकोटा परोसने के कटोरे जो प्रामाणिक स्वाद बनाए रखते हैं।"}', 
  549.00, 50, 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&q=80', '["https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80"]', true, 0);

INSERT INTO products (id, sku, category, title_i18n, description_i18n, base_price, stock_quantity, thumbnail_url, images_json, is_active, version)
VALUES (7, 'ART-BAMBOO-01', 'bamboo',
  '{"en": "Handmade Bamboo Serving Tray", "hi": "हस्तनिर्मित बांस परोसने की ट्रे", "mr": "हातने बनवलेले बांबूचे ट्रे", "gu": "હાથથી બનાવેલી વાંસની પીરસવાની ટ્રે", "kn": "ಹಸ್ತನಿರ್ಮಿತ ಬಿದಿರಿನ ಬಡಿಸುವ ಟ್ರೇ"}', 
  '{"en": "Durable bamboo tray crafted by master weavers in Assam, finished with organic beeswax.", "hi": "असम में मास्टर बुनकरों द्वारा तैयार की गई टिकाऊ बांस की ट्रे, जैविक मोम से परिष्कृत।"}', 
  399.00, 75, 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=400&q=80', '["https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=800&q=80"]', true, 0);

INSERT INTO products (id, sku, category, title_i18n, description_i18n, base_price, stock_quantity, thumbnail_url, images_json, is_active, version)
VALUES (8, 'ART-CUSHION-01', 'decor',
  '{"en": "Hand Block-Printed Cotton Cushion Cover", "hi": "हाथ से ब्लॉक-प्रिंटेड कॉटन कुशन कवर", "mr": "हातने ब्लॉक-प्रिंट केलेले सुती उशीचे कव्हर", "gu": "હાથથી બ્લોક-प्रિન્ટેડ કોટન કુશન કવર"}', 
  '{"en": "Pure cotton cushion cover block-printed by traditional master artisans using natural indigo.", "hi": "प्राकृतिक नील का उपयोग करके पारंपरिक कारीगरों द्वारा ब्लॉक-प्रिंट किया गया शुद्ध सूती कुशन कवर。"}', 
  399.00, 65, 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&q=80', '["https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80"]', true, 0);

INSERT INTO products (id, sku, category, title_i18n, description_i18n, base_price, stock_quantity, thumbnail_url, images_json, is_active, version)
VALUES (9, 'ART-PAINTING-01', 'decor',
  '{"en": "Handpainted Madhubani Folk Art Canvas", "hi": "हाथ से चित्रित मधुबनी लोक कला कैनवास", "mr": "हातने रंगवलेले मधुबनी लोककला कॅनव्हास", "gu": "હાથથી ચીતરેલું મધુબની લોકકળા કેનવાસ"}',
  '{"en": "Authentic Madhubani painting painted on handmade canvas by Mithila women artisans.", "hi": "मिथिला की महिला कारीगरों द्वारा हस्तनिर्मित कैनवास पर बनाई गई प्रामाणिक मधुबनी पेंटिंग。"}',
  1499.00, 25, 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=400&q=80', '["https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&q=80"]', true, 0);

INSERT INTO products (id, sku, category, title_i18n, description_i18n, base_price, stock_quantity, thumbnail_url, images_json, is_active, version)
VALUES (10, 'ART-TEA-01', 'pottery',
  '{"en": "Jaipur Blue Pottery Ceramic Tea Set", "hi": "जयपुर ब्लू पॉटरी सिरेमिक टी सेट", "mr": "जयपूर ब्लू पॉटरी सिरॅमिक टी सेट", "gu": "જયપુર બ્લુ પોટરી સિરામિક ટી સેટ"}',
  '{"en": "Exquisite 6-piece glazed blue pottery tea set handcrafted using quartz stone in Jaipur.", "hi": "जयपुर में क्वार्ट्ज पत्थर का उपयोग करके हस्तनिर्मित उत्कृष्ट 6-पीस ब्लू पॉटरी टी सेट。"}',
  1850.00, 20, 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80', '["https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80"]', true, 0);

INSERT INTO products (id, sku, category, title_i18n, description_i18n, base_price, stock_quantity, thumbnail_url, images_json, is_active, version)
VALUES (11, 'ART-BRASS-01', 'decor',
  '{"en": "Bastar Brass Dhokra Tribal Elephant Craft", "hi": "बस्तर पीतल ढोकरा जनजातीय हाथी शिल्प", "mr": "बस्तर पितळ ढोकरा आदिवासी हत्ती कलाकृती", "gu": "બસ્તર પિત્તળ ઢોકરા આદિવાસી હાથી ક્રાફ્ટ"}',
  '{"en": "Ancient lost-wax cast brass elephant figurine handcrafted by Dhokra metal artisans of Chhattisgarh.", "hi": "छत्तीसगढ़ के ढोकरा धातु कारीगरों द्वारा हस्तनिर्मित पीतल का हाथी。"}',
  1650.00, 15, 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&q=80', '["https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&q=80"]', true, 0);

INSERT INTO products (id, sku, category, title_i18n, description_i18n, base_price, stock_quantity, thumbnail_url, images_json, is_active, version)
VALUES (12, 'ART-JUTTI-01', 'clothing',
  '{"en": "Handcrafted Embroidered Leather Mojari", "hi": "हस्तनिर्मित कढ़ाईदार चमड़े की मोजरी", "mr": "हातने बनवलेली नक्षीदार कातडी मोजडी", "gu": "હાથથી બનાવેલી એમ્બ્રોયડરી વાળી ચામડાની મોજડી"}',
  '{"en": "Traditional Rajasthani ethnic leather jutti embroidered with silk threads and mirrors.", "hi": "रेशम के धागों और शीशों से कढ़ी हुई पारंपरिक राजस्थानी एथनिक लेदर जूती。"}',
  999.00, 35, 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80', '["https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80"]', true, 0);

INSERT INTO products (id, sku, category, title_i18n, description_i18n, base_price, stock_quantity, thumbnail_url, images_json, is_active, version)
VALUES (13, 'ART-TOYS-01', 'wood',
  '{"en": "Channapatna Eco Wooden Stacking Toys", "hi": "चन्नापटना इको वुडन स्टैकिंग खिलौने", "mr": "चन्नापटना इको लाकडी खेळणी", "gu": "ચન્નપટના ઈકો વૂડન રમકડાં"}',
  '{"en": "Non-toxic lac-turnery wooden toys crafted with natural vegetable dyes in Karnataka.", "hi": "कर्नाटक में प्राकृतिक वनस्पति रंगों से तैयार किए गए गैर-विषैले लकड़ी के खिलौने。"}',
  650.00, 55, 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&q=80', '["https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&q=80"]', true, 0);

INSERT INTO products (id, sku, category, title_i18n, description_i18n, base_price, stock_quantity, thumbnail_url, images_json, is_active, version)
VALUES (14, 'ART-SCROLL-01', 'decor',
  '{"en": "Odisha Pattachitra Palm Leaf Scroll", "hi": "ओडिशा पट्टचित्र ताड़ के पत्ते की स्क्रॉल चित्रकारी", "mr": "ओडिशा पट्टचित्र ताडाच्या पानांचे स्क्रोल चित्र", "gu": "ઓડિશા પટ્ટાચિત્ર તાળના પાંદડાની સ્ક્ર્રોલ ચિત્રકળા"}',
  '{"en": "Intricate mythology story carved and painted on seasoned palm leaves by Raghurajpur artisans.", "hi": "रघुराजपुर के कारीगरों द्वारा ताड़ के पत्तों पर उकेरी गई और चित्रित की गई पौराणिक कहानी。"}',
  2100.00, 10, 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400&q=80', '["https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&q=80"]', true, 0);

INSERT INTO products (id, sku, category, title_i18n, description_i18n, base_price, stock_quantity, thumbnail_url, images_json, is_active, version)
VALUES (15, 'ART-BRASS-02', 'appliances',
  '{"en": "Hand-Hammered Kansa Bronze Thali Set", "hi": "हाथ से निर्मित कांसा थाली सेट", "mr": "हातने बनवलेला कांस्य ताट संच", "gu": "હાથથી બનાવેલ કાંસાની થાળી સેટ", "kn": "ಹಸ್ತನಿರ್ಮಿತ ಕಂಚಿನ ಊಟದ ತಟ್ಟೆ ಸೆಟ್"}',
  '{"en": "Traditional 5-piece hand-hammered Kansa bell metal dinner set crafted by hereditary coppersmiths of Odisha.", "hi": "ओडिशा के कारीगरों द्वारा पारंपरिक 5-पीस हस्तनिर्मित कांसा थाली सेट。"}',
  2499.00, 25, 'https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=400&q=80', '["https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=800&q=80"]', true, 0);

INSERT INTO products (id, sku, category, title_i18n, description_i18n, base_price, stock_quantity, thumbnail_url, images_json, is_active, version)
VALUES (16, 'ART-CLOTH-04', 'clothing',
  '{"en": "Hand-Tied Kutch Bandhani Silk Dupatta", "hi": "हाथ से बंधाई कच्ची बांधनी सिल्क दुपट्टा", "mr": "हातने बांधलेली कच्छी बांधणी रेशमी शाल", "gu": "હાથથી બાંધેલું કચ્છ બાંધણી સિલ્ક દુપટ્ટો", "kn": "ಕೈಯಿಂದ ಕಟ್ಟಿದ ಕಚ್ ಬಾಂದಿನಿ ರೇಷ್ಮೆ ದುಪಟ್ಟಾ"}',
  '{"en": "Vibrant pure silk dupatta with fine hand-tied tie-dye knots created by women artisans of Kutch.", "hi": "कच्छ की महिला कारीगरों द्वारा हस्तनिर्मित बंधाई और रंगाई के साथ जीवंत शुद्ध रेशमी दुपट्टा。"}',
  1850.00, 35, 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&q=80', '["https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80"]', true, 0);

INSERT INTO products (id, sku, category, title_i18n, description_i18n, base_price, stock_quantity, thumbnail_url, images_json, is_active, version)
VALUES (17, 'ART-FOOD-03', 'food',
  '{"en": "Kachi Ghani Cold-Pressed Mustard Oil", "hi": "काची घानी कच्चा सरसों का तेल", "mr": "लाकडी घाण्याचे लाकूड दाबलेले मोहरीचे तेल", "gu": "કાચી ઘાણી શુદ્ધ રાઈનું તેલ", "kn": "ಕಚ್ಚಾ ಗಾಣದ ಸಾಸಿವೆ ಎಣ್ಣೆ"}',
  '{"en": "Pure 100% unrefined cold-pressed mustard oil extracted using traditional wooden ghani mills in rural Rajasthan.", "hi": "पारंपरिक लकड़ी की घानी से निकाला गया 100% शुद्ध अपरिष्कृत सरसों का तेल。"}',
  349.00, 150, 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80', '["https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80"]', true, 0);

INSERT INTO products (id, sku, category, title_i18n, description_i18n, base_price, stock_quantity, thumbnail_url, images_json, is_active, version)
VALUES (18, 'ART-TOYS-02', 'wood',
  '{"en": "Kondapalli Wooden Bullock Cart Toy", "hi": "कोंडापल्ली लकड़ी की बैलगाड़ी खिलौना", "mr": "कोंडापल्ली लाकडी बैलगाडीचे खेळणे", "gu": "કોંડાપલ્લી લાકડાની બળદગાડી રમકડું", "kn": "ಹಸ್ತನಿರ್ಮಿತ ಕೊಂಡಪಲ್ಲಿ ಮರದ ಎತ್ತಿನ ಬಂಡಿ"}',
  '{"en": "Traditional eco-friendly wooden bullock cart toy painted with non-toxic vegetable colors by Kondapalli artisans.", "hi": "गैर-विषैले वनस्पति रंगों से पेंट की गई पारंपरिक लकड़ी की बैलगाड़ी का खिलौना。"}',
  799.00, 40, 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&q=80', '["https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&q=80"]', true, 0);

INSERT INTO products (id, sku, category, title_i18n, description_i18n, base_price, stock_quantity, thumbnail_url, images_json, is_active, version)
VALUES (19, 'ART-HEALTH-03', 'healthcare',
  '{"en": "Organic Khus Vetiver Soap Bar Set", "hi": "जैविक खस हर्बल स्नान साबुन सेट", "mr": "सेंद्रिय वाळा हर्बल आंघोळीचा साबण सेट", "gu": "ઓર્ગેનિક વાળા હર્બલ સાબુ સેટ", "kn": "ಸಾವಯವ ಬಿಳಿಚಿಕು ನೈಸರ್ಗಿಕ ಸ್ನಾನದ ಸಾಬೂನು"}',
  '{"en": "Set of 3 cold-processed coconut & vetiver root soaps hand-blended by women self-help groups.", "hi": "महिला स्वयं सहायता समूहों द्वारा हस्तनिर्मित नारियल और खस की जड़ से बने हर्बल साबुन。"}',
  299.00, 100, 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=400&q=80', '["https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=800&q=80"]', true, 0);

INSERT INTO products (id, sku, category, title_i18n, description_i18n, base_price, stock_quantity, thumbnail_url, images_json, is_active, version)
VALUES (20, 'ART-DECOR-02', 'decor',
  '{"en": "Natural Braided Jute Floor Runner Rug", "hi": "प्राकृतिक बुना हुआ जूट फ्लोर रनर", "mr": "न नैसर्गिक ज्यूटचा मॅट रनर", "gu": "કુદરતી ક્ષણની મેટ રનર", "kn": "ನೈಸರ್ಗಿಕ ಸೆಣಬಿನ ನೆಲದ ಹಾಸು"}',
  '{"en": "Eco-friendly natural jute floor runner rug braided on traditional handlooms for rustic home interiors.", "hi": "देसी घरेलू सजावट के लिए पारंपरिक हथकरघे पर बुना गया प्राकृतिक जूट फ्लोर रनर。"}',
  1399.00, 30, 'https://images.unsplash.com/photo-1622560481156-01ac25e4c0ac?w=400&q=80', '["https://images.unsplash.com/photo-1622560481156-01ac25e4c0ac?w=800&q=80"]', true, 0);

-- Seed Orders with required Status Management States:
-- 1. Delivered Successfully
-- 2. Delivered Unsuccessfully
-- 3. Cancelled

INSERT INTO orders (id, order_number, idempotency_key, buyer_id, hub_id, order_status, payment_type, payment_status, total_amount, offline_created_at, synced_at, delivery_date)
VALUES (1, 'RR-889101', 'a1111111-1111-1111-1111-111111111111', 1, 1, 'Delivered Successfully', 'UPI', 'PAID', 1150.00, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), DATEADD('DAY', -2, CURRENT_TIMESTAMP()));

INSERT INTO order_items (id, order_id, product_id, quantity, unit_price)
VALUES (1, 1, 4, 1, 1150.00);

INSERT INTO orders (id, order_number, idempotency_key, buyer_id, hub_id, order_status, payment_type, payment_status, total_amount, offline_created_at, synced_at, delivery_date)
VALUES (2, 'RR-889102', 'a2222222-2222-2222-2222-222222222222', 1, 1, 'Delivered Unsuccessfully', 'COD', 'UNPAID', 899.00, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), DATEADD('DAY', -1, CURRENT_TIMESTAMP()));

INSERT INTO order_items (id, order_id, product_id, quantity, unit_price)
VALUES (2, 2, 1, 1, 899.00);

INSERT INTO orders (id, order_number, idempotency_key, buyer_id, hub_id, order_status, payment_type, payment_status, total_amount, offline_created_at, synced_at, delivery_date)
VALUES (3, 'RR-889103', 'a3333333-3333-3333-3333-333333333333', 1, 2, 'Cancelled', 'CARD', 'REFUNDED', 699.00, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), DATEADD('DAY', 0, CURRENT_TIMESTAMP()));

INSERT INTO order_items (id, order_id, product_id, quantity, unit_price)
VALUES (3, 3, 2, 1, 699.00);

-- Seed Verified Post-Purchase Reviews
INSERT INTO product_reviews (id, product_id, order_id, buyer_id, buyer_name, overall_rating, title, comment, is_verified_purchase, helpful_votes, status, created_at)
VALUES (1, 1, 1, 1, 'Sunita Devi', 5, 'Exquisite Terracotta Craftsmanship!', 'The finish on this vase is stunning. You can feel the authentic texture of genuine earthenware made by master artisans.', true, 8, 'PUBLISHED', CURRENT_TIMESTAMP());

INSERT INTO review_attributes (id, review_id, attribute_name, rating_score)
VALUES (1, 1, 'quality', 5), (2, 1, 'material_authenticity', 5), (3, 1, 'value_for_money', 4);

INSERT INTO review_media (id, review_id, media_type, url, created_at)
VALUES (1, 1, 'IMAGE', 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80', CURRENT_TIMESTAMP());

INSERT INTO product_reviews (id, product_id, order_id, buyer_id, buyer_name, overall_rating, title, comment, is_verified_purchase, helpful_votes, status, created_at)
VALUES (2, 5, 1, 1, 'Ananya Sharma', 5, 'Pure Luxury Organic Cotton Stole', 'Lightweight and incredibly soft. Woven on pit looms using natural dyes. Absolutely love supporting this weaver!', true, 12, 'PUBLISHED', CURRENT_TIMESTAMP());

INSERT INTO review_attributes (id, review_id, attribute_name, rating_score)
VALUES (4, 2, 'quality', 5), (5, 2, 'material_authenticity', 5), (6, 2, 'value_for_money', 5);

INSERT INTO review_media (id, review_id, media_type, url, created_at)
VALUES (2, 2, 'IMAGE', 'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=800&q=80', CURRENT_TIMESTAMP());

