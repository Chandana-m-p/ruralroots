package com.ruralroots.repository;

import com.ruralroots.model.VillageHub;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface VillageHubRepository extends JpaRepository<VillageHub, Long> {
    List<VillageHub> findByPincode(String pincode);
    List<VillageHub> findByDistrictIgnoreCase(String district);
    Optional<VillageHub> findByHubCode(String hubCode);
}
