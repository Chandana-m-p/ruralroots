package com.ruralroots.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "review_attributes")
public class ReviewAttribute {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "review_id", nullable = false)
    @JsonIgnore
    private ProductReview review;

    @Column(name = "attribute_name", nullable = false, length = 50)
    private String attributeName; // 'quality', 'material_authenticity', 'value_for_money'

    @Column(name = "rating_score", nullable = false)
    private Integer ratingScore;

    public ReviewAttribute() {}

    public ReviewAttribute(Long id, ProductReview review, String attributeName, Integer ratingScore) {
        this.id = id;
        this.review = review;
        this.attributeName = attributeName;
        this.ratingScore = ratingScore;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public ProductReview getReview() { return review; }
    public void setReview(ProductReview review) { this.review = review; }
    public String getAttributeName() { return attributeName; }
    public void setAttributeName(String attributeName) { this.attributeName = attributeName; }
    public Integer getRatingScore() { return ratingScore; }
    public void setRatingScore(Integer ratingScore) { this.ratingScore = ratingScore; }
}
