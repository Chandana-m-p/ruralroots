package com.ruralroots.service;

import com.ruralroots.dto.OrderItemDTO;
import com.ruralroots.dto.OrderResponseDTO;
import com.ruralroots.dto.OrderSyncRequestDTO;
import com.ruralroots.model.*;
import com.ruralroots.repository.OrderRepository;
import com.ruralroots.repository.ProductRepository;
import com.ruralroots.repository.UserRepository;
import com.ruralroots.repository.VillageHubRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OrderSyncService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VillageHubRepository hubRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private SmsNotificationService smsService;

    @Transactional(isolation = Isolation.READ_COMMITTED)
    public OrderResponseDTO processSyncedOrder(OrderSyncRequestDTO dto, String buyerPhoneNumber) {
        // 1. Idempotency check: if order with UUID exists, return existing DTO immediately without duplicate processing
        Optional<Order> existingOrder = orderRepository.findByIdempotencyKey(dto.getIdempotencyKey());
        if (existingOrder.isPresent()) {
            return mapToDTO(existingOrder.get());
        }

        User buyer = userRepository.findByPhoneNumber(buyerPhoneNumber)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + buyerPhoneNumber));

        VillageHub hub = hubRepository.findById(dto.getHubId())
                .orElseThrow(() -> new IllegalArgumentException("Village Hub not found: " + dto.getHubId()));

        String orderNumber = "RR-" + (100000 + (long)(Math.random() * 899999));

        Order order = Order.builder()
                .orderNumber(orderNumber)
                .idempotencyKey(dto.getIdempotencyKey())
                .buyer(buyer)
                .hub(hub)
                .orderStatus("CONFIRMED")
                .paymentType(dto.getPaymentType() != null ? dto.getPaymentType() : "COD")
                .paymentStatus("UNPAID")
                .totalAmount(dto.getTotalAmount())
                .offlineCreatedAt(dto.getOfflineCreatedAt() != null ? dto.getOfflineCreatedAt() : ZonedDateTime.now())
                .syncedAt(ZonedDateTime.now())
                .items(new ArrayList<>())
                .build();

        List<OrderItem> items = new ArrayList<>();
        if (dto.getItems() != null) {
            for (OrderItemDTO itemDto : dto.getItems()) {
                Product product = productRepository.findById(itemDto.getProductId())
                        .orElseThrow(() -> new IllegalArgumentException("Product not found: " + itemDto.getProductId()));

                // Optimistic concurrency stock check
                if (product.getStockQuantity() < itemDto.getQuantity()) {
                    throw new IllegalStateException("Insufficient stock for product: " + product.getId());
                }
                product.setStockQuantity(product.getStockQuantity() - itemDto.getQuantity());
                productRepository.save(product);

                OrderItem item = OrderItem.builder()
                        .order(order)
                        .product(product)
                        .quantity(itemDto.getQuantity())
                        .unitPrice(itemDto.getUnitPrice() != null ? itemDto.getUnitPrice() : product.getBasePrice())
                        .build();
                items.add(item);
            }
        }
        order.setItems(items);

        Order savedOrder = orderRepository.save(order);

        // Dispatch SMS Confirmation
        smsService.sendOrderConfirmation(buyer.getPhoneNumber(), savedOrder.getOrderNumber(), hub.getHubName());

        return mapToDTO(savedOrder);
    }

    public List<OrderResponseDTO> getOrdersForBuyer(String phoneNumber) {
        User buyer = userRepository.findByPhoneNumber(phoneNumber)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + phoneNumber));
        return orderRepository.findByBuyerIdOrderBySyncedAtDesc(buyer.getId()).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<OrderResponseDTO> getOrdersForHub(Long hubId) {
        return orderRepository.findByHubIdOrderBySyncedAtDesc(hubId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public OrderResponseDTO markOrderDelivered(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found: " + orderId));

        order.setOrderStatus("DELIVERED");
        order.setPaymentStatus("PAID");
        Order updated = orderRepository.save(order);

        smsService.sendDeliveryConfirmation(order.getBuyer().getPhoneNumber(), order.getOrderNumber(), order.getHub().getHubName());

        return mapToDTO(updated);
    }

    private OrderResponseDTO mapToDTO(Order o) {
        List<OrderItemDTO> itemDtos = o.getItems().stream().map(item -> OrderItemDTO.builder()
                .productId(item.getProduct().getId())
                .productTitle(item.getProduct().getTitleI18n())
                .quantity(item.getQuantity())
                .unitPrice(item.getUnitPrice())
                .build()).collect(Collectors.toList());

        return OrderResponseDTO.builder()
                .id(o.getId())
                .orderNumber(o.getOrderNumber())
                .idempotencyKey(o.getIdempotencyKey())
                .buyerId(o.getBuyer().getId())
                .buyerPhone(o.getBuyer().getPhoneNumber())
                .buyerName(o.getBuyer().getFullName())
                .hubId(o.getHub().getId())
                .hubName(o.getHub().getHubName())
                .hubLandmark(o.getHub().getLandmark())
                .orderStatus(o.getOrderStatus())
                .paymentType(o.getPaymentType())
                .paymentStatus(o.getPaymentStatus())
                .totalAmount(o.getTotalAmount())
                .offlineCreatedAt(o.getOfflineCreatedAt())
                .syncedAt(o.getSyncedAt())
                .items(itemDtos)
                .build();
    }
}
