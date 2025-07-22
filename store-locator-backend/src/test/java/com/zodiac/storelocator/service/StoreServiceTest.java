package com.zodiac.storelocator.service;

import com.zodiac.storelocator.data.dto.StoreDto;
import com.zodiac.storelocator.data.entity.Store;
import com.zodiac.storelocator.data.mapper.StoreMapper;
import com.zodiac.storelocator.data.repository.StoreRepository;
import com.zodiac.storelocator.exception.StoreNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.util.Arrays;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.Mockito.*;

class StoreServiceTest {

    @Mock
    private StoreRepository storeRepository;

    @Mock
    private StoreMapper storeMapper;

    @InjectMocks
    private StoreService storeService;

    private final Store store = Store.builder()
            .id(1L)
            .name("Target")
            .rating(4)
            .description("Description")
            .latitude(43.7)
            .longitude(-79.3)
            .imageUrl("img.jpg")
            .build();

    private final StoreDto dto = StoreDto.builder()
            .id(1L)
            .name("Target")
            .rating(4)
            .description("Description")
            .latitude(43.7)
            .longitude(-79.3)
            .imageUrl("img.jpg")
            .build();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getStore_shouldReturnStoreDto() {
        when(storeRepository.findById(1L)).thenReturn(Optional.of(store));
        when(storeMapper.toDto(store)).thenReturn(dto);

        StoreDto result = storeService.getStore(1L);

        assertThat(result).isEqualTo(dto);
        verify(storeRepository).findById(1L);
    }

    @Test
    void createStore_shouldReturnSavedDto() {
        when(storeMapper.toEntity(dto)).thenReturn(store);
        when(storeRepository.save(store)).thenReturn(store);
        when(storeMapper.toDto(store)).thenReturn(dto);

        StoreDto result = storeService.createStore(dto);

        assertThat(result).isEqualTo(dto);
    }

    @Test
    void findAllStores_shouldReturnList() {
        when(storeRepository.findAll()).thenReturn(Arrays.asList(store));
        when(storeMapper.toDto(store)).thenReturn(dto);

        var result = storeService.findAllStores();

        assertThat(result).hasSize(1).contains(dto);
    }

    @Test
    void updateStorePartial_shouldUpdateFields() {
        when(storeRepository.findById(1L)).thenReturn(Optional.of(store));
        when(storeRepository.save(any(Store.class))).thenReturn(store);
        when(storeMapper.toDto(any(Store.class))).thenReturn(dto);

        StoreDto update = StoreDto.builder().rating(2).description("Updated").build();
        StoreDto result = storeService.updateStorePartial(1L, update);

        assertThat(result).isEqualTo(dto);
    }

    @Test
    void updateStorePartial_shouldThrowIfNotFound() {
        when(storeRepository.findById(999L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> storeService.updateStorePartial(999L, dto))
                .isInstanceOf(StoreNotFoundException.class);
    }

    @Test
    void deleteStore_shouldDeleteIfExists() {
        when(storeRepository.existsById(1L)).thenReturn(true);
        storeService.deleteStore(1L);
        verify(storeRepository).deleteById(1L);
    }

    @Test
    void deleteStore_shouldThrowIfMissing() {
        when(storeRepository.existsById(999L)).thenReturn(false);

        assertThatThrownBy(() -> storeService.deleteStore(999L))
                .isInstanceOf(StoreNotFoundException.class);
    }
}