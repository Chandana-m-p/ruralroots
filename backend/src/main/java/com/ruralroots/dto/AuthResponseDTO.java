package com.ruralroots.dto;

public class AuthResponseDTO {
    private String token;
    private String tokenType;
    private Long userId;
    private String phoneNumber;
    private String fullName;
    private String role;
    private String preferredLanguage;

    public AuthResponseDTO() {}

    public AuthResponseDTO(String token, String tokenType, Long userId, String phoneNumber, String fullName, String role, String preferredLanguage) {
        this.token = token;
        this.tokenType = tokenType;
        this.userId = userId;
        this.phoneNumber = phoneNumber;
        this.fullName = fullName;
        this.role = role;
        this.preferredLanguage = preferredLanguage;
    }

    public static AuthResponseDTOBuilder builder() {
        return new AuthResponseDTOBuilder();
    }

    public static class AuthResponseDTOBuilder {
        private String token;
        private String tokenType = "Bearer";
        private Long userId;
        private String phoneNumber;
        private String fullName;
        private String role;
        private String preferredLanguage;

        public AuthResponseDTOBuilder token(String token) { this.token = token; return this; }
        public AuthResponseDTOBuilder tokenType(String tokenType) { this.tokenType = tokenType; return this; }
        public AuthResponseDTOBuilder userId(Long userId) { this.userId = userId; return this; }
        public AuthResponseDTOBuilder phoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; return this; }
        public AuthResponseDTOBuilder fullName(String fullName) { this.fullName = fullName; return this; }
        public AuthResponseDTOBuilder role(String role) { this.role = role; return this; }
        public AuthResponseDTOBuilder preferredLanguage(String preferredLanguage) { this.preferredLanguage = preferredLanguage; return this; }

        public AuthResponseDTO build() {
            return new AuthResponseDTO(token, tokenType, userId, phoneNumber, fullName, role, preferredLanguage);
        }
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public String getTokenType() { return tokenType; }
    public void setTokenType(String tokenType) { this.tokenType = tokenType; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getPreferredLanguage() { return preferredLanguage; }
    public void setPreferredLanguage(String preferredLanguage) { this.preferredLanguage = preferredLanguage; }
}
