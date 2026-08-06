package com.ruralroots.dto;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

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
<<<<<<< HEAD
    private ZonedDateTime deliveryDate;
=======
    private String cancellationReason;
    private ZonedDateTime cancelledAt;
>>>>>>> bb47bee993ff0ce233311e7ca24db9ee4b2afd2e
    private List<OrderItemDTO> items;

    public OrderResponseDTO() {}

<<<<<<< HEAD
    public OrderResponseDTO(Long id, String orderNumber, UUID idempotencyKey, Long buyerId, String buyerPhone, String buyerName, Long hubId, String hubName, String hubLandmark, String orderStatus, String paymentType, String paymentStatus, BigDecimal totalAmount, ZonedDateTime offlineCreatedAt, ZonedDateTime syncedAt, ZonedDateTime deliveryDate, List<OrderItemDTO> items) {
=======
    public OrderResponseDTO(Long id, String orderNumber, UUID idempotencyKey, Long buyerId, String buyerPhone, String buyerName, Long hubId, String hubName, String hubLandmark, String orderStatus, String paymentType, String paymentStatus, BigDecimal totalAmount, ZonedDateTime offlineCreatedAt, ZonedDateTime syncedAt, String cancellationReason, ZonedDateTime cancelledAt, List<OrderItemDTO> items) {
>>>>>>> bb47bee993ff0ce233311e7ca24db9ee4b2afd2e
        this.id = id;
        this.orderNumber = orderNumber;
        this.idempotencyKey = idempotencyKey;
        this.buyerId = buyerId;
        this.buyerPhone = buyerPhone;
        this.buyerName = buyerName;
        this.hubId = hubId;
        this.hubName = hubName;
        this.hubLandmark = hubLandmark;
        this.orderStatus = orderStatus;
        this.paymentType = paymentType;
        this.paymentStatus = paymentStatus;
        this.totalAmount = totalAmount;
        this.offlineCreatedAt = offlineCreatedAt;
        this.syncedAt = syncedAt;
<<<<<<< HEAD
        this.deliveryDate = deliveryDate;
=======
        this.cancellationReason = cancellationReason;
        this.cancelledAt = cancelledAt;
>>>>>>> bb47bee993ff0ce233311e7ca24db9ee4b2afd2e
        this.items = items;
    }

    public static OrderResponseDTOBuilder builder() {
        return new OrderResponseDTOBuilder();
    }

    public static class OrderResponseDTOBuilder {
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
<<<<<<< HEAD
        private ZonedDateTime deliveryDate;
=======
        private String cancellationReason;
        private ZonedDateTime cancelledAt;
>>>>>>> bb47bee993ff0ce233311e7ca24db9ee4b2afd2e
        private List<OrderItemDTO> items;

        public OrderResponseDTOBuilder id(Long id) { this.id = id; return this; }
        public OrderResponseDTOBuilder orderNumber(String orderNumber) { this.orderNumber = orderNumber; return this; }
        public OrderResponseDTOBuilder idempotencyKey(UUID idempotencyKey) { this.idempotencyKey = idempotencyKey; return this; }
        public OrderResponseDTOBuilder buyerId(Long buyerId) { this.buyerId = buyerId; return this; }
        public OrderResponseDTOBuilder buyerPhone(String buyerPhone) { this.buyerPhone = buyerPhone; return this; }
        public OrderResponseDTOBuilder buyerName(String buyerName) { this.buyerName = buyerName; return this; }
        public OrderResponseDTOBuilder hubId(Long hubId) { this.hubId = hubId; return this; }
        public OrderResponseDTOBuilder hubName(String hubName) { this.hubName = hubName; return this; }
        public OrderResponseDTOBuilder hubLandmark(String hubLandmark) { this.hubLandmark = hubLandmark; return this; }
        public OrderResponseDTOBuilder orderStatus(String orderStatus) { this.orderStatus = orderStatus; return this; }
        public OrderResponseDTOBuilder paymentType(String paymentType) { this.paymentType = paymentType; return this; }
        public OrderResponseDTOBuilder paymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; return this; }
        public OrderResponseDTOBuilder totalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; return this; }
        public OrderResponseDTOBuilder offlineCreatedAt(ZonedDateTime offlineCreatedAt) { this.offlineCreatedAt = offlineCreatedAt; return this; }
        public OrderResponseDTOBuilder syncedAt(ZonedDateTime syncedAt) { this.syncedAt = syncedAt; return this; }
