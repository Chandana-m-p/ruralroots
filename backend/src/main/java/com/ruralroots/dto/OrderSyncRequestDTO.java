package com.ruralroots.dto;

import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

public class OrderSyncRequestDTO {
    @NotNull(message = "Idempotency key is required")
    private UUID idempotencyKey;

    @NotNull(message = "Hub ID is required")
    private Long hubId;

    private String paymentType = "COD";
    
    @NotNull(message = "Total amount is required")
    private BigDecimal totalAmount;

    @NotNull(message = "Offline created timestamp is required")
    private ZonedDateTime offlineCreatedAt;

    @NotNull(message = "Items list cannot be null")
    private List<OrderItemDTO> items;

    public OrderSyncRequestDTO() {}

    public OrderSyncRequestDTO(UUID idempotencyKey, Long hubId, String paymentType, BigDecimal totalAmount, ZonedDateTime offlineCreatedAt, List<OrderItemDTO> items) {
        this.idempotencyKey = idempotencyKey;
        this.hubId = hubId;
        this.paymentType = paymentType != null ? paymentType : "COD";
        this.totalAmount = totalAmount;
        this.offlineCreatedAt = offlineCreatedAt;
        this.items = items;
    }

    public UUID getIdempotencyKey() { return idempotencyKey; }
    public void setIdempotencyKey(UUID idempotencyKey) { this.idempotencyKey = idempotencyKey; }
    public Long getHubId() { return hubId; }
    public void setHubId(Long hubId) { this.hubId = hubId; }
    public String getPaymentType() { return paymentType; }
    public void setPaymentType(String paymentType) { this.paymentType = paymentType; }
    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }
    public ZonedDateTime getOfflineCreatedAt() { return offlineCreatedAt; }
    public void setOfflineCreatedAt(ZonedDateTime offlineCreatedAt) { this.offlineCreatedAt = offlineCreatedAt; }
    public List<OrderItemDTO> getItems() { return items; }
    public void setItems(List<OrderItemDTO> items) { this.items = items; }
}
