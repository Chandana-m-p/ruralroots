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
        // Idempotency check: if order with UUID exists, return existing DTO immediately
        Optional<Order> existingOrder = orderRepository.findByIdempotencyKey(dto.getIdempotencyKey());
        if (existingOrder.isPresent()) {
            return mapToDTO(existingOrder.get());
        }

        User buyer = userRepository.findByPhoneNumber(buyerPhoneNumber)
                .orElseGet(() -> userRepository.findById(1L).orElseThrow());

        VillageHub hub = hubRepository.findById(dto.getHubId())
                .orElseGet(() -> hubRepository.findById(1L).orElseThrow());

        String orderNumber = "RR-" + (100000 + (long)(Math.random() * 899999));

        Order order = Order.builder()
                .orderNumber(orderNumber)
                .idempotencyKey(dto.getIdempotencyKey())
                .buyer(buyer)
                .hub(hub)
                .orderStatus("Delivered Successfully")
                .paymentType(dto.getPaymentType() != null ? dto.getPaymentType() : "COD")
                .paymentStatus("PAID")
                .totalAmount(dto.getTotalAmount())
                .offlineCreatedAt(dto.getOfflineCreatedAt() != null ? dto.getOfflineCreatedAt() : ZonedDateTime.now())
                .syncedAt(ZonedDateTime.now())
                .deliveryDate(ZonedDateTime.now().plusDays(3))
                .items(new ArrayList<>())
                .build();

        List<OrderItem> items = new ArrayList<>();
        if (dto.getItems() != null) {
            for (OrderItemDTO itemDto : dto.getItems()) {
                Product product = productRepository.findById(itemDto.getProductId())
                        .orElseGet(() -> productRepository.findById(1L).orElseThrow());

                if (product.getStockQuantity() >= itemDto.getQuantity()) {
                    product.setStockQuantity(product.getStockQuantity() - itemDto.getQuantity());
                    productRepository.save(product);
                }

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

    public List<OrderResponseDTO> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<OrderResponseDTO> getOrdersForBuyer(String phoneNumber) {
        User buyer = userRepository.findByPhoneNumber(phoneNumber)
                .orElseGet(() -> userRepository.findById(1L).orElseThrow());

        List<Order> orders = orderRepository.findByBuyerIdOrderBySyncedAtDesc(buyer.getId());
        
        return orders.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<OrderResponseDTO> getOrdersForHub(Long hubId) {
        return orderRepository.findByHubIdOrderBySyncedAtDesc(hubId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public OrderResponseDTO updateOrderStatus(Long orderId, String newStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found: " + orderId));

        String normalizedStatus;
        if ("DELIVERED_FAILED".equalsIgnoreCase(newStatus) || "Delivered Unsuccessfully".equalsIgnoreCase(newStatus)) {
            normalizedStatus = "Delivered Unsuccessfully";
        } else if ("CANCELLED".equalsIgnoreCase(newStatus) || "Cancelled".equalsIgnoreCase(newStatus)) {
            normalizedStatus = "Cancelled";
        } else {
            normalizedStatus = "Delivered Successfully";
        }

        order.setOrderStatus(normalizedStatus);
        if ("Delivered Successfully".equals(normalizedStatus)) {
            order.setPaymentStatus("PAID");
        }

        Order updated = orderRepository.save(order);
        return mapToDTO(updated);
    }

    @Transactional
    public OrderResponseDTO markOrderDelivered(Long orderId) {
        return updateOrderStatus(orderId, "Delivered Successfully");
    }

    @Transactional
    public OrderResponseDTO cancelOrder(Long orderId, String reason, String buyerPhoneNumber) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found: " + orderId));

        if ("CANCELLED".equalsIgnoreCase(order.getOrderStatus()) || "Cancelled".equalsIgnoreCase(order.getOrderStatus())) {
            throw new IllegalStateException("Order is already cancelled.");
        }

        order.setOrderStatus("Cancelled");
        order.setCancellationReason(reason != null ? reason : "Cancelled by user");
        order.setCancelledAt(ZonedDateTime.now());

        // Restore product stock quantity
        if (order.getItems() != null) {
            for (OrderItem item : order.getItems()) {
                Product product = item.getProduct();
                if (product != null) {
                    product.setStockQuantity(product.getStockQuantity() + item.getQuantity());
                    productRepository.save(product);
                }
            }
        }

        Order updated = orderRepository.save(order);
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
                .deliveryDate(o.getDeliveryDate())
                .cancellationReason(o.getCancellationReason())
                .cancelledAt(o.getCancelledAt())
                .items(itemDtos)
                .build();
    }
}
