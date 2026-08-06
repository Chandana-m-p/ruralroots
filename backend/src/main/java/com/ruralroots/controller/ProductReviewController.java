package com.ruralroots.controller;

import com.ruralroots.dto.ProductReviewDTO;
import com.ruralroots.dto.ReviewCreateRequestDTO;
import com.ruralroots.dto.ReviewSummaryDTO;
import com.ruralroots.service.ProductReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class ProductReviewController {

    @Autowired
    private ProductReviewService reviewService;

    @GetMapping("/products/{productId}/reviews")
    public ResponseEntity<Map<String, Object>> getProductReviews(@PathVariable Long productId) {
        List<ProductReviewDTO> reviews = reviewService.getReviewsByProduct(productId);
        ReviewSummaryDTO summary = reviewService.getReviewSummaryByProduct(productId);

        Map<String, Object> response = new HashMap<>();
        response.put("reviews", reviews);
        response.put("summary", summary);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/reviews")
    public ResponseEntity<ProductReviewDTO> submitReview(@RequestBody ReviewCreateRequestDTO request) {
        ProductReviewDTO created = reviewService.createReview(1L, "Sunita Devi (Verified Buyer)", request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PostMapping("/reviews/{reviewId}/helpful")
    public ResponseEntity<Map<String, Boolean>> markHelpful(@PathVariable Long reviewId) {
        boolean success = reviewService.incrementHelpfulVotes(reviewId);
        Map<String, Boolean> res = new HashMap<>();
        res.put("success", success);
        return ResponseEntity.ok(res);
    }
}