<<<<<<< HEAD
        public OrderResponseDTOBuilder deliveryDate(ZonedDateTime deliveryDate) { this.deliveryDate = deliveryDate; return this; }
        public OrderResponseDTOBuilder items(List<OrderItemDTO> items) { this.items = items; return this; }

        public OrderResponseDTO build() {
            return new OrderResponseDTO(id, orderNumber, idempotencyKey, buyerId, buyerPhone, buyerName, hubId, hubName, hubLandmark, orderStatus, paymentType, paymentStatus, totalAmount, offlineCreatedAt, syncedAt, deliveryDate, items);
=======
        public OrderResponseDTOBuilder cancellationReason(String cancellationReason) { this.cancellationReason = cancellationReason; return this; }
        public OrderResponseDTOBuilder cancelledAt(ZonedDateTime cancelledAt) { this.cancelledAt = cancelledAt; return this; }
        public OrderResponseDTOBuilder items(List<OrderItemDTO> items) { this.items = items; return this; }

        public OrderResponseDTO build() {
            return new OrderResponseDTO(id, orderNumber, idempotencyKey, buyerId, buyerPhone, buyerName, hubId, hubName, hubLandmark, orderStatus, paymentType, paymentStatus, totalAmount, offlineCreatedAt, syncedAt, cancellationReason, cancelledAt, items);
>>>>>>> bb47bee993ff0ce233311e7ca24db9ee4b2afd2e
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getOrderNumber() { return orderNumber; }
    public void setOrderNumber(String orderNumber) { this.orderNumber = orderNumber; }
    public UUID getIdempotencyKey() { return idempotencyKey; }
    public void setIdempotencyKey(UUID idempotencyKey) { this.idempotencyKey = idempotencyKey; }
    public Long getBuyerId() { return buyerId; }
    public void setBuyerId(Long buyerId) { this.buyerId = buyerId; }
    public String getBuyerPhone() { return buyerPhone; }
    public void setBuyerPhone(String buyerPhone) { this.buyerPhone = buyerPhone; }
    public String getBuyerName() { return buyerName; }
    public void setBuyerName(String buyerName) { this.buyerName = buyerName; }
    public Long getHubId() { return hubId; }
    public void setHubId(Long hubId) { this.hubId = hubId; }
    public String getHubName() { return hubName; }
    public void setHubName(String hubName) { this.hubName = hubName; }
    public String getHubLandmark() { return hubLandmark; }
    public void setHubLandmark(String hubLandmark) { this.hubLandmark = hubLandmark; }
    public String getOrderStatus() { return orderStatus; }
    public void setOrderStatus(String orderStatus) { this.orderStatus = orderStatus; }
    public String getPaymentType() { return paymentType; }
    public void setPaymentType(String paymentType) { this.paymentType = paymentType; }
    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }
    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }
    public ZonedDateTime getOfflineCreatedAt() { return offlineCreatedAt; }
    public void setOfflineCreatedAt(ZonedDateTime offlineCreatedAt) { this.offlineCreatedAt = offlineCreatedAt; }
    public ZonedDateTime getSyncedAt() { return syncedAt; }
    public void setSyncedAt(ZonedDateTime syncedAt) { this.syncedAt = syncedAt; }
<<<<<<< HEAD
    public ZonedDateTime getDeliveryDate() { return deliveryDate; }
    public void setDeliveryDate(ZonedDateTime deliveryDate) { this.deliveryDate = deliveryDate; }
=======
    public String getCancellationReason() { return cancellationReason; }
    public void setCancellationReason(String cancellationReason) { this.cancellationReason = cancellationReason; }
    public ZonedDateTime getCancelledAt() { return cancelledAt; }
    public void setCancelledAt(ZonedDateTime cancelledAt) { this.cancelledAt = cancelledAt; }
>>>>>>> bb47bee993ff0ce233311e7ca24db9ee4b2afd2e
    public List<OrderItemDTO> getItems() { return items; }
    public void setItems(List<OrderItemDTO> items) { this.items = items; }
}
