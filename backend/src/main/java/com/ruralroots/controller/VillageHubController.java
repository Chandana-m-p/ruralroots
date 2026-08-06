package com.ruralroots.controller;

import com.ruralroots.dto.VillageHubDTO;
import com.ruralroots.service.VillageHubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/hubs")
public class VillageHubController {

    @Autowired
    private VillageHubService hubService;

    @GetMapping
    public ResponseEntity<List<VillageHubDTO>> getAllHubs() {
        return ResponseEntity.ok(hubService.getAllHubs());
    }

    @GetMapping("/pincode/{pincode}")
    public ResponseEntity<List<VillageHubDTO>> getHubsByPincode(@PathVariable String pincode) {
        return ResponseEntity.ok(hubService.getHubsByPincode(pincode));
    }

    @GetMapping("/{id}")
    public ResponseEntity<VillageHubDTO> getHubById(@PathVariable Long id) {
        return ResponseEntity.ok(hubService.getHubById(id));
    }
}
