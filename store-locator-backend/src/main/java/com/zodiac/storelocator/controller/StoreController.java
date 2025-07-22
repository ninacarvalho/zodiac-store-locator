package com.zodiac.storelocator.controller;

import com.zodiac.storelocator.data.dto.StoreDto;
import com.zodiac.storelocator.service.StoreService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/stores")
@RequiredArgsConstructor
@SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
public class StoreController {

    private final StoreService storeService;

    @GetMapping("/{id}")
    public ResponseEntity<StoreDto> getStore(@PathVariable Long id) {
        return ResponseEntity.ok(storeService.getStore(id));
    }

    @PostMapping
    ResponseEntity<StoreDto> createStore(@Valid @RequestBody StoreDto storeDto)  {
        return ResponseEntity.ok(storeService.createStore(storeDto));
    }

    @GetMapping
    public ResponseEntity<List<StoreDto>> getAllStores() {
        return ResponseEntity.ok(storeService.findAllStores());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<StoreDto> updateStore(
            @PathVariable Long id,
            @RequestBody StoreDto storeDto) {
        StoreDto updated = storeService.updateStorePartial(id, storeDto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStore(@PathVariable Long id) {
        storeService.deleteStore(id);
        return ResponseEntity.noContent().build();
    }
}
