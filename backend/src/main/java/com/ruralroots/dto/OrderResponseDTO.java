package com.ruralroots.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponseDTO {
    private Long id;
    private String orderNumber;
    private UUID idempotencyKey;
    private Long buyerId;
    private String buyerPhone;
    private String buyerName;
    private Long hubId;
    private String hubName;
    private String hubLandmark;
    private String orderStatus;
    private String paymentType;
    private String paymentStatus;
    private BigDecimal totalAmount;
    private ZonedDateTime offlineCreatedAt;
    private ZonedDateTime syncedAt;
    private List<OrderItemDTO> items;
}
