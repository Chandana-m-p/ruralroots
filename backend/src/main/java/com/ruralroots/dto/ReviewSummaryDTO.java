package com.ruralroots.dto;

import java.util.Map;

public class ReviewSummaryDTO {
    private Double averageRating;
    private Long totalReviews;
    private Map<Integer, Long> ratingDistribution;
    private Map<String, Double> attributeAverages;

    public ReviewSummaryDTO() {}

    public ReviewSummaryDTO(Double averageRating, Long totalReviews, Map<Integer, Long> ratingDistribution, Map<String, Double> attributeAverages) {
        this.averageRating = averageRating;
        this.totalReviews = totalReviews;
        this.ratingDistribution = ratingDistribution;
        this.attributeAverages = attributeAverages;
    }

    public Double getAverageRating() { return averageRating; }
    public void setAverageRating(Double averageRating) { this.averageRating = averageRating; }
    public Long getTotalReviews() { return totalReviews; }
    public void setTotalReviews(Long totalReviews) { this.totalReviews = totalReviews; }
    public Map<Integer, Long> getRatingDistribution() { return ratingDistribution; }
    public void setRatingDistribution(Map<Integer, Long> ratingDistribution) { this.ratingDistribution = ratingDistribution; }
    public Map<String, Double> getAttributeAverages() { return attributeAverages; }
    public void setAttributeAverages(Map<String, Double> attributeAverages) { this.attributeAverages = attributeAverages; }
}
