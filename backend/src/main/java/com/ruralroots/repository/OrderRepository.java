package com.ruralroots.repository;

import com.ruralroots.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findByIdempotencyKey(UUID idempotencyKey);
    List<Order> findByBuyerIdOrderBySyncedAtDesc(Long buyerId);
    List<Order> findByHubIdOrderBySyncedAtDesc(Long hubId);
    Optional<Order> findByOrderNumber(String orderNumber);
}
