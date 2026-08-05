package com.ruralroots.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class AuthRequestDTO {
    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be 10 digits")
    private String phoneNumber;

    private String fullName;
    private String role; // ROLE_BUYER, ROLE_HUB_MANAGER
    private String preferredLanguage;
}
