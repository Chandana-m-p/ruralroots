package com.ruralroots.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class SmsNotificationService {

    private static final Logger logger = LoggerFactory.getLogger(SmsNotificationService.class);

    @Value("${twilio.account.sid}")
    private String accountSid;

    @Value("${twilio.phone.number}")
    private String fromNumber;

    public void sendOtp(String phoneNumber, String otp) {
        String message = String.format("RuralRoots OTP: %s. Valid for 5 minutes. Do not share with anyone.", otp);
        logger.info("[SMS-DISPATCH] Sending OTP to {}: {}", phoneNumber, message);
        // Async Twilio REST API integration stub
    }

    public void sendOrderConfirmation(String phoneNumber, String orderNumber, String hubName) {
        String message = String.format("RuralRoots: Order #%s confirmed! Pickup at %s. Pay Cash on Delivery.", orderNumber, hubName);
        logger.info("[SMS-DISPATCH] Sending Order Alert to {}: {}", phoneNumber, message);
    }

    public void sendDeliveryConfirmation(String phoneNumber, String orderNumber, String hubName) {
        String message = String.format("RuralRoots: Order #%s delivered successfully at %s. Thank you!", orderNumber, hubName);
        logger.info("[SMS-DISPATCH] Sending Handover Alert to {}: {}", phoneNumber, message);
    }
}
