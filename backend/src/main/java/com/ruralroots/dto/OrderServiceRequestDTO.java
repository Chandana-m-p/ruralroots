package com.ruralroots.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.ZonedDateTime;

public class OrderServiceRequestDTO {

    private Long id;

    @NotNull(message = "Order ID is required")
    private Long orderId;

    private Long productId;
    private Long buyerId;

    @NotBlank(message = "Request type is required (CANCELLATION, RETURN, EXCHANGE)")
    private String requestType;

    @NotBlank(message = "Reason category is mandatory")
    private String reasonCategory;

    @NotBlank(message = "Detailed comments are required")
    private String detailedComments;

    private Long replacementProductId;
    private String requestStatus;
    private BigDecimal refundAmount;
    private ZonedDateTime createdAt;

    public OrderServiceRequestDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public Long getBuyerId() { return buyerId; }
    public void setBuyerId(Long buyerId) { this.buyerId = buyerId; }

    public String getRequestType() { return requestType; }
    public void setRequestType(String requestType) { this.requestType = requestType; }

    public String getReasonCategory() { return reasonCategory; }
    public void setReasonCategory(String reasonCategory) { this.reasonCategory = reasonCategory; }

    public String getDetailedComments() { return detailedComments; }
    public void setDetailedComments(String detailedComments) { this.detailedComments = detailedComments; }

    public Long getReplacementProductId() { return replacementProductId; }
    public void setReplacementProductId(Long replacementProductId) { this.replacementProductId = replacementProductId; }

    public String getRequestStatus() { return requestStatus; }
    public void setRequestStatus(String requestStatus) { this.requestStatus = requestStatus; }

    public BigDecimal getRefundAmount() { return refundAmount; }
    public void setRefundAmount(BigDecimal refundAmount) { this.refundAmount = refundAmount; }

    public ZonedDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(ZonedDateTime createdAt) { this.createdAt = createdAt; }
}
