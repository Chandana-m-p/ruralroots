package com.ruralroots.dto;

import java.util.List;

public class ReviewCreateRequestDTO {
    private Long orderId;
    private Long productId;
    private Integer overallRating;
    private String title;
    private String comment;
    private List<ReviewAttributeDTO> attributes;
    private List<ReviewMediaDTO> mediaList;

    public ReviewCreateRequestDTO() {}

    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }
    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }
    public Integer getOverallRating() { return overallRating; }
    public void setOverallRating(Integer overallRating) { this.overallRating = overallRating; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
    public List<ReviewAttributeDTO> getAttributes() { return attributes; }
    public void setAttributes(List<ReviewAttributeDTO> attributes) { this.attributes = attributes; }
    public List<ReviewMediaDTO> getMediaList() { return mediaList; }
    public void setMediaList(List<ReviewMediaDTO> mediaList) { this.mediaList = mediaList; }
}
