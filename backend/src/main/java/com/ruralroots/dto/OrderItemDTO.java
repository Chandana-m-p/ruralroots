package com.ruralroots.dto;

import java.math.BigDecimal;

public class OrderItemDTO {
    private Long productId;
    private String productTitle;
    private Integer quantity;
    private BigDecimal unitPrice;

    public OrderItemDTO() {}

    public OrderItemDTO(Long productId, String productTitle, Integer quantity, BigDecimal unitPrice) {
        this.productId = productId;
        this.productTitle = productTitle;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
    }

    public static OrderItemDTOBuilder builder() {
        return new OrderItemDTOBuilder();
    }

    public static class OrderItemDTOBuilder {
        private Long productId;
        private String productTitle;
        private Integer quantity;
        private BigDecimal unitPrice;

        public OrderItemDTOBuilder productId(Long productId) { this.productId = productId; return this; }
        public OrderItemDTOBuilder productTitle(String productTitle) { this.productTitle = productTitle; return this; }
        public OrderItemDTOBuilder quantity(Integer quantity) { this.quantity = quantity; return this; }
        public OrderItemDTOBuilder unitPrice(BigDecimal unitPrice) { this.unitPrice = unitPrice; return this; }

        public OrderItemDTO build() {
            return new OrderItemDTO(productId, productTitle, quantity, unitPrice);
        }
    }

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }
    public String getProductTitle() { return productTitle; }
    public void setProductTitle(String productTitle) { this.productTitle = productTitle; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    public BigDecimal getUnitPrice() { return unitPrice; }
    public void setUnitPrice(BigDecimal unitPrice) { this.unitPrice = unitPrice; }
}
