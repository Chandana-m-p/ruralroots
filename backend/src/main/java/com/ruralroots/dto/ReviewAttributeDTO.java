package com.ruralroots.dto;

public class ReviewAttributeDTO {
    private String attributeName;
    private Integer ratingScore;

    public ReviewAttributeDTO() {}

    public ReviewAttributeDTO(String attributeName, Integer ratingScore) {
        this.attributeName = attributeName;
        this.ratingScore = ratingScore;
    }

    public String getAttributeName() { return attributeName; }
    public void setAttributeName(String attributeName) { this.attributeName = attributeName; }
    public Integer getRatingScore() { return ratingScore; }
    public void setRatingScore(Integer ratingScore) { this.ratingScore = ratingScore; }
}
