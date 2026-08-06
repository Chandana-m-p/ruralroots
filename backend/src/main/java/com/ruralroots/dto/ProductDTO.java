package com.ruralroots.dto;

import java.math.BigDecimal;

public class ProductDTO {
    private Long id;
    private String sku;
    private String category;
    private String titleI18n;
    private String descriptionI18n;
    private BigDecimal basePrice;
    private Integer stockQuantity;
    private String thumbnailUrl;
    private String imagesJson;
    private Boolean isActive;

    public ProductDTO() {}

    public ProductDTO(Long id, String sku, String category, String titleI18n, String descriptionI18n, BigDecimal basePrice, Integer stockQuantity, String thumbnailUrl, String imagesJson, Boolean isActive) {
        this.id = id;
        this.sku = sku;
        this.category = category;
        this.titleI18n = titleI18n;
        this.descriptionI18n = descriptionI18n;
        this.basePrice = basePrice;
        this.stockQuantity = stockQuantity;
        this.thumbnailUrl = thumbnailUrl;
        this.imagesJson = imagesJson;
        this.isActive = isActive;
    }

    public static ProductDTOBuilder builder() {
        return new ProductDTOBuilder();
    }

    public static class ProductDTOBuilder {
        private Long id;
        private String sku;
        private String category;
        private String titleI18n;
        private String descriptionI18n;
        private BigDecimal basePrice;
        private Integer stockQuantity;
        private String thumbnailUrl;
        private String imagesJson;
        private Boolean isActive;

        public ProductDTOBuilder id(Long id) { this.id = id; return this; }
        public ProductDTOBuilder sku(String sku) { this.sku = sku; return this; }
        public ProductDTOBuilder category(String category) { this.category = category; return this; }
        public ProductDTOBuilder titleI18n(String titleI18n) { this.titleI18n = titleI18n; return this; }
        public ProductDTOBuilder descriptionI18n(String descriptionI18n) { this.descriptionI18n = descriptionI18n; return this; }
        public ProductDTOBuilder basePrice(BigDecimal basePrice) { this.basePrice = basePrice; return this; }
        public ProductDTOBuilder stockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; return this; }
        public ProductDTOBuilder thumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; return this; }
        public ProductDTOBuilder imagesJson(String imagesJson) { this.imagesJson = imagesJson; return this; }
        public ProductDTOBuilder isActive(Boolean isActive) { this.isActive = isActive; return this; }

        public ProductDTO build() {
            return new ProductDTO(id, sku, category, titleI18n, descriptionI18n, basePrice, stockQuantity, thumbnailUrl, imagesJson, isActive);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getTitleI18n() { return titleI18n; }
    public void setTitleI18n(String titleI18n) { this.titleI18n = titleI18n; }
    public String getDescriptionI18n() { return descriptionI18n; }
    public void setDescriptionI18n(String descriptionI18n) { this.descriptionI18n = descriptionI18n; }
    public BigDecimal getBasePrice() { return basePrice; }
    public void setBasePrice(BigDecimal basePrice) { this.basePrice = basePrice; }
    public Integer getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; }
    public String getThumbnailUrl() { return thumbnailUrl; }
    public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }
    public String getImagesJson() { return imagesJson; }
    public void setImagesJson(String imagesJson) { this.imagesJson = imagesJson; }
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
}
