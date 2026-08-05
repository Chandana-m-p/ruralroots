package com.ruralroots.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private Long id;
    private String sku;
    private String titleI18n; // JSON String e.g. {"en": "...", "hi": "..."}
    private String descriptionI18n;
    private BigDecimal basePrice;
    private Integer stockQuantity;
    private String thumbnailUrl;
    private String imagesJson;
    private Boolean isActive;
}
