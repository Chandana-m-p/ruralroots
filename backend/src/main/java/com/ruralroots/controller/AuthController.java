package com.ruralroots.controller;

import com.ruralroots.dto.AuthRequestDTO;
import com.ruralroots.dto.AuthResponseDTO;
import com.ruralroots.dto.LoginRequestDTO;
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

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody LoginRequestDTO request) {
        AuthResponseDTO response = authService.loginWithCredentials(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/request-otp")
    public ResponseEntity<Map<String, String>> requestOtp(@Valid @RequestBody AuthRequestDTO request) {
        Map<String, String> result = authService.requestOtp(request);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<AuthResponseDTO> verifyOtp(@Valid @RequestBody OtpVerifyDTO request) {
        AuthResponseDTO response = authService.verifyOtp(request);
        return ResponseEntity.ok(response);
    }
}
