package com.ruralroots.service;

import com.ruralroots.dto.OrderServiceRequestDTO;
import com.ruralroots.model.Order;
import com.ruralroots.model.OrderServiceRequest;
import com.ruralroots.model.Product;
import com.ruralroots.model.User;
import com.ruralroots.repository.OrderRepository;
import com.ruralroots.repository.OrderServiceRequestRepository;
import com.ruralroots.repository.ProductRepository;
import com.ruralroots.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceRequestService {

    private final OrderServiceRequestRepository serviceRequestRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public OrderServiceRequestService(
            OrderServiceRequestRepository serviceRequestRepository,
            OrderRepository orderRepository,
            ProductRepository productRepository,
            UserRepository userRepository) {
        this.serviceRequestRepository = serviceRequestRepository;
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public OrderServiceRequestDTO createServiceRequest(Long orderId, String buyerPhone, OrderServiceRequestDTO dto) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found with ID: " + orderId));

        User buyer = userRepository.findByPhoneNumber(buyerPhone)
                .orElseGet(() -> userRepository.findAll().stream().findFirst().orElseThrow(() -> new IllegalStateException("Buyer not found")));

        Product product = null;
        if (dto.getProductId() != null) {
            product = productRepository.findById(dto.getProductId()).orElse(null);
        }

        Product replacement = null;
        if (dto.getReplacementProductId() != null) {
            replacement = productRepository.findById(dto.getReplacementProductId()).orElse(null);
        }

        OrderServiceRequest request = new OrderServiceRequest();
        request.setOrder(order);
        request.setBuyer(buyer);
        request.setProduct(product);
        request.setReplacementProduct(replacement);
        request.setRequestType(dto.getRequestType().toUpperCase());
        request.setReasonCategory(dto.getReasonCategory());
        request.setDetailedComments(dto.getDetailedComments());
        request.setRefundAmount(order.getTotalAmount());
        request.setCreatedAt(ZonedDateTime.now());
        request.setUpdatedAt(ZonedDateTime.now());

        if ("CANCELLATION".equalsIgnoreCase(dto.getRequestType())) {
            request.setRequestStatus("APPROVED");
            order.setOrderStatus("Cancelled");
            order.setCancellationReason(dto.getReasonCategory() + ": " + dto.getDetailedComments());
            order.setCancelledAt(ZonedDateTime.now());
            orderRepository.save(order);
        } else if ("EXCHANGE".equalsIgnoreCase(dto.getRequestType())) {
            request.setRequestStatus("EXCHANGE_APPROVED");
        } else {
            request.setRequestStatus("RETURN_PROCESSING");
            order.setOrderStatus("Returned");
            orderRepository.save(order);
        }

        OrderServiceRequest saved = serviceRequestRepository.save(request);
        return mapToDTO(saved);
    }

    @Transactional(readOnly = true)
    public List<OrderServiceRequestDTO> getServiceRequestsForBuyer(String buyerPhone) {
        User buyer = userRepository.findByPhoneNumber(buyerPhone).orElse(null);
        if (buyer == null) return List.of();
        return serviceRequestRepository.findByBuyerIdOrderByIdDesc(buyer.getId())
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private OrderServiceRequestDTO mapToDTO(OrderServiceRequest request) {
        OrderServiceRequestDTO dto = new OrderServiceRequestDTO();
        dto.setId(request.getId());
        dto.setOrderId(request.getOrder().getId());
        dto.setBuyerId(request.getBuyer().getId());
        if (request.getProduct() != null) {
            dto.setProductId(request.getProduct().getId());
        }
        if (request.getReplacementProduct() != null) {
            dto.setReplacementProductId(request.getReplacementProduct().getId());
        }
        dto.setRequestType(request.getRequestType());
        dto.setReasonCategory(request.getReasonCategory());
        dto.setDetailedComments(request.getDetailedComments());
        dto.setRequestStatus(request.getRequestStatus());
        dto.setRefundAmount(request.getRefundAmount());
        dto.setCreatedAt(request.getCreatedAt());
        return dto;
    }
}
