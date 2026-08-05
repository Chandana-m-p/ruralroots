package com.ruralroots.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String sku;

    @Column(name = "title_i18n", nullable = false, columnDefinition = "TEXT")
    private String titleI18n; // Stored as JSON String e.g. {"en": "...", "hi": "..."}

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
    @Builder.Default
    private Boolean isActive = true;

    @Version
    @Column(nullable = false)
    @Builder.Default
    private Long version = 0L;
}
