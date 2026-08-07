package com.ruralroots.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.ZonedDateTime;
import java.util.*;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api/v1/notifications")
public class NotificationController {

    public static class NotificationItem {
        private Long id;
        private String title;
        private String message;
        private String type; // 'warning' | 'info' | 'success' | 'order'
        private boolean isRead;
        private ZonedDateTime createdAt;

        public NotificationItem() {}

        public NotificationItem(Long id, String title, String message, String type, boolean isRead, ZonedDateTime createdAt) {
            this.id = id;
            this.title = title;
            this.message = message;
            this.type = type;
            this.isRead = isRead;
            this.createdAt = createdAt;
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }

        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }

        public String getType() { return type; }
        public void setType(String type) { this.type = type; }

        public boolean isRead() { return isRead; }
        public void setRead(boolean read) { isRead = read; }

        public ZonedDateTime getCreatedAt() { return createdAt; }
        public void setCreatedAt(ZonedDateTime createdAt) { this.createdAt = createdAt; }
    }

    private final List<NotificationItem> notifications = new CopyOnWriteArrayList<>();
    private final AtomicLong idGenerator = new AtomicLong(1);

    public NotificationController() {
        // Initial Seed Notifications for Admin Portal
        notifications.add(new NotificationItem(
                idGenerator.getAndIncrement(),
                "Inventory Alert",
                "Product #3 (Handwoven Jute Carpet) stock running low (< 10 units).",
                "warning",
                false,
                ZonedDateTime.now().minusHours(1)
        ));
        notifications.add(new NotificationItem(
                idGenerator.getAndIncrement(),
                "New Order Received",
                "Order #RR-104928 placed at Jaipur Rural Hub Store (COD).",
                "order",
                false,
                ZonedDateTime.now().minusHours(3)
        ));
        notifications.add(new NotificationItem(
                idGenerator.getAndIncrement(),
                "System Sync Operational",
                "Offline PWA background order sync completed with zero conflicts.",
                "success",
                true,
                ZonedDateTime.now().minusDays(1)
        ));
        notifications.add(new NotificationItem(
                idGenerator.getAndIncrement(),
                "Hub Dispatch Completed",
                "3 parcels dispatched from Hub STORE-002 (Barmer Village).",
                "info",
                false,
                ZonedDateTime.now().minusHours(5)
        ));
    }

    @GetMapping
    public ResponseEntity<List<NotificationItem>> getNotifications() {
        return ResponseEntity.ok(new ArrayList<>(notifications));
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<NotificationItem> markAsRead(@PathVariable Long id) {
        for (NotificationItem item : notifications) {
            if (item.getId().equals(id)) {
                item.setRead(true);
                return ResponseEntity.ok(item);
            }
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/read-all")
    public ResponseEntity<Map<String, String>> markAllAsRead() {
        for (NotificationItem item : notifications) {
            item.setRead(true);
        }
        return ResponseEntity.ok(Collections.singletonMap("status", "success"));
    }

    @PostMapping
    public ResponseEntity<NotificationItem> createNotification(@RequestBody Map<String, String> payload) {
        String title = payload.getOrDefault("title", "Admin Alert");
        String message = payload.getOrDefault("message", "System notification dispatch.");
        String type = payload.getOrDefault("type", "info");

        NotificationItem newItem = new NotificationItem(
                idGenerator.getAndIncrement(),
                title,
                message,
                type,
                false,
                ZonedDateTime.now()
        );
        notifications.add(0, newItem);
        return ResponseEntity.ok(newItem);
    }
}
