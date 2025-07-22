package com.zodiac.storelocator.service;

import com.zodiac.storelocator.data.dto.StoreDto;
import com.zodiac.storelocator.data.entity.Store;
import com.zodiac.storelocator.data.mapper.StoreMapper;
import com.zodiac.storelocator.data.repository.StoreRepository;
import com.zodiac.storelocator.exception.StoreNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StoreService {

    private final StoreRepository storeRepository;
    private final StoreMapper storeMapper;

    public StoreDto getStore(Long id) {
        Store store = storeRepository.findById(id)
                .orElseThrow(() -> new StoreNotFoundException(id));
        return storeMapper.toDto(store);
    }

    public List<StoreDto> findAllStores() {
        return storeRepository.findAll().stream()
                .map(storeMapper::toDto)
            .collect(Collectors.toList());
    }

    public StoreDto createStore(StoreDto storeDto) {
        Store store = storeMapper.toEntity(storeDto);
        Store saved = storeRepository.save(store);
        return storeMapper.toDto(saved);
    }

    public StoreDto updateStorePartial(Long id, StoreDto updateDto) {
        Store existing = storeRepository.findById(id)
                .orElseThrow(() -> new StoreNotFoundException(id));

        // Apply only non-null fields from updateDto
        if (updateDto.getName() != null) existing.setName(updateDto.getName());
        if (updateDto.getRating() != null) existing.setRating(updateDto.getRating());
        if (updateDto.getDescription() != null) existing.setDescription(updateDto.getDescription());
        if (updateDto.getLatitude() != null) existing.setLatitude(updateDto.getLatitude());
        if (updateDto.getLongitude() != null) existing.setLongitude(updateDto.getLongitude());
        if (updateDto.getImageUrl() != null) existing.setImageUrl(updateDto.getImageUrl());

        Store saved = storeRepository.save(existing);
        return storeMapper.toDto(saved);
    }

    public void deleteStore(Long id) {
        if (!storeRepository.existsById(id)) {
            throw new StoreNotFoundException(id);
        }
        storeRepository.deleteById(id);
    }
}