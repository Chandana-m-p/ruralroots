package com.ruralroots.dto;

public class ReviewMediaDTO {
    private String mediaType;
    private String url;

    public ReviewMediaDTO() {}

    public ReviewMediaDTO(String mediaType, String url) {
        this.mediaType = mediaType;
        this.url = url;
    }

    public String getMediaType() { return mediaType; }
    public void setMediaType(String mediaType) { this.mediaType = mediaType; }
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
}
