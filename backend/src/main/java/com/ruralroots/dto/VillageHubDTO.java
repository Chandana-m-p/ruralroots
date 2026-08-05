package com.ruralroots.dto;

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

    public VillageHubDTO() {}

    public VillageHubDTO(Long id, String hubCode, String hubName, String pincode, String villageName, String district, String state, String landmark, Double latitude, Double longitude, Boolean operatesCod) {
        this.id = id;
        this.hubCode = hubCode;
        this.hubName = hubName;
        this.pincode = pincode;
        this.villageName = villageName;
        this.district = district;
        this.state = state;
        this.landmark = landmark;
        this.latitude = latitude;
        this.longitude = longitude;
        this.operatesCod = operatesCod;
    }

    public static VillageHubDTOBuilder builder() {
        return new VillageHubDTOBuilder();
    }

    public static class VillageHubDTOBuilder {
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

        public VillageHubDTOBuilder id(Long id) { this.id = id; return this; }
        public VillageHubDTOBuilder hubCode(String hubCode) { this.hubCode = hubCode; return this; }
        public VillageHubDTOBuilder hubName(String hubName) { this.hubName = hubName; return this; }
        public VillageHubDTOBuilder pincode(String pincode) { this.pincode = pincode; return this; }
        public VillageHubDTOBuilder villageName(String villageName) { this.villageName = villageName; return this; }
        public VillageHubDTOBuilder district(String district) { this.district = district; return this; }
        public VillageHubDTOBuilder state(String state) { this.state = state; return this; }
        public VillageHubDTOBuilder landmark(String landmark) { this.landmark = landmark; return this; }
        public VillageHubDTOBuilder latitude(Double latitude) { this.latitude = latitude; return this; }
        public VillageHubDTOBuilder longitude(Double longitude) { this.longitude = longitude; return this; }
        public VillageHubDTOBuilder operatesCod(Boolean operatesCod) { this.operatesCod = operatesCod; return this; }

        public VillageHubDTO build() {
            return new VillageHubDTO(id, hubCode, hubName, pincode, villageName, district, state, landmark, latitude, longitude, operatesCod);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getHubCode() { return hubCode; }
    public void setHubCode(String hubCode) { this.hubCode = hubCode; }
    public String getHubName() { return hubName; }
    public void setHubName(String hubName) { this.hubName = hubName; }
    public String getPincode() { return pincode; }
    public void setPincode(String pincode) { this.pincode = pincode; }
    public String getVillageName() { return villageName; }
    public void setVillageName(String villageName) { this.villageName = villageName; }
    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }
    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
    public String getLandmark() { return landmark; }
    public void setLandmark(String landmark) { this.landmark = landmark; }
    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }
    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }
    public Boolean getOperatesCod() { return operatesCod; }
    public void setOperatesCod(Boolean operatesCod) { this.operatesCod = operatesCod; }
}
