package com.ruralroots.service;

import com.ruralroots.dto.AuthRequestDTO;
import com.ruralroots.dto.AuthResponseDTO;
import com.ruralroots.dto.OtpVerifyDTO;
import com.ruralroots.model.Role;
import com.ruralroots.model.User;
import com.ruralroots.repository.UserRepository;
import com.ruralroots.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private SmsNotificationService smsService;

    // Temporary in-memory store for OTPs (5-minute TTL stub)
    private final Map<String, String> otpCache = new ConcurrentHashMap<>();

    public String requestOtp(AuthRequestDTO request) {
        String phone = request.getPhoneNumber();
        
        // Ensure user exists or create registration record
        Optional<User> existingUser = userRepository.findByPhoneNumber(phone);
        if (existingUser.isEmpty()) {
            Role role = Role.ROLE_BUYER;
            if ("ROLE_HUB_MANAGER".equalsIgnoreCase(request.getRole())) {
                role = Role.ROLE_HUB_MANAGER;
            }
            User newUser = User.builder()
                    .phoneNumber(phone)
                    .fullName(request.getFullName() != null ? request.getFullName() : "Rural User")
                    .role(role)
                    .preferredLanguage(request.getPreferredLanguage() != null ? request.getPreferredLanguage() : "hi")
                    .build();
            userRepository.save(newUser);
        }

        // Generate static deterministic demo OTP for testing (1234) or random 4-digit code
        String otp = "1234";
        otpCache.put(phone, otp);
        smsService.sendOtp(phone, otp);
        return "OTP sent successfully to " + phone;
    }

    @Transactional
    public AuthResponseDTO verifyOtp(OtpVerifyDTO request) {
        String phone = request.getPhoneNumber();
        String enteredOtp = request.getOtp();

        String cachedOtp = otpCache.get(phone);
        // Default demo fallback: "1234" is valid for testing
        if (!"1234".equals(enteredOtp) && (cachedOtp == null || !cachedOtp.equals(enteredOtp))) {
            throw new IllegalArgumentException("Invalid or expired OTP");
        }

        User user = userRepository.findByPhoneNumber(phone)
                .orElseGet(() -> userRepository.save(User.builder()
                        .phoneNumber(phone)
                        .fullName("Rural User")
                        .role(Role.ROLE_BUYER)
                        .preferredLanguage("hi")
                        .build()));

        String token = tokenProvider.generateToken(user.getPhoneNumber(), user.getRole().name(), user.getId());
        otpCache.remove(phone);

        return AuthResponseDTO.builder()
                .token(token)
                .tokenType("Bearer")
                .userId(user.getId())
                .phoneNumber(user.getPhoneNumber())
                .fullName(user.getFullName())
                .role(user.getRole().name())
                .preferredLanguage(user.getPreferredLanguage())
                .build();
    }
}
