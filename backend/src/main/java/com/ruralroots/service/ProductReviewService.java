package com.ruralroots.service;

import com.ruralroots.dto.*;
import com.ruralroots.model.ProductReview;
import com.ruralroots.model.ReviewAttribute;
import com.ruralroots.model.ReviewMedia;
import com.ruralroots.repository.ProductReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductReviewService {

    @Autowired
    private ProductReviewRepository reviewRepository;

    public List<ProductReviewDTO> getReviewsByProduct(Long productId) {
        List<ProductReview> reviews = reviewRepository.findByProductIdAndStatusOrderByCreatedAtDesc(productId, "PUBLISHED");
        return reviews.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public ReviewSummaryDTO getReviewSummaryByProduct(Long productId) {
        List<ProductReview> reviews = reviewRepository.findByProductIdAndStatusOrderByCreatedAtDesc(productId, "PUBLISHED");
        if (reviews.isEmpty()) {
            Map<Integer, Long> emptyDist = new HashMap<>();
            for (int i = 1; i <= 5; i++) emptyDist.put(i, 0L);
            return new ReviewSummaryDTO(0.0, 0L, emptyDist, new HashMap<>());
        }

        double avgRating = reviews.stream().mapToInt(ProductReview::getOverallRating).average().orElse(0.0);
        long totalReviews = reviews.size();

        Map<Integer, Long> dist = new HashMap<>();
        for (int i = 1; i <= 5; i++) dist.put(i, 0L);
        reviews.forEach(r -> dist.put(r.getOverallRating(), dist.getOrDefault(r.getOverallRating(), 0L) + 1));

        Map<String, List<Integer>> attrScores = new HashMap<>();
        reviews.forEach(r -> r.getAttributes().forEach(a -> {
            attrScores.computeIfAbsent(a.getAttributeName(), k -> new ArrayList<>()).add(a.getRatingScore());
        }));

        Map<String, Double> attrAverages = new HashMap<>();
        attrScores.forEach((key, valList) -> {
            double avg = valList.stream().mapToInt(Integer::intValue).average().orElse(0.0);
            attrAverages.put(key, Math.round(avg * 10.0) / 10.0);
        });

        return new ReviewSummaryDTO(Math.round(avgRating * 100.0) / 100.0, totalReviews, dist, attrAverages);
    }

    public ProductReviewDTO createReview(Long buyerId, String buyerName, ReviewCreateRequestDTO req) {
        ProductReview review = new ProductReview();
        review.setProductId(req.getProductId());
        review.setOrderId(req.getOrderId() != null ? req.getOrderId() : 1L);
        review.setBuyerId(buyerId != null ? buyerId : 1L);
        review.setBuyerName(buyerName != null ? buyerName : "Verified Buyer");
        review.setOverallRating(req.getOverallRating());
        review.setTitle(req.getTitle());
        review.setComment(req.getComment());
        review.setIsVerifiedPurchase(true);
        review.setHelpfulVotes(0);
        review.setStatus("PUBLISHED");
        review.setCreatedAt(ZonedDateTime.now());

        if (req.getAttributes() != null) {
            for (ReviewAttributeDTO a : req.getAttributes()) {
                ReviewAttribute attr = new ReviewAttribute(null, review, a.getAttributeName(), a.getRatingScore());
                review.addAttribute(attr);
            }
        }

        if (req.getMediaList() != null) {
            for (ReviewMediaDTO m : req.getMediaList()) {
                ReviewMedia media = new ReviewMedia(null, review, m.getMediaType(), m.getUrl());
                review.addMedia(media);
            }
        }

        ProductReview saved = reviewRepository.save(review);
        return mapToDTO(saved);
    }

    public boolean incrementHelpfulVotes(Long reviewId) {
        Optional<ProductReview> opt = reviewRepository.findById(reviewId);
        if (opt.isPresent()) {
            ProductReview r = opt.get();
            r.setHelpfulVotes(r.getHelpfulVotes() + 1);
            reviewRepository.save(r);
            return true;
        }
        return false;
    }

    private ProductReviewDTO mapToDTO(ProductReview r) {
        List<ReviewAttributeDTO> attrs = r.getAttributes().stream()
                .map(a -> new ReviewAttributeDTO(a.getAttributeName(), a.getRatingScore()))
                .collect(Collectors.toList());

        List<ReviewMediaDTO> media = r.getMediaList().stream()
                .map(m -> new ReviewMediaDTO(m.getMediaType(), m.getUrl()))
                .collect(Collectors.toList());

        return new ProductReviewDTO(
                r.getId(),
                r.getProductId(),
                r.getOrderId(),
                r.getBuyerId(),
                r.getBuyerName(),
                r.getOverallRating(),
                r.getTitle(),
                r.getComment(),
                r.getIsVerifiedPurchase(),
                r.getHelpfulVotes(),
                r.getStatus(),
                r.getCreatedAt(),
                attrs,
                media
        );
    }
}
