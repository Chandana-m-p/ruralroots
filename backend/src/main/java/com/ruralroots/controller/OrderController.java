package com.ruralroots.controller;

import com.ruralroots.dto.OrderCancelRequestDTO;
import com.ruralroots.dto.OrderResponseDTO;
import com.ruralroots.dto.OrderSyncRequestDTO;
import com.ruralroots.service.OrderSyncService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

    @Autowired
    private OrderSyncService orderSyncService;

    @PostMapping("/sync")
    public ResponseEntity<OrderResponseDTO> syncOrder(@Valid @RequestBody OrderSyncRequestDTO dto, Authentication authentication) {
        String phone = authentication.getName();
        OrderResponseDTO response = orderSyncService.processSyncedOrder(dto, phone);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/my-orders")
    public ResponseEntity<List<OrderResponseDTO>> getMyOrders(Authentication authentication) {
        String phone = authentication.getName();
        return ResponseEntity.ok(orderSyncService.getOrdersForBuyer(phone));
    }

    @PostMapping("/{orderId}/cancel")
    public ResponseEntity<OrderResponseDTO> cancelOrder(
            @PathVariable Long orderId,
            @RequestBody OrderCancelRequestDTO request,
            Authentication authentication) {
        String phone = authentication.getName();
        String reason = request != null ? request.getReason() : "Cancelled by user";
        OrderResponseDTO response = orderSyncService.cancelOrder(orderId, reason, phone);
        return ResponseEntity.ok(response);
    }
}
