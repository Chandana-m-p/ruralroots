package com.ruralroots.repository;

import com.ruralroots.model.OrderServiceRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderServiceRequestRepository extends JpaRepository<OrderServiceRequest, Long> {

    List<OrderServiceRequest> findByOrderIdOrderByIdDesc(Long orderId);

    List<OrderServiceRequest> findByBuyerIdOrderByIdDesc(Long buyerId);
}
