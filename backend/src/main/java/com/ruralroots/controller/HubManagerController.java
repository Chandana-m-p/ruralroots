package com.ruralroots.controller;

import com.ruralroots.dto.OrderResponseDTO;
import com.ruralroots.service.OrderSyncService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/hub")
public class HubManagerController {

    @Autowired
    private OrderSyncService orderSyncService;

    @GetMapping("/orders/hub/{hubId}")
    public ResponseEntity<List<OrderResponseDTO>> getHubOrders(@PathVariable Long hubId) {
        return ResponseEntity.ok(orderSyncService.getOrdersForHub(hubId));
    }

    @PostMapping("/orders/{orderId}/handover")
    public ResponseEntity<OrderResponseDTO> completeOrderHandover(@PathVariable Long orderId) {
        OrderResponseDTO updated = orderSyncService.markOrderDelivered(orderId);
        return ResponseEntity.ok(updated);
    }
}
