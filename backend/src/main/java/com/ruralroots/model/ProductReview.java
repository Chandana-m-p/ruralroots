package com.ruralroots.model;

import jakarta.persistence.*;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "product_reviews")
public class ProductReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "product_id", nullable = false)
    private Long productId;

    @Column(name = "order_id", nullable = false)
    private Long orderId;

    @Column(name = "buyer_id", nullable = false)
    private Long buyerId;

    @Column(name = "buyer_name", nullable = false)
    private String buyerName = "Anonymous Artisan Supporter";

    @Column(name = "overall_rating", nullable = false)
    private Integer overallRating;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String comment;

    @Column(name = "is_verified_purchase")
    private Boolean isVerifiedPurchase = true;

    @Column(name = "helpful_votes")
    private Integer helpfulVotes = 0;

    @Column(length = 30)
    private String status = "PUBLISHED";

    @Column(name = "created_at", updatable = false)
    private ZonedDateTime createdAt = ZonedDateTime.now();

    @OneToMany(mappedBy = "review", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ReviewAttribute> attributes = new ArrayList<>();

    @OneToMany(mappedBy = "review", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ReviewMedia> mediaList = new ArrayList<>();

    public ProductReview() {}

    public ProductReview(Long id, Long productId, Long orderId, Long buyerId, String buyerName, Integer overallRating, String title, String comment, Boolean isVerifiedPurchase, Integer helpfulVotes, String status, ZonedDateTime createdAt) {
        this.id = id;
        this.productId = productId;
        this.orderId = orderId;
        this.buyerId = buyerId;
        this.buyerName = buyerName != null ? buyerName : "Anonymous Artisan Supporter";
        this.overallRating = overallRating;
        this.title = title;
        this.comment = comment;
        this.isVerifiedPurchase = isVerifiedPurchase != null ? isVerifiedPurchase : true;
        this.helpfulVotes = helpfulVotes != null ? helpfulVotes : 0;
        this.status = status != null ? status : "PUBLISHED";
        this.createdAt = createdAt != null ? createdAt : ZonedDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }
    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }
    public Long getBuyerId() { return buyerId; }
    public void setBuyerId(Long buyerId) { this.buyerId = buyerId; }
    public String getBuyerName() { return buyerName; }
    public void setBuyerName(String buyerName) { this.buyerName = buyerName; }
    public Integer getOverallRating() { return overallRating; }
    public void setOverallRating(Integer overallRating) { this.overallRating = overallRating; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
    public Boolean getIsVerifiedPurchase() { return isVerifiedPurchase; }
    public void setIsVerifiedPurchase(Boolean isVerifiedPurchase) { this.isVerifiedPurchase = isVerifiedPurchase; }
    public Integer getHelpfulVotes() { return helpfulVotes; }
    public void setHelpfulVotes(Integer helpfulVotes) { this.helpfulVotes = helpfulVotes; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public ZonedDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(ZonedDateTime createdAt) { this.createdAt = createdAt; }
    public List<ReviewAttribute> getAttributes() { return attributes; }
    public void setAttributes(List<ReviewAttribute> attributes) { this.attributes = attributes; }
    public List<ReviewMedia> getMediaList() { return mediaList; }
    public void setMediaList(List<ReviewMedia> mediaList) { this.mediaList = mediaList; }

    public void addAttribute(ReviewAttribute attribute) {
        attributes.add(attribute);
        attribute.setReview(this);
    }

    public void addMedia(ReviewMedia media) {
        mediaList.add(media);
        media.setReview(this);
    }
}
