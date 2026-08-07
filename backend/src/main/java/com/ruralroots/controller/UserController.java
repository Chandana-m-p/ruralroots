package com.ruralroots.controller;

import com.ruralroots.model.Role;
import com.ruralroots.model.User;
import com.ruralroots.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @PostMapping("/admin")
    public ResponseEntity<User> createAdminAccount(@RequestBody Map<String, String> payload) {
        String phone = payload.get("phoneNumber");
        String name = payload.get("fullName");

        if (phone == null || phone.isBlank()) {
            return ResponseEntity.badRequest().build();
        }

        User adminUser = userRepository.findByPhoneNumber(phone)
                .orElseGet(() -> User.builder()
                        .phoneNumber(phone)
                        .fullName(name != null ? name : "Admin User")
                        .role(Role.ROLE_ADMIN)
                        .preferredLanguage("en")
                        .isActive(true)
                        .createdAt(ZonedDateTime.now())
                        .build());

        adminUser.setRole(Role.ROLE_ADMIN);
        if (name != null) adminUser.setFullName(name);

        User saved = userRepository.save(adminUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}/role")
    public ResponseEntity<User> updateUserRole(@PathVariable("id") Long userId, @RequestParam("role") String roleStr) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + userId));

        Role role;
        try {
            role = Role.valueOf(roleStr);
        } catch (Exception e) {
            role = Role.ROLE_BUYER;
        }

        user.setRole(role);
        User updated = userRepository.save(user);
        return ResponseEntity.ok(updated);
    }
}
