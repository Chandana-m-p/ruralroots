package com.ruralroots.service;

import com.ruralroots.dto.VillageHubDTO;
import com.ruralroots.model.VillageHub;
import com.ruralroots.repository.VillageHubRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VillageHubService {

    @Autowired
    private VillageHubRepository hubRepository;

    public List<VillageHubDTO> getAllHubs() {
        return hubRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<VillageHubDTO> getHubsByPincode(String pincode) {
        return hubRepository.findByPincode(pincode).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public VillageHubDTO getHubById(Long id) {
        VillageHub hub = hubRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Village Hub not found with id: " + id));
        return mapToDTO(hub);
    }

    private VillageHubDTO mapToDTO(VillageHub h) {
        return VillageHubDTO.builder()
                .id(h.getId())
                .hubCode(h.getHubCode())
                .hubName(h.getHubName())
                .pincode(h.getPincode())
                .villageName(h.getVillageName())
                .district(h.getDistrict())
                .state(h.getState())
                .landmark(h.getLandmark())
                .latitude(h.getLatitude())
                .longitude(h.getLongitude())
                .operatesCod(h.getOperatesCod())
                .build();
    }
}
