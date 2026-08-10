package com.ruralroots.dto;

import jakarta.validation.constraints.NotBlank;
import java.time.ZonedDateTime;

public class UserAddressDTO {

    private Long id;
    private Long userId;

    @NotBlank(message = "Address label is required (e.g. Home, Work, Farm)")
    private String label;

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Phone number is required")
    private String phoneNumber;

    @NotBlank(message = "Address line is required")
    private String addressLine;

    @NotBlank(message = "Village or City is required")
    private String villageOrCity;

    @NotBlank(message = "District is required")
    private String district;

    @NotBlank(message = "State is required")
    private String state;

    @NotBlank(message = "Pincode is required")
    private String pincode;

    private Boolean isDefault = false;
    private ZonedDateTime createdAt;

    public UserAddressDTO() {}

    public UserAddressDTO(Long id, Long userId, String label, String fullName, String phoneNumber, String addressLine, String villageOrCity, String district, String state, String pincode, Boolean isDefault, ZonedDateTime createdAt) {
        this.id = id;
        this.userId = userId;
        this.label = label;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.addressLine = addressLine;
        this.villageOrCity = villageOrCity;
        this.district = district;
        this.state = state;
        this.pincode = pincode;
        this.isDefault = isDefault;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getAddressLine() { return addressLine; }
    public void setAddressLine(String addressLine) { this.addressLine = addressLine; }

    public String getVillageOrCity() { return villageOrCity; }
    public void setVillageOrCity(String villageOrCity) { this.villageOrCity = villageOrCity; }

    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getPincode() { return pincode; }
    public void setPincode(String pincode) { this.pincode = pincode; }

    public Boolean getIsDefault() { return isDefault; }
    public void setIsDefault(Boolean isDefault) { this.isDefault = isDefault; }

    public ZonedDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(ZonedDateTime createdAt) { this.createdAt = createdAt; }
}
