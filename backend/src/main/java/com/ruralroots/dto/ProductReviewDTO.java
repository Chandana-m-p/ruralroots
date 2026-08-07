package com.ruralroots.dto;

import java.time.ZonedDateTime;
import java.util.List;

public class ProductReviewDTO {
    private Long id;
    private Long productId;
    private Long orderId;
    private Long buyerId;
    private String buyerName;
    private Integer overallRating;
    private String title;
    private String comment;
    private Boolean isVerifiedPurchase;
    private Integer helpfulVotes;
    private String status;
    private ZonedDateTime createdAt;
    private List<ReviewAttributeDTO> attributes;
    private List<ReviewMediaDTO> mediaList;

    public ProductReviewDTO() {}

    public ProductReviewDTO(Long id, Long productId, Long orderId, Long buyerId, String buyerName, Integer overallRating, String title, String comment, Boolean isVerifiedPurchase, Integer helpfulVotes, String status, ZonedDateTime createdAt, List<ReviewAttributeDTO> attributes, List<ReviewMediaDTO> mediaList) {
        this.id = id;
        this.productId = productId;
        this.orderId = orderId;
        this.buyerId = buyerId;
        this.buyerName = buyerName;
        this.overallRating = overallRating;
        this.title = title;
        this.comment = comment;
        this.isVerifiedPurchase = isVerifiedPurchase;
        this.helpfulVotes = helpfulVotes;
        this.status = status;
        this.createdAt = createdAt;
        this.attributes = attributes;
        this.mediaList = mediaList;
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
    public List<ReviewAttributeDTO> getAttributes() { return attributes; }
    public void setAttributes(List<ReviewAttributeDTO> attributes) { this.attributes = attributes; }
    public List<ReviewMediaDTO> getMediaList() { return mediaList; }
    public void setMediaList(List<ReviewMediaDTO> mediaList) { this.mediaList = mediaList; }
}
