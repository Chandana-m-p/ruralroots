package com.ruralroots.service;

import com.ruralroots.dto.ProductDTO;
import com.ruralroots.model.Product;
import com.ruralroots.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<ProductDTO> getAllActiveProducts() {
        return productRepository.findByIsActiveTrue().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public ProductDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found with id: " + id));
        return mapToDTO(product);
    }

    private ProductDTO mapToDTO(Product p) {
        return ProductDTO.builder()
                .id(p.getId())
                .sku(p.getSku())
                .category(p.getCategory())
                .titleI18n(p.getTitleI18n())
                .descriptionI18n(p.getDescriptionI18n())
                .basePrice(p.getBasePrice())
                .stockQuantity(p.getStockQuantity())
                .thumbnailUrl(p.getThumbnailUrl())
                .imagesJson(p.getImagesJson())
                .isActive(p.getIsActive())
                .build();
    }
}
