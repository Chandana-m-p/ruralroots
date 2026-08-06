package com.ruralroots.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String sku;

    @Column(name = "title_i18n", nullable = false, columnDefinition = "TEXT")
    private String titleI18n;

    @Column(name = "description_i18n", nullable = false, columnDefinition = "TEXT")
    private String descriptionI18n;

    @Column(name = "base_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal basePrice;

    @Column(name = "stock_quantity", nullable = false)
    private Integer stockQuantity;

    @Column(name = "thumbnail_url", nullable = false, length = 255)
    private String thumbnailUrl;

    @Column(name = "images_json", nullable = false, columnDefinition = "TEXT")
    private String imagesJson;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @Version
    @Column(nullable = false)
    private Long version = 0L;

    public Product() {}

    public Product(Long id, String sku, String titleI18n, String descriptionI18n, BigDecimal basePrice, Integer stockQuantity, String thumbnailUrl, String imagesJson, Boolean isActive, Long version) {
        this.id = id;
        this.sku = sku;
        this.titleI18n = titleI18n;
        this.descriptionI18n = descriptionI18n;
        this.basePrice = basePrice;
        this.stockQuantity = stockQuantity;
        this.thumbnailUrl = thumbnailUrl;
        this.imagesJson = imagesJson;
        this.isActive = isActive != null ? isActive : true;
        this.version = version != null ? version : 0L;
    }

    public static ProductBuilder builder() {
        return new ProductBuilder();
    }

    public static class ProductBuilder {
        private Long id;
        private String sku;
        private String titleI18n;
        private String descriptionI18n;
        private BigDecimal basePrice;
        private Integer stockQuantity;
        private String thumbnailUrl;
        private String imagesJson;
        private Boolean isActive = true;
        private Long version = 0L;

        public ProductBuilder id(Long id) { this.id = id; return this; }
        public ProductBuilder sku(String sku) { this.sku = sku; return this; }
        public ProductBuilder titleI18n(String titleI18n) { this.titleI18n = titleI18n; return this; }
        public ProductBuilder descriptionI18n(String descriptionI18n) { this.descriptionI18n = descriptionI18n; return this; }
        public ProductBuilder basePrice(BigDecimal basePrice) { this.basePrice = basePrice; return this; }
        public ProductBuilder stockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; return this; }
        public ProductBuilder thumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; return this; }
        public ProductBuilder imagesJson(String imagesJson) { this.imagesJson = imagesJson; return this; }
        public ProductBuilder isActive(Boolean isActive) { this.isActive = isActive; return this; }
        public ProductBuilder version(Long version) { this.version = version; return this; }

        public Product build() {
            return new Product(id, sku, titleI18n, descriptionI18n, basePrice, stockQuantity, thumbnailUrl, imagesJson, isActive, version);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }
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
    public Long getVersion() { return version; }
    public void setVersion(Long version) { this.version = version; }
}
