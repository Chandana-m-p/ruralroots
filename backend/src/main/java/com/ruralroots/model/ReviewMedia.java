package com.ruralroots.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.ZonedDateTime;

@Entity
@Table(name = "review_media")
public class ReviewMedia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "review_id", nullable = false)
    @JsonIgnore
    private ProductReview review;

    @Column(name = "media_type", nullable = false, length = 20)
    private String mediaType; // 'IMAGE' or 'VIDEO'

    @Column(nullable = false, columnDefinition = "TEXT")
    private String url;

    @Column(name = "created_at", updatable = false)
    private ZonedDateTime createdAt = ZonedDateTime.now();

    public ReviewMedia() {}

    public ReviewMedia(Long id, ProductReview review, String mediaType, String url) {
        this.id = id;
        this.review = review;
        this.mediaType = mediaType;
        this.url = url;
        this.createdAt = ZonedDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public ProductReview getReview() { return review; }
    public void setReview(ProductReview review) { this.review = review; }
    public String getMediaType() { return mediaType; }
    public void setMediaType(String mediaType) { this.mediaType = mediaType; }
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
    public ZonedDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(ZonedDateTime createdAt) { this.createdAt = createdAt; }
}
