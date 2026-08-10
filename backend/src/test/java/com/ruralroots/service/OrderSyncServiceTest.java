package com.ruralroots.service;

import com.ruralroots.dto.OrderItemDTO;
import com.ruralroots.dto.OrderResponseDTO;
import com.ruralroots.dto.OrderSyncRequestDTO;
import com.ruralroots.model.*;
import com.ruralroots.repository.OrderRepository;
import com.ruralroots.repository.ProductRepository;
import com.ruralroots.repository.UserRepository;
import com.ruralroots.repository.VillageHubRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class OrderSyncServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private VillageHubRepository hubRepository;

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private OrderSyncService orderSyncService;

    private User buyer;
    private VillageHub hub;
    private Product product;
    private UUID idempotencyKey;

    @BeforeEach
    public void setUp() {
        SmsNotificationService realSmsService = new SmsNotificationService();
        ReflectionTestUtils.setField(realSmsService, "accountSid", "MOCK_SID");
        ReflectionTestUtils.setField(realSmsService, "fromNumber", "+15005550006");
        ReflectionTestUtils.setField(orderSyncService, "smsService", realSmsService);

        idempotencyKey = UUID.randomUUID();

        buyer = User.builder()
                .id(1L)
                .phoneNumber("9876543210")
                .fullName("Ramesh Buyer")
                .role(Role.ROLE_BUYER)
                .build();

        hub = VillageHub.builder()
                .id(10L)
                .hubCode("HUB-01")
                .hubName("Ramgarh Kendra")
                .build();

        product = Product.builder()
                .id(100L)
                .sku("SKU-100")
                .titleI18n("{\"en\":\"Vase\"}")
                .basePrice(new BigDecimal("500.00"))
                .stockQuantity(10)
                .build();
    }

    @Test
    public void testProcessSyncedOrderIdempotencyHit() {
        Order existingOrder = Order.builder()
                .id(99L)
                .orderNumber("RR-12345")
                .idempotencyKey(idempotencyKey)
                .buyer(buyer)
                .hub(hub)
                .totalAmount(new BigDecimal("500.00"))
                .items(new ArrayList<>())
                .build();

        when(orderRepository.findByIdempotencyKey(idempotencyKey)).thenReturn(Optional.of(existingOrder));

        OrderSyncRequestDTO request = new OrderSyncRequestDTO(idempotencyKey, 10L, "COD", new BigDecimal("500.00"), ZonedDateTime.now(), Collections.emptyList());
        OrderResponseDTO response = orderSyncService.processSyncedOrder(request, "9876543210");

        assertNotNull(response);
        assertEquals("RR-12345", response.getOrderNumber());
        verify(orderRepository, never()).save(any(Order.class));
    }

    @Test
    public void testProcessSyncedOrderSuccess() {
        when(orderRepository.findByIdempotencyKey(idempotencyKey)).thenReturn(Optional.empty());
        when(userRepository.findByPhoneNumber("9876543210")).thenReturn(Optional.of(buyer));
        when(hubRepository.findById(10L)).thenReturn(Optional.of(hub));
        when(productRepository.findById(100L)).thenReturn(Optional.of(product));
        when(orderRepository.save(any(Order.class))).thenAnswer(invocation -> {
            Order arg = invocation.getArgument(0);
            arg.setId(1L);
            return arg;
        });

        OrderItemDTO itemDto = new OrderItemDTO(100L, "Vase", 2, new BigDecimal("500.00"));
        OrderSyncRequestDTO request = new OrderSyncRequestDTO(idempotencyKey, 10L, "COD", new BigDecimal("1000.00"), ZonedDateTime.now(), List.of(itemDto));

        OrderResponseDTO response = orderSyncService.processSyncedOrder(request, "9876543210");

        assertNotNull(response);
        assertEquals("CONFIRMED", response.getOrderStatus());
        assertEquals(8, product.getStockQuantity()); // 10 - 2
    }

    @Test
    public void testCancelOrderUnauthorizedThrowsException() {
        User otherBuyer = User.builder()
                .id(2L)
                .phoneNumber("9123456789")
                .role(Role.ROLE_BUYER)
                .build();

        Order existingOrder = Order.builder()
                .id(50L)
                .buyer(buyer)
                .hub(hub)
                .orderStatus("CONFIRMED")
                .items(new ArrayList<>())
                .build();

        when(orderRepository.findById(50L)).thenReturn(Optional.of(existingOrder));
        when(userRepository.findByPhoneNumber("9123456789")).thenReturn(Optional.of(otherBuyer));

        assertThrows(IllegalStateException.class, () -> orderSyncService.cancelOrder(50L, "Changed mind", "9123456789"));
    }
}
