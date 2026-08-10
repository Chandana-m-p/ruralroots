package com.ruralroots.service;

import com.ruralroots.dto.AuthRequestDTO;
import com.ruralroots.dto.AuthResponseDTO;
import com.ruralroots.dto.LoginRequestDTO;
import com.ruralroots.dto.OtpVerifyDTO;
import com.ruralroots.model.Role;
import com.ruralroots.model.User;
import com.ruralroots.repository.UserRepository;
import com.ruralroots.security.JwtTokenProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private AuthService authService;

    private User sampleUser;

    @BeforeEach
    public void setUp() {
        JwtTokenProvider realTokenProvider = new JwtTokenProvider();
        ReflectionTestUtils.setField(realTokenProvider, "jwtSecret", "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970");
        ReflectionTestUtils.setField(realTokenProvider, "jwtExpirationMs", 2592000000L);
        ReflectionTestUtils.setField(authService, "tokenProvider", realTokenProvider);

        SmsNotificationService realSmsService = new SmsNotificationService();
        ReflectionTestUtils.setField(realSmsService, "accountSid", "MOCK_SID");
        ReflectionTestUtils.setField(realSmsService, "fromNumber", "+15005550006");
        ReflectionTestUtils.setField(authService, "smsService", realSmsService);

        sampleUser = User.builder()
                .id(1L)
                .phoneNumber("9876543210")
                .fullName("Test User")
                .role(Role.ROLE_BUYER)
                .preferredLanguage("en")
                .build();
    }

    @Test
    public void testRequestOtpNewUser() {
        when(userRepository.findByPhoneNumber("9876543210")).thenReturn(Optional.empty());
        when(userRepository.save(any(User.class))).thenReturn(sampleUser);

        AuthRequestDTO request = new AuthRequestDTO("9876543210", "Test User", "HUB_MANAGER", "hi");
        Map<String, String> response = authService.requestOtp(request);

        assertNotNull(response);
        assertEquals("SUCCESS", response.get("status"));
        assertNotNull(response.get("otp"));
        assertEquals(4, response.get("otp").length());
    }

    @Test
    public void testVerifyOtpSuccess() {
        when(userRepository.findByPhoneNumber("9876543210")).thenReturn(Optional.empty());
        when(userRepository.save(any(User.class))).thenReturn(sampleUser);

        AuthRequestDTO reqDto = new AuthRequestDTO("9876543210", "Test User", "ROLE_BUYER", "en");
        Map<String, String> otpResp = authService.requestOtp(reqDto);
        String generatedOtp = otpResp.get("otp");

        when(userRepository.findByPhoneNumber("9876543210")).thenReturn(Optional.of(sampleUser));

        OtpVerifyDTO verifyDto = new OtpVerifyDTO("9876543210", generatedOtp);
        AuthResponseDTO authResponse = authService.verifyOtp(verifyDto);

        assertNotNull(authResponse);
        assertNotNull(authResponse.getToken());
        assertEquals("9876543210", authResponse.getPhoneNumber());
    }

    @Test
    public void testVerifyOtpInvalidCodeThrowsException() {
        OtpVerifyDTO verifyDto = new OtpVerifyDTO("9876543210", "0000");
        assertThrows(IllegalArgumentException.class, () -> authService.verifyOtp(verifyDto));
    }

    @Test
    public void testLoginWithCredentialsSuccess() {
        when(userRepository.findByPhoneNumber("9876543210")).thenReturn(Optional.of(sampleUser));

        LoginRequestDTO loginReq = new LoginRequestDTO("9876543210", "password123");
        AuthResponseDTO response = authService.loginWithCredentials(loginReq);

        assertNotNull(response);
        assertNotNull(response.getToken());
        assertEquals(1L, response.getUserId());
    }
}
