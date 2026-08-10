-- =============================================================================
-- RuralRoots — Flyway Migration V3: Add Order Service Requests Table
-- =============================================================================

CREATE TABLE IF NOT EXISTS order_service_requests (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id BIGINT REFERENCES products(id) ON DELETE RESTRICT,
    buyer_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    request_type VARCHAR(30) NOT NULL CHECK (request_type IN ('CANCELLATION', 'RETURN', 'EXCHANGE')),
    reason_category VARCHAR(100) NOT NULL,
    detailed_comments TEXT NOT NULL,
    replacement_product_id BIGINT REFERENCES products(id) ON DELETE SET NULL,
    request_status VARCHAR(50) NOT NULL DEFAULT 'PENDING_APPROVAL',
    refund_amount NUMERIC(12, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_service_requests_order_id ON order_service_requests(order_id);
CREATE INDEX IF NOT EXISTS idx_service_requests_buyer_id ON order_service_requests(buyer_id);
