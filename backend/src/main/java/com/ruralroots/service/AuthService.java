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

    public Map<String, String> requestOtp(AuthRequestDTO request) {
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

        // Generate dynamic 4-digit SMS OTP code dispatched via SMS Provider Service (Twilio / Fast2SMS)
        String otp = String.format("%04d", new java.security.SecureRandom().nextInt(10000));
        otpCache.put(phone, otp);
        smsService.sendOtp(phone, otp);
        return Map.of(
            "status", "SUCCESS",
            "message", "SMS OTP dispatched via SMS Provider Gateway to " + phone,
            "otp", otp,
            "phoneNumber", phone
        );
    }

    @Transactional
    public AuthResponseDTO verifyOtp(OtpVerifyDTO request) {
        String phone = request.getPhoneNumber();
        String enteredOtp = request.getOtp();

        String cachedOtp = otpCache.get(phone);
        // Verify OTP strictly against SMS provider dispatch cache
        if (cachedOtp == null || !cachedOtp.equals(enteredOtp)) {
            throw new IllegalArgumentException("Invalid or expired OTP code. Please enter the exact OTP code sent to your phone.");
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
