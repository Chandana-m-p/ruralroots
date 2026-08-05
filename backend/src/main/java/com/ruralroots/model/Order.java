package com.ruralroots.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
    @Builder.Default
    private String orderStatus = "CONFIRMED"; // CONFIRMED, DISPATCHED, ARRIVED_AT_HUB, DELIVERED, CANCELLED

    @Column(name = "payment_type", nullable = false, length = 20)
    @Builder.Default
    private String paymentType = "COD";

    @Column(name = "payment_status", nullable = false, length = 20)
    @Builder.Default
    private String paymentStatus = "UNPAID";

    @Column(name = "total_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount;

    @Column(name = "offline_created_at", nullable = false)
    private ZonedDateTime offlineCreatedAt;

    @Column(name = "synced_at")
    @Builder.Default
    private ZonedDateTime syncedAt = ZonedDateTime.now();

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @Builder.Default
    private List<OrderItem> items = new ArrayList<>();
}
