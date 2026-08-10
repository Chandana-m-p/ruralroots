package com.ruralroots.controller;

import com.ruralroots.dto.OrderServiceRequestDTO;
import com.ruralroots.service.OrderServiceRequestService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderServiceRequestController {

    private final OrderServiceRequestService serviceRequestService;

    public OrderServiceRequestController(OrderServiceRequestService serviceRequestService) {
        this.serviceRequestService = serviceRequestService;
    }

    @PostMapping("/{orderId}/service-requests")
    public ResponseEntity<OrderServiceRequestDTO> createServiceRequest(
            @PathVariable("orderId") Long orderId,
            @Valid @RequestBody OrderServiceRequestDTO dto,
            Authentication authentication) {
        String phone = authentication != null ? authentication.getName() : "9876543210";
        dto.setOrderId(orderId);
        OrderServiceRequestDTO created = serviceRequestService.createServiceRequest(orderId, phone, dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/my-service-requests")
    public ResponseEntity<List<OrderServiceRequestDTO>> getMyServiceRequests(Authentication authentication) {
        String phone = authentication != null ? authentication.getName() : "9876543210";
        List<OrderServiceRequestDTO> requests = serviceRequestService.getServiceRequestsForBuyer(phone);
        return ResponseEntity.ok(requests);
    }
}
