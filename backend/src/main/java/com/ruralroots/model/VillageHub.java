package com.ruralroots.model;

import jakarta.persistence.*;
import java.time.ZonedDateTime;

@Entity
@Table(name = "village_hubs")
public class VillageHub {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "hub_code", nullable = false, unique = true, length = 20)
    private String hubCode;

    @Column(name = "hub_name", nullable = false, length = 100)
    private String hubName;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "manager_id")
    private User manager;

    @Column(nullable = false, length = 10)
    private String pincode;

    @Column(name = "village_name", nullable = false, length = 100)
    private String villageName;

    @Column(nullable = false, length = 100)
    private String district;

    @Column(nullable = false, length = 100)
    private String state;

    @Column(columnDefinition = "TEXT")
    private String landmark;

    private Double latitude;
    private Double longitude;

    @Column(name = "operates_cod")
    private Boolean operatesCod = true;

    @Column(name = "created_at")
    private ZonedDateTime createdAt = ZonedDateTime.now();

    public VillageHub() {}

    public VillageHub(Long id, String hubCode, String hubName, User manager, String pincode, String villageName, String district, String state, String landmark, Double latitude, Double longitude, Boolean operatesCod, ZonedDateTime createdAt) {
        this.id = id;
        this.hubCode = hubCode;
        this.hubName = hubName;
        this.manager = manager;
        this.pincode = pincode;
        this.villageName = villageName;
        this.district = district;
        this.state = state;
        this.landmark = landmark;
        this.latitude = latitude;
        this.longitude = longitude;
        this.operatesCod = operatesCod != null ? operatesCod : true;
        this.createdAt = createdAt != null ? createdAt : ZonedDateTime.now();
    }

    public static VillageHubBuilder builder() {
        return new VillageHubBuilder();
    }

    public static class VillageHubBuilder {
        private Long id;
        private String hubCode;
        private String hubName;
        private User manager;
        private String pincode;
        private String villageName;
        private String district;
        private String state;
        private String landmark;
        private Double latitude;
        private Double longitude;
        private Boolean operatesCod = true;
        private ZonedDateTime createdAt = ZonedDateTime.now();

        public VillageHubBuilder id(Long id) { this.id = id; return this; }
        public VillageHubBuilder hubCode(String hubCode) { this.hubCode = hubCode; return this; }
        public VillageHubBuilder hubName(String hubName) { this.hubName = hubName; return this; }
        public VillageHubBuilder manager(User manager) { this.manager = manager; return this; }
        public VillageHubBuilder pincode(String pincode) { this.pincode = pincode; return this; }
        public VillageHubBuilder villageName(String villageName) { this.villageName = villageName; return this; }
        public VillageHubBuilder district(String district) { this.district = district; return this; }
        public VillageHubBuilder state(String state) { this.state = state; return this; }
        public VillageHubBuilder landmark(String landmark) { this.landmark = landmark; return this; }
        public VillageHubBuilder latitude(Double latitude) { this.latitude = latitude; return this; }
        public VillageHubBuilder longitude(Double longitude) { this.longitude = longitude; return this; }
        public VillageHubBuilder operatesCod(Boolean operatesCod) { this.operatesCod = operatesCod; return this; }
        public VillageHubBuilder createdAt(ZonedDateTime createdAt) { this.createdAt = createdAt; return this; }

        public VillageHub build() {
            return new VillageHub(id, hubCode, hubName, manager, pincode, villageName, district, state, landmark, latitude, longitude, operatesCod, createdAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getHubCode() { return hubCode; }
    public void setHubCode(String hubCode) { this.hubCode = hubCode; }
    public String getHubName() { return hubName; }
    public void setHubName(String hubName) { this.hubName = hubName; }
    public User getManager() { return manager; }
    public void setManager(User manager) { this.manager = manager; }
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
    public ZonedDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(ZonedDateTime createdAt) { this.createdAt = createdAt; }
}
