package com.zodiac.storelocator.data.mapper;

import com.zodiac.storelocator.data.dto.StoreDto;
import com.zodiac.storelocator.data.entity.Store;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

class StoreMapperTest {

    private final StoreMapper mapper = Mappers.getMapper(StoreMapper.class);

    @Test
    void testToDto() {
        Store store = Store.builder()
                .id(1L)
                .name("Target")
                .rating(4)
                .description("Test store")
                .latitude(43.7)
                .longitude(-79.3)
                .imageUrl("http://example.com/img.jpg")
                .build();

        StoreDto dto = mapper.toDto(store);

        assertThat(dto.getId()).isEqualTo(1L);
        assertThat(dto.getName()).isEqualTo("Target");
    }

    @Test
    void testToEntity() {
        StoreDto dto = StoreDto.builder()
                .id(1L)
                .name("Target")
                .rating(4)
                .description("Test store")
                .latitude(43.7)
                .longitude(-79.3)
                .imageUrl("http://example.com/img.jpg")
                .build();

        Store entity = mapper.toEntity(dto);

        assertThat(entity.getId()).isEqualTo(1L);
        assertThat(entity.getName()).isEqualTo("Target");
    }

}