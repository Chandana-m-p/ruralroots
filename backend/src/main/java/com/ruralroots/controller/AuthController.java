package com.ruralroots.controller;

import com.ruralroots.dto.AuthRequestDTO;
import com.ruralroots.dto.AuthResponseDTO;
import com.ruralroots.dto.OtpVerifyDTO;
import com.ruralroots.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/request-otp")
    public ResponseEntity<Map<String, String>> requestOtp(@Valid @RequestBody AuthRequestDTO request) {
        String msg = authService.requestOtp(request);
        return ResponseEntity.ok(Map.of("message", msg, "status", "SUCCESS"));
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<AuthResponseDTO> verifyOtp(@Valid @RequestBody OtpVerifyDTO request) {
        AuthResponseDTO response = authService.verifyOtp(request);
        return ResponseEntity.ok(response);
    }
}
