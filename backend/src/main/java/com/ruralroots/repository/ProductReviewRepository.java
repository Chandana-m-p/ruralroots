package com.ruralroots.repository;

import com.ruralroots.model.ProductReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductReviewRepository extends JpaRepository<ProductReview, Long> {
    List<ProductReview> findByProductIdAndStatusOrderByCreatedAtDesc(Long productId, String status);
    List<ProductReview> findByBuyerId(Long buyerId);
    boolean existsByOrderIdAndProductIdAndBuyerId(Long orderId, Long productId, Long buyerId);
}
