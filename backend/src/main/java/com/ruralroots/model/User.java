package com.ruralroots.model;

import jakarta.persistence.*;
import java.time.ZonedDateTime;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "phone_number", nullable = false, unique = true, length = 15)
    private String phoneNumber;

    @Column(name = "full_name", length = 100)
    private String fullName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Role role;

    @Column(name = "preferred_language", length = 5)
    private String preferredLanguage = "hi";

    @Column(name = "is_active")
    private Boolean isActive = true;

    @Column(name = "created_at")
    private ZonedDateTime createdAt = ZonedDateTime.now();

    public User() {}

    public User(Long id, String phoneNumber, String fullName, Role role, String preferredLanguage, Boolean isActive, ZonedDateTime createdAt) {
        this.id = id;
        this.phoneNumber = phoneNumber;
        this.fullName = fullName;
        this.role = role;
        this.preferredLanguage = preferredLanguage != null ? preferredLanguage : "hi";
        this.isActive = isActive != null ? isActive : true;
        this.createdAt = createdAt != null ? createdAt : ZonedDateTime.now();
    }

    public static UserBuilder builder() {
        return new UserBuilder();
    }

    public static class UserBuilder {
        private Long id;
        private String phoneNumber;
        private String fullName;
        private Role role;
        private String preferredLanguage = "hi";
        private Boolean isActive = true;
        private ZonedDateTime createdAt = ZonedDateTime.now();

        public UserBuilder id(Long id) { this.id = id; return this; }
        public UserBuilder phoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; return this; }
        public UserBuilder fullName(String fullName) { this.fullName = fullName; return this; }
        public UserBuilder role(Role role) { this.role = role; return this; }
        public UserBuilder preferredLanguage(String preferredLanguage) { this.preferredLanguage = preferredLanguage; return this; }
        public UserBuilder isActive(Boolean isActive) { this.isActive = isActive; return this; }
        public UserBuilder createdAt(ZonedDateTime createdAt) { this.createdAt = createdAt; return this; }

        public User build() {
            return new User(id, phoneNumber, fullName, role, preferredLanguage, isActive, createdAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
    public String getPreferredLanguage() { return preferredLanguage; }
    public void setPreferredLanguage(String preferredLanguage) { this.preferredLanguage = preferredLanguage; }
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
    public ZonedDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(ZonedDateTime createdAt) { this.createdAt = createdAt; }
}
