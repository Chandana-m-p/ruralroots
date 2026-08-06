-- =============================================================================
-- RuralRoots — Production PostgreSQL 15 DDL Schema Definition (Flyway Migration V1)
-- =============================================================================

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    phone_number VARCHAR(20) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'ROLE_BUYER',
    preferred_language VARCHAR(10) DEFAULT 'en',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Unique index & constraint on users.phone_number
CREATE UNIQUE INDEX IF NOT EXISTS uk_users_phone_number ON users (phone_number);

-- 2. VILLAGE HUBS TABLE
CREATE TABLE IF NOT EXISTS village_hubs (
    id BIGSERIAL PRIMARY KEY,
    hub_code VARCHAR(50) NOT NULL,
    hub_name VARCHAR(255) NOT NULL,
    manager_id BIGINT,
    pincode VARCHAR(10) NOT NULL,
    village_name VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    landmark VARCHAR(255),
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    operates_cod BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_village_hubs_manager FOREIGN KEY (manager_id) REFERENCES users (id) ON DELETE SET NULL
);

-- Unique index on hub_code
CREATE UNIQUE INDEX IF NOT EXISTS uk_village_hubs_code ON village_hubs (hub_code);

-- 3. PRODUCTS TABLE WITH JSONB MULTI-LINGUAL DATA
CREATE TABLE IF NOT EXISTS products (
    id BIGSERIAL PRIMARY KEY,
    sku VARCHAR(100) NOT NULL,
    category VARCHAR(100) DEFAULT 'pottery',
    title_i18n TEXT NOT NULL,
    description_i18n TEXT NOT NULL,
    base_price NUMERIC(12, 2) NOT NULL CHECK (base_price >= 0),
    stock_quantity INT NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    thumbnail_url TEXT,
    images_json TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    version BIGINT DEFAULT 0
);

-- Unique index on sku
CREATE UNIQUE INDEX IF NOT EXISTS uk_products_sku ON products (sku);

-- Indexes for multi-lingual JSON queries
CREATE INDEX IF NOT EXISTS idx_products_title_i18n_gin ON products (title_i18n);
CREATE INDEX IF NOT EXISTS idx_products_desc_i18n_gin ON products (description_i18n);
CREATE INDEX IF NOT EXISTS idx_products_category ON products (category);

-- 4. ORDERS TABLE WITH UUID IDEMPOTENCY KEY
CREATE TABLE IF NOT EXISTS orders (
    id BIGSERIAL PRIMARY KEY,
    order_number VARCHAR(50) NOT NULL,
    idempotency_key UUID NOT NULL,
    buyer_id BIGINT NOT NULL,
    hub_id BIGINT NOT NULL,
    order_status VARCHAR(50) NOT NULL DEFAULT 'CONFIRMED',
    payment_type VARCHAR(50) NOT NULL DEFAULT 'COD',
    payment_status VARCHAR(50) NOT NULL DEFAULT 'UNPAID',
    total_amount NUMERIC(12, 2) NOT NULL CHECK (total_amount >= 0),
    offline_created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    synced_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    delivery_date TIMESTAMP WITH TIME ZONE,
    cancellation_reason VARCHAR(255),
    cancelled_at TIMESTAMP WITH TIME ZONE,
    CONSTRAINT fk_orders_buyer FOREIGN KEY (buyer_id) REFERENCES users (id) ON DELETE RESTRICT,
    CONSTRAINT fk_orders_hub FOREIGN KEY (hub_id) REFERENCES village_hubs (id) ON DELETE RESTRICT
);

-- Unique indexes on order_number and idempotency_key for zero duplicate orders
CREATE UNIQUE INDEX IF NOT EXISTS uk_orders_number ON orders (order_number);
CREATE UNIQUE INDEX IF NOT EXISTS uk_orders_idempotency_key ON orders (idempotency_key);

-- 5. ORDER ITEMS TABLE WITH CASCADE CONSTRAINTS
CREATE TABLE IF NOT EXISTS order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(12, 2) NOT NULL CHECK (unit_price >= 0),
    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE,
    CONSTRAINT fk_order_items_product FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE RESTRICT
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items (order_id);

-- 6. PRODUCT REVIEWS TABLES
CREATE TABLE IF NOT EXISTS product_reviews (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL,
    order_id BIGINT NOT NULL,
    buyer_id BIGINT NOT NULL,
    buyer_name VARCHAR(255) DEFAULT 'Anonymous Artisan Supporter',
    overall_rating INT NOT NULL CHECK (overall_rating BETWEEN 1 AND 5),
    title VARCHAR(150) NOT NULL,
    comment TEXT NOT NULL,
    is_verified_purchase BOOLEAN DEFAULT TRUE,
    helpful_votes INT DEFAULT 0,
    status VARCHAR(30) DEFAULT 'PUBLISHED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_reviews_product FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE,
    CONSTRAINT fk_reviews_order FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE,
    CONSTRAINT fk_reviews_buyer FOREIGN KEY (buyer_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS review_attributes (
    id BIGSERIAL PRIMARY KEY,
    review_id BIGINT NOT NULL,
    attribute_name VARCHAR(50) NOT NULL,
    rating_score INT NOT NULL CHECK (rating_score BETWEEN 1 AND 5),
    CONSTRAINT fk_attributes_review FOREIGN KEY (review_id) REFERENCES product_reviews (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS review_media (
    id BIGSERIAL PRIMARY KEY,
    review_id BIGINT NOT NULL,
    media_type VARCHAR(20) NOT NULL,
    url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_media_review FOREIGN KEY (review_id) REFERENCES product_reviews (id) ON DELETE CASCADE
);

