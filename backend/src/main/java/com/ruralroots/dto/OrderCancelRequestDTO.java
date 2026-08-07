package com.ruralroots.dto;

import jakarta.validation.constraints.NotBlank;

public class OrderCancelRequestDTO {

    @NotBlank(message = "Cancellation reason is required")
    private String reason;

    public OrderCancelRequestDTO() {}

    public OrderCancelRequestDTO(String reason) {
        this.reason = reason;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
