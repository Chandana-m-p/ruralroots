package com.ruralroots.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VillageHubDTO {
    private Long id;
    private String hubCode;
    private String hubName;
    private String pincode;
    private String villageName;
    private String district;
    private String state;
    private String landmark;
    private Double latitude;
    private Double longitude;
    private Boolean operatesCod;
}
