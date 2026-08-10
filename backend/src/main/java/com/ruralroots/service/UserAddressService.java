package com.ruralroots.service;

import com.ruralroots.dto.UserAddressDTO;
import com.ruralroots.model.User;
import com.ruralroots.model.UserAddress;
import com.ruralroots.repository.UserAddressRepository;
import com.ruralroots.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserAddressService {

    private final UserAddressRepository addressRepository;
    private final UserRepository userRepository;

    public UserAddressService(UserAddressRepository addressRepository, UserRepository userRepository) {
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<UserAddressDTO> getUserAddresses(Long userId) {
        return addressRepository.findByUserIdOrderByIdDesc(userId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public UserAddressDTO createAddress(Long userId, UserAddressDTO dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));

        List<UserAddress> existing = addressRepository.findByUserIdOrderByIdDesc(userId);
        boolean isFirst = existing.isEmpty();

        if (Boolean.TRUE.equals(dto.getIsDefault()) || isFirst) {
            addressRepository.resetDefaultAddressForUser(userId);
        }

        UserAddress address = new UserAddress();
        address.setUser(user);
        address.setLabel(dto.getLabel() != null ? dto.getLabel() : "Home");
        address.setFullName(dto.getFullName());
        address.setPhoneNumber(dto.getPhoneNumber());
        address.setAddressLine(dto.getAddressLine());
        address.setVillageOrCity(dto.getVillageOrCity());
        address.setDistrict(dto.getDistrict());
        address.setState(dto.getState());
        address.setPincode(dto.getPincode());
        address.setIsDefault(Boolean.TRUE.equals(dto.getIsDefault()) || isFirst);
        address.setCreatedAt(ZonedDateTime.now());

        UserAddress saved = addressRepository.save(address);
        return mapToDTO(saved);
    }

    @Transactional
    public UserAddressDTO updateAddress(Long userId, Long addressId, UserAddressDTO dto) {
        UserAddress address = addressRepository.findById(addressId)
                .orElseThrow(() -> new IllegalArgumentException("Address not found with id: " + addressId));

        if (!address.getUser().getId().equals(userId)) {
            throw new SecurityException("Not authorized to update this address");
        }

        if (Boolean.TRUE.equals(dto.getIsDefault())) {
            addressRepository.resetDefaultAddressForUser(userId);
        }

        address.setLabel(dto.getLabel());
        address.setFullName(dto.getFullName());
        address.setPhoneNumber(dto.getPhoneNumber());
        address.setAddressLine(dto.getAddressLine());
        address.setVillageOrCity(dto.getVillageOrCity());
        address.setDistrict(dto.getDistrict());
        address.setState(dto.getState());
        address.setPincode(dto.getPincode());
        if (dto.getIsDefault() != null) {
            address.setIsDefault(dto.getIsDefault());
        }

        UserAddress saved = addressRepository.save(address);
        return mapToDTO(saved);
    }

    @Transactional
    public void deleteAddress(Long userId, Long addressId) {
        UserAddress address = addressRepository.findById(addressId)
                .orElseThrow(() -> new IllegalArgumentException("Address not found with id: " + addressId));

        if (!address.getUser().getId().equals(userId)) {
            throw new SecurityException("Not authorized to delete this address");
        }

        boolean wasDefault = Boolean.TRUE.equals(address.getIsDefault());
        addressRepository.delete(address);

        if (wasDefault) {
            List<UserAddress> remaining = addressRepository.findByUserIdOrderByIdDesc(userId);
            if (!remaining.isEmpty()) {
                UserAddress newDefault = remaining.get(0);
                newDefault.setIsDefault(true);
                addressRepository.save(newDefault);
            }
        }
    }

    @Transactional
    public UserAddressDTO setDefaultAddress(Long userId, Long addressId) {
        UserAddress address = addressRepository.findById(addressId)
                .orElseThrow(() -> new IllegalArgumentException("Address not found with id: " + addressId));

        if (!address.getUser().getId().equals(userId)) {
            throw new SecurityException("Not authorized to set default for this address");
        }

        addressRepository.resetDefaultAddressForUser(userId);
        address.setIsDefault(true);
        UserAddress saved = addressRepository.save(address);
        return mapToDTO(saved);
    }

    private UserAddressDTO mapToDTO(UserAddress address) {
        return new UserAddressDTO(
                address.getId(),
                address.getUser().getId(),
                address.getLabel(),
                address.getFullName(),
                address.getPhoneNumber(),
                address.getAddressLine(),
                address.getVillageOrCity(),
                address.getDistrict(),
                address.getState(),
                address.getPincode(),
                address.getIsDefault(),
                address.getCreatedAt()
        );
    }
}
