package com.ruralroots.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_number", nullable = false, unique = true, length = 30)
    private String orderNumber;

    @Column(name = "idempotency_key", nullable = false, unique = true)
    private UUID idempotencyKey;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "buyer_id", nullable = false)
    private User buyer;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "hub_id", nullable = false)
    private VillageHub hub;

    @Column(name = "order_status", nullable = false, length = 30)
    private String orderStatus = "CONFIRMED";

    @Column(name = "payment_type", nullable = false, length = 20)
    private String paymentType = "COD";

    @Column(name = "payment_status", nullable = false, length = 20)
    private String paymentStatus = "UNPAID";

    @Column(name = "total_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount;

    @Column(name = "offline_created_at", nullable = false)
    private ZonedDateTime offlineCreatedAt;

    @Column(name = "synced_at")
    private ZonedDateTime syncedAt = ZonedDateTime.now();

    @Column(name = "cancellation_reason")
    private String cancellationReason;

    @Column(name = "cancelled_at")
    private ZonedDateTime cancelledAt;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<OrderItem> items = new ArrayList<>();

    public Order() {}

    public Order(Long id, String orderNumber, UUID idempotencyKey, User buyer, VillageHub hub, String orderStatus, String paymentType, String paymentStatus, BigDecimal totalAmount, ZonedDateTime offlineCreatedAt, ZonedDateTime syncedAt, String cancellationReason, ZonedDateTime cancelledAt, List<OrderItem> items) {
        this.id = id;
        this.orderNumber = orderNumber;
        this.idempotencyKey = idempotencyKey;
        this.buyer = buyer;
        this.hub = hub;
        this.orderStatus = orderStatus != null ? orderStatus : "CONFIRMED";
        this.paymentType = paymentType != null ? paymentType : "COD";
        this.paymentStatus = paymentStatus != null ? paymentStatus : "UNPAID";
        this.totalAmount = totalAmount;
        this.offlineCreatedAt = offlineCreatedAt;
        this.syncedAt = syncedAt != null ? syncedAt : ZonedDateTime.now();
        this.cancellationReason = cancellationReason;
        this.cancelledAt = cancelledAt;
        this.items = items != null ? items : new ArrayList<>();
    }

    public static OrderBuilder builder() {
        return new OrderBuilder();
    }

    public static class OrderBuilder {
        private Long id;
        private String orderNumber;
        private UUID idempotencyKey;
        private User buyer;
        private VillageHub hub;
        private String orderStatus = "CONFIRMED";
        private String paymentType = "COD";
        private String paymentStatus = "UNPAID";
        private BigDecimal totalAmount;
        private ZonedDateTime offlineCreatedAt;
        private ZonedDateTime syncedAt = ZonedDateTime.now();
        private String cancellationReason;
        private ZonedDateTime cancelledAt;
        private List<OrderItem> items = new ArrayList<>();

        public OrderBuilder id(Long id) { this.id = id; return this; }
        public OrderBuilder orderNumber(String orderNumber) { this.orderNumber = orderNumber; return this; }
        public OrderBuilder idempotencyKey(UUID idempotencyKey) { this.idempotencyKey = idempotencyKey; return this; }
        public OrderBuilder buyer(User buyer) { this.buyer = buyer; return this; }
        public OrderBuilder hub(VillageHub hub) { this.hub = hub; return this; }
        public OrderBuilder orderStatus(String orderStatus) { this.orderStatus = orderStatus; return this; }
        public OrderBuilder paymentType(String paymentType) { this.paymentType = paymentType; return this; }
        public OrderBuilder paymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; return this; }
        public OrderBuilder totalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; return this; }
        public OrderBuilder offlineCreatedAt(ZonedDateTime offlineCreatedAt) { this.offlineCreatedAt = offlineCreatedAt; return this; }
        public OrderBuilder syncedAt(ZonedDateTime syncedAt) { this.syncedAt = syncedAt; return this; }
        public OrderBuilder cancellationReason(String cancellationReason) { this.cancellationReason = cancellationReason; return this; }
        public OrderBuilder cancelledAt(ZonedDateTime cancelledAt) { this.cancelledAt = cancelledAt; return this; }
        public OrderBuilder items(List<OrderItem> items) { this.items = items; return this; }

        public Order build() {
            return new Order(id, orderNumber, idempotencyKey, buyer, hub, orderStatus, paymentType, paymentStatus, totalAmount, offlineCreatedAt, syncedAt, cancellationReason, cancelledAt, items);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getOrderNumber() { return orderNumber; }
    public void setOrderNumber(String orderNumber) { this.orderNumber = orderNumber; }
    public UUID getIdempotencyKey() { return idempotencyKey; }
    public void setIdempotencyKey(UUID idempotencyKey) { this.idempotencyKey = idempotencyKey; }
    public User getBuyer() { return buyer; }
    public void setBuyer(User buyer) { this.buyer = buyer; }
    public VillageHub getHub() { return hub; }
    public void setHub(VillageHub hub) { this.hub = hub; }
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
    public String getCancellationReason() { return cancellationReason; }
    public void setCancellationReason(String cancellationReason) { this.cancellationReason = cancellationReason; }
    public ZonedDateTime getCancelledAt() { return cancelledAt; }
    public void setCancelledAt(ZonedDateTime cancelledAt) { this.cancelledAt = cancelledAt; }
    public List<OrderItem> getItems() { return items; }
    public void setItems(List<OrderItem> items) { this.items = items; }
}
