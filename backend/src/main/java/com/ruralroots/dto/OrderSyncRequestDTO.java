package com.ruralroots.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

@Data
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
}
